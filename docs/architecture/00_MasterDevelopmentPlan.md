### 

MODUL 00

 🏗️ Master Development Plan

#### ✅ AKTUELL STATUS (Färdigställt - RÖR EJ)

Följande funktioner är redan stabilt implementerade i koden. Du får absolut inte bygga om, "förenkla" eller ändra kärnlogiken i dessa utan uttrycklig order:

-   Gemini Live Connection: WebSockets och anslutningen till Googles API fungerar.
-   Simultantolkning (Grund): Ljud strömmas till AI:n och röstsyntes kommer tillbaka.
-   UI med språkväljare, visare av översatt text med kareoke markering (kareokedelen behöver repareras), Ljud och platsväljare (skall uppdateras). Systemdokumentation med planering, parametrar och testmiljö.

Detta dokument definierar arbetsordningen för att bygga AI-översättningsmotorn. För att garantera **"Context Isolation"** och förhindra att kod skrivs över av misstag, är implementationen uppdelad i 4 isolerade filer.

#### Faserna (Se respektive fil för detaljer)

01\_Phase1\_CoreState.tsx

 

Zustand Store, Rum & Minneshantering

02\_Phase2\_AILogic.tsx

 

Prompt Engineering & Språk-kontext

03\_Phase3\_AudioEngine.tsx

 

Web Audio API, The Pro Split & AEC

04\_Phase4\_UX.tsx

 

WebRTC DataChannels & UI

05\_Phase5\_SFU.tsx

 

SFU, Cloudflare Serverless SFU & Global Distribution

#### 

⚠️

 DEN GYLLENE REGLERN FÖR AI-ASSISTENTEN

När en användare ber dig implementera eller skriva kod för en specifik Fas, får du ENDAST läsa kraven i den motsvarande Fas-filen (t.ex. `01_Phase1...`). Du får under inga omständigheter modifiera logik som tillhör andra faser, och du får inte föregå händelserna. Arbeta strikt sekventiellt.