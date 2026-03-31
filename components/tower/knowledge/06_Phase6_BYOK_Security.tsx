import React from 'react';

const Phase6BYOKSecurity: React.FC = () => {
  return (
    <div className="space-y-6 text-gray-200">
      <h1 className="text-3xl font-bold text-white mb-4">Fas 6: BYOK & Zero-Trust Architecture</h1>
      <p className="text-lg leading-relaxed">
        I denna fas övergick plattformen från en öppen prototyp till en stenhård <strong>Bring Your Own Key (BYOK)</strong>-arkitektur. 
        Målet var att skapa ett system där användarnas API-nycklar lagras i ett moln-valv som klientens webbläsare aldrig 
        har direkt åtkomst till.
      </p>

      {/* DEL 1: BACKEND & NETLIFY */}
      <section className="mt-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-blue-400 mb-3">Del 1: Backend & Netlify Lambda ("Dörrvakten")</h2>
        <p className="mb-3">
          För att skydda valvet introducerade vi <strong>Backend-For-Frontend (BFF)</strong>-mönstret via en Netlify Serverless Function (<code>getCredentials.ts</code>). 
          Denna funktion agerar dörrvakt och använder Firebase Admin SDK för att hämta nycklarna och leverera dem säkert till anslutningen.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>gRPC Bypass:</strong> Netlifys serverlösa miljö blockerar ofta gRPC-trafik vilket orsakade <code>5 NOT_FOUND</code>-fel. 
            Vi löste detta genom att tvinga Firestore att använda HTTP/REST.
          </li>
          <li>
            <strong>Warm-Start Skydd:</strong> För att förhindra kraschar när Netlify återanvänder containern (Warm start), implementerades en Singleton-logik.
          </li>
          <li>
            <strong>Named Databases:</strong> Backend-funktionen pekades explicit mot rätt databas-ID via <code>VITE_FIREBASE_DATABASE_ID</code>.
          </li>
        </ul>
        <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
          <pre><code className="text-sm text-green-300">
{`// Singleton-initiering med REST-fallback
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  });
  const db = admin.firestore();
  db.settings({ preferRest: true }); // Måste sättas exakt en gång
}`}
          </code></pre>
        </div>
      </section>

      {/* DEL 2: AUTENTISERING & DATABASSÄKERHET */}
      <section className="mt-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-purple-400 mb-3">Del 2: Autentisering & Databassäkerhet ("Låsen")</h2>
        <p className="mb-3">
          För att tillåta församlingsmedlemmar att ansluta anonymt, samtidigt som databasen förblir låst, kombinerade vi 
          Firebase Anonymous Auth med strikta Firestore Security Rules.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Gäst-Badgen:</strong> När en användare klickar på "Anslut" tilldelas webbläsaren osynligt ett gäst-ID via <code>signInAnonymously(auth)</code>.
          </li>
          <li>
            <strong>Lobbyn vs. Valvet:</strong> Databasen delades upp. Gäster får läsa rums-koder i <code>/organizations</code>, men under-samlingen <code>/secrets</code> är totalt blockerad.
          </li>
          <li>
            <strong>Sanering av nycklar:</strong> För att förhindra "Silent Drops" från Googles WebSockets på grund av inklistrade osynliga tecken, trimmas alltid nyckeln (<code>apiKey.trim()</code>) innan sändning.
          </li>
        </ul>
        <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
          <pre><code className="text-sm text-purple-300">
{`match /organizations/{orgId} {
  // LOBBYN: Tillåt inloggade gäster att validera rums-koder
  allow read: if request.auth != null; 
  
  match /secrets/{secretId} {
    // VALVET: Hårdkodat blockerat för alla webbläsare!
    // Endast Netlify-Dörrvakten kommer åt denna data.
    allow read: if false; 
  }
}`}
          </code></pre>
        </div>
      </section>

      {/* DEL 3: DEFENSIV ARKITEKTUR */}
      <section className="mt-8 bg-gray-800/50 p-6 rounded-xl border border-red-900/30">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">Del 3: Defensiv Arkitektur & Resiliens ("Sköldarna")</h2>
        <p className="mb-3">
          I ett händelsestyrt system där en röstdetektor (VAD) styr anslutningarna, finns en stor risk för <strong>Själv-DDoS</strong>. 
          En felaktig API-nyckel resulterade initialt i en oändlig loop av avvisade uppkopplingar, vilket dränerade Firebase-kvoten (50 000 läsningar) på minuter.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Sköld 1 - Caching:</strong> Vi introducerade <code>cachedApiKeyRef</code>. Appen hämtar nyckeln från databasen <em>en enda gång</em> per session. Vid återanslutningar används minnet.
          </li>
          <li>
            <strong>Sköld 2 - Circuit Breaker:</strong> Vi implementerade en felräknare (<code>connectionFailuresRef</code>). 
            Om 3 anslutningsförsök misslyckas inom 10 sekunder utlöses en "Hard Stop".
          </li>
          <li>
            <strong>Hard Stop:</strong> När säkringen går tvingas mikrofonen att stänga av sig (<code>setActiveMode('off')</code>), cachen töms, och användaren får ett kritiskt felmeddelande för att skydda systemets resurser.
          </li>
        </ul>
        <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
          <pre><code className="text-sm text-red-300">
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
          </code></pre>
        </div>
      </section>
    </div>
  );
};

export default Phase6BYOKSecurity;
