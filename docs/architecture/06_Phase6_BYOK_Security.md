# Fas 6: BYOK & Zero-Trust Architecture

I denna fas övergick plattformen från en öppen prototyp till en stenhård **Bring Your Own Key (BYOK)**\-arkitektur. Målet var att skapa ett system där användarnas API-nycklar lagras i ett moln-valv som klientens webbläsare aldrig har direkt åtkomst till.

## Del 1: Backend & Netlify Lambda ("Dörrvakten")

För att skydda valvet introducerade vi **Backend-For-Frontend (BFF)**\-mönstret via en Netlify Serverless Function (`getCredentials.ts`). Denna funktion agerar dörrvakt och använder Firebase Admin SDK för att hämta nycklarna och leverera dem säkert till anslutningen.

-   **gRPC Bypass:** Netlifys serverlösa miljö blockerar ofta gRPC-trafik vilket orsakade `5 NOT_FOUND`\-fel. Vi löste detta genom att tvinga Firestore att använda HTTP/REST.
-   **Warm-Start Skydd:** För att förhindra kraschar när Netlify återanvänder containern (Warm start), implementerades en Singleton-logik.
-   **Named Databases:** Backend-funktionen pekades explicit mot rätt databas-ID via `VITE_FIREBASE_DATABASE_ID`.

```

{`// Singleton-initiering med REST-fallback
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  });
  const db = admin.firestore();
  db.settings({ preferRest: true }); // Måste sättas exakt en gång
}`}
          
```

## Del 2: Autentisering & Databassäkerhet ("Låsen")

För att tillåta församlingsmedlemmar att ansluta anonymt, samtidigt som databasen förblir låst, kombinerade vi Firebase Anonymous Auth med strikta Firestore Security Rules.

-   **Gäst-Badgen:** När en användare klickar på "Anslut" tilldelas webbläsaren osynligt ett gäst-ID via `signInAnonymously(auth)`.
-   **Lobbyn vs. Valvet:** Databasen delades upp. Gäster får läsa rums-koder i `/organizations`, men under-samlingen `/secrets` är totalt blockerad.
-   **Sanering av nycklar:** För att förhindra "Silent Drops" från Googles WebSockets på grund av inklistrade osynliga tecken, trimmas alltid nyckeln (`apiKey.trim()`) innan sändning.

```

{`match /organizations/{orgId} {
  // LOBBYN: Tillåt inloggade gäster att validera rums-koder
  allow read: if request.auth != null; 
  
  match /secrets/{secretId} {
    // VALVET: Hårdkodat blockerat för alla webbläsare!
    // Endast Netlify-Dörrvakten kommer åt denna data.
    allow read: if false; 
  }
}`}
          
```

## Del 3: Defensiv Arkitektur & Resiliens ("Sköldarna")

I ett händelsestyrt system där en röstdetektor (VAD) styr anslutningarna, finns en stor risk för **Själv-DDoS**. En felaktig API-nyckel resulterade initialt i en oändlig loop av avvisade uppkopplingar, vilket dränerade Firebase-kvoten (50 000 läsningar) på minuter.

-   **Sköld 1 - Caching:** Vi introducerade `cachedApiKeyRef`. Appen hämtar nyckeln från databasen _en enda gång_ per session. Vid återanslutningar används minnet.
-   **Sköld 2 - Circuit Breaker:** Vi implementerade en felräknare (`connectionFailuresRef`). Om 3 anslutningsförsök misslyckas inom 10 sekunder utlöses en "Hard Stop".
-   **Hard Stop:** När säkringen går tvingas mikrofonen att stänga av sig (`setActiveMode('off')`), cachen töms, och användaren får ett kritiskt felmeddelande för att skydda systemets resurser.

```

{`// SHIELD 2: Circuit Breaker Logik
const now = Date.now();
connectionFailuresRef.current = connectionFailuresRef.current.filter(time => now - time < 10000);
connectionFailuresRef.current.push(now);

if (connectionFailuresRef.current.length >= 3) {
    console.error("[Circuit Breaker] Appen har fastnat. Stänger av.");
    setError("Kritiskt anslutningsfel. Mikrofonen har inaktiverats.");
    sessionDisconnect(); 
    config.setActiveMode('off'); // Stäng av mikrofonen (VAD)
    connectionFailuresRef.current = []; 
}`}
          
```