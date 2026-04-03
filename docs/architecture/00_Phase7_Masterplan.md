## Fas 7: Skalbarhet, Ekonomi & Säkerhet

Detta dokument fastställer arkitekturen för hur systemet ska gå från en lokal prototyp till en globalt skalbar, självhostad plattform med obefintliga driftskostnader och noll ekonomisk risk.

### 1\. Arkitektur (Ljud & Text)

-   **Ljud via Cloudflare SFU:** Sändaren (tolken) ansluter direkt till Gemini Live API via WebSockets. Det översatta ljudet skickas som ett (1) spår till Cloudflare Calls (SFU). Cloudflare kopierar och distribuerar ljudet till lyssnarna. Detta utnyttjar Cloudflares generösa gratiskvot på 1 Terabyte per månad.
-   **Text via WebRTC DataChannels:** För att undvika databas-kvoter (som Firestore) ska transkribering och systemkommandon (t.ex. PTZ-kamerastyrning från AI) skickas i samma WebRTC-anslutning som ljudet via Cloudflare. Detta ger noll latens och drar inga databasanrop.

### 2\. Gemini Live API - Kapacitet & Demo-läge

Systemet utnyttjar Googles Free Tier-gränser för Gemini Live API som ett naturligt säljverktyg (PLG):

-   **3 Samtidiga Sessioner:** Gratisnivån tillåter max 3 samtidiga sessioner. Tack vare vår SFU-arkitektur räknas ett helt församlingsmöte med hundratals lyssnare som endast 1 session mot Gemini. Vi kan därmed erbjuda 3 parallella demo-möten globalt på en enda gratisnyckel.
-   **Sessionsförlängning:** Google stänger anslutningen efter 15 minuter. Appen använder _Session Resumption_ och _Context Window Compression_ för att sömlöst och oändligt återansluta.
-   **Tokens:** Gränsen ligger på 1 000 000 Tokens Per Minute (TPM). Tre kontinuerligt talande sändare använder mindre än 3 % av denna gräns.

### 3\. Säkerhet: The Billing Kill Switches

För att skydda projektet från oändliga kod-loopar och illvilliga DDOS-attacker (som kan orsaka astronomiska moln-fakturor) krävs det att två separata "Kill Switches" implementeras innan BYOK-lansering:

#### Google Cloud (Skyddar Gemini & Firebase)

En GCP-budget kopplas till ett Pub/Sub-ämne. En separat Firebase Cloud Function lyssnar på ämnet. Om budgeten (t.ex. 50 kr) överskrids, använder funktionen Googles Billing API för att sätta `billingAccountName: ''`. Detta kopplar omedelbart bort kreditkortet och tvingar projektet till en säker, gratis Spark-nivå.

#### Cloudflare (Skyddar SFU Bandbredd)

En schemalagd Cloudflare Worker frågar GraphQL Analytics API (`callsTurnUsageAdaptiveGroups`) om förbrukad bandbredd varje timme. Om egressBytes överstiger t.ex. 950 GB (nära 1 TB-taket), blockerar Workern API:et för att skapa nya rum via en hårdkodad 403 Forbidden-respons, vilket fryser systemet tills nästa månad.