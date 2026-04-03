### 

MODUL 94

 Säkerhet & BFF (Netlify Functions)

**Zero Trust på Klientsidan:** API-nycklar (Gemini, SFU) lagras **aldrig** i frontend-koden (t.ex. .env-filer) eftersom Vites byggprocess exponerar dem. Istället används ett **Backend-For-Frontend (BFF)**\-mönster via Netlify Functions.

#### Netlify Functions som Proxy

-   Klienten skickar en begäran till `/api/get-sfu-token` eller `/api/get-gemini-token`.
-   Begäran inkluderar användarens Firebase Auth-token (JWT).
-   Netlify Function använder **Firebase Admin SDK** för att verifiera token och kontrollera användarens behörighet.
-   Om godkänd, hämtar funktionen organisationens krypterade BYOK-nycklar från en skyddad Firestore-samling.
-   Funktionen genererar en kortlivad sessionstoken (för SFU) eller returnerar nyckeln (för Gemini) till klienten.

#### Kill Switch (Tidslås)

För att förhindra skenande kostnader från glömda sessioner har varje rum en `expiresAt`\-tidsstämpel. Netlify Functions och cron-jobb övervakar detta. När tiden går ut triggas `peerConnection.close()` på alla klienter, och rummet låses.