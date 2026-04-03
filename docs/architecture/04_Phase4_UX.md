### 

FAS 4

 📱 UX & WebRTC DataChannels

Referensmoduler: 55

Denna fas bygger det visuella gränssnittet och P2P-synkroniseringen. Den förlitar sig på det State som byggdes i Fas 1 och den Ljudmotor som byggdes i Fas 3.

#### 1\. Fjärrstyrning via DataChannels

Rums- och mötesuppdateringar ska ske i realtid utan databasanrop.

-   **BroadcastChannel Simulering:** Vi använder `BroadcastChannel` i `useDataChannel.ts` som en lokal "drop-in replacement" för WebRTC. Detta gör att vi kan testa fjärrstyrning och P2P-synkronisering mellan webbläsarflikar direkt på en dator, innan vi kopplar in Cloudflare SFU.
-   **Late Joiner (State Sync):** Vi implementerar en "Handskakning". När en ny klient ansluter till ett rum, skickar den en `REQUEST_FULL_STATE` via DataChannel, och en Admin-klient svarar med den aktuella sanningen (`SYNC_STATE`). Detta förhindrar osynkad state (Split-brain).
-   När en Admin eller Teacher ändrar mötestillstånd (t.ex. byter från "Gudstjänst" till "Söndagsskola"), skickas en signal via WebRTC DataChannels.
-   Alla anslutna klienter i rummet lyssnar på denna kanal och uppdaterar sitt lokala UI och språkval omedelbart.

#### 2\. Deltagarnas Integritet & Mute-logik

Vi tillämpar strikt "Zoom-standard" för mikrofonhantering:

**Deltagar-UI:**

-   **Mikrofon/Unmute:** En stor knapp. Deltagaren äger alltid sin egen mikrofon.
-   **Handuppräckning:** En ✋-knapp låter deltagaren visa att de vill tala.

**Admin/Teacher-UI:**

-   **Mute All:** Skickar en signal via DataChannel som tvingar alla klienters `isMuted` till true.
-   **Rättigheter:** En toggle för "Tillåt deltagare att unmuta sig själva" (styr en global `allowSelfUnmute` boolean via DataChannel). Om denna är false blir deltagarnas mick-knapp utgråad.
-   **Ask to Unmute:** En Admin kan aldrig slå på någons mikrofon, utan skickar en förfrågan till deltagaren om de räckt upp handen.

#### 3\. Säkerhetsarkitektur & Stabilitet

-   **Zero-Trust URL Roles (Admin PIN):** URL-parametrar som `?role=admin` är endast önskemål. Appen MÅSTE blockera tillgången och kräva en PIN-kod (verifierad mot miljövariabel) innan admin-rättigheter faktiskt tilldelas i Zustand.
-   **Hard Teardown (Zombie Protection):** Vi använder Reacts key-mönster (t.ex. `<Room key={roomId} />`). Vid varje ändring av rums-ID i URL:en måste hela rums-komponenten avmonteras brutalt för att stänga gamla WebSockets, WebRTC-kanaler och AudioContexts utan risk för läckage (Zombie Connections).
-   **Strict Boot Sequence (Hydration Barrier):** Nätverks- och ljudmotorer har startförbud vid sidladdning. De får anropas först när URL-parametrar är parsade, rollen är validerad via PIN och Zustand är fullt uppdaterat.

#### 5\. UI & Säkerhet

-   **Zero Trust & Säkerhet:** Mottagaren tillämpar "Zero Trust". Admin-kommandon (`ADMIN_MUTE_ALL` etc.) ignoreras strikt om avsändarens roll inte är verifierad som Admin/Teacher.
-   **Stale Closures:** WebRTC/Broadcast-listeners får aldrig förlita sig på reaktiva hook-värden, utan måste alltid läsa färskt state via `useAppStore.getState()`.
-   **Visuell AI-status:** UI-indikatorer (t.ex. pulserande ikoner/animationer) som visar i realtid om AI:n "Lyssnar", "Tänker" eller "Talar".
-   **Proaktiv Felhantering (UI):** Tydliga toasts/modaler vid nekad mikrofonåtkomst eller brutna anslutningar istället för tysta krascher.
-   **DataChannel-validering:** All inkommande data via P2P-kanaler ska saneras och typkontrolleras för att förhindra att korrupta meddelanden kraschar klienternas UI.
-   **Tillgänglighet (a11y):** Tangentbordsnavigering och skärmläsarstöd för kritiska funktioner (Mute, Unmute, Rollbyten).

#### 6\. Lärdomar från Implementation (Gotchas)

-   **COEP & Externa Bilder (QR-koder):** Eftersom vi använder strikta säkerhetsheaders (Cross-Origin-Embedder-Policy: require-corp) för att ljudmotorn ska få maximal prestanda, blockerar webbläsaren externa bilder. Vi kan därför INTE använda externa API:er (som api.qrserver.com) för QR-koder. Vi MÅSTE använda ett lokalt bibliotek (t.ex. `react-qr-code`) som ritar koden direkt som en SVG/Canvas.
-   **API-nycklar & Fallback Chain:** Miljövariabler beter sig olika lokalt (Vite) och i produktion (Netlify/Node). För att göra anslutningen skottsäker MÅSTE vi använda en fallback-kedja vid anslutning: `import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY` etc.
-   **Stale Closures vid Rumsbyte:** För att undvika att React skickar in gamla rums-ID:n vid skapandet av Privata Rum (pga asynkrona state-uppdateringar), måste det nya rums-ID:t skickas in direkt som argument till onConfirm-funktionerna, och vi får inte använda setTimeout för att vänta på state.
-   **Ljudsäkerhet vid Start:** Applikationen måste ALLTID starta med `isLocalAiAudioEnabled = false` för att undvika omedelbar rundgång om en vanlig användare råkar starta AI:n.

#### 

⚠️

 ARBETSREGEL FÖR DENNA FIL

Denna fil hanterar React-komponenter, knappar, visuella states och utskick/mottagning av DataChannel-meddelanden. Den bygger inte om ljudnoder eller AI-prompter.