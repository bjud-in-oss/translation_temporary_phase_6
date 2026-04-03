### 

FAS 5

 🌐 SFU Agnosticism & Adapter Pattern

Denna fas flyttar applikationen från en specifik SFU-leverantör till ett **SFU Adapter Pattern**. Vi stödjer nu LiveKit, Daily.co och Cloudflare Calls för att ge organisationer maximal flexibilitet och kostnadskontroll.

#### 1\. SFU Adapter Pattern & Kalkyler

-   **LiveKit (Rekommenderad):** 5 000 gratis deltagarminuter (ca 83 timmar) / 50 GB. Inget kort krävs. Inbyggd hård spärr (hard limit).
-   **Daily.co (Fallback):** 10 000 gratis deltagarminuter (ca 166 timmar). Inget kort krävs. Inbyggd hård spärr.
-   **Cloudflare Calls (Power Users):** 1 TB gratis egress. Kräver kreditkort. Saknar inbyggd hård spärr, vilket lägger det ekonomiska ansvaret på vår app.

#### 2\. Pub/Sub Logik (Audio Tracks)

-   **Admin Publisher:** När rollen är Admin, skickas `radiomix`\-strömmen (AI + Original) upp som ett WebRTC-track till vald SFU.
-   **Listener Subscriber:** Lyssnare ansluter passivt och prenumererar på Admin-tracket. De pratar _inte_ med Gemini själva, vilket sparar API-kostnader.

#### 3\. SDP Munging (Firefox-kompatibilitet)

För att skydda mot obegränsade egress-kostnader stryper vi ljudet till 24 kbps serverside via SDP Munging.

-   **Chrome/Safari:** Vi injicerar `b=AS:24` (kbps).
-   **Firefox (Kritiskt):** Vi MÅSTE injicera `b=TIAS:24000` (bps).

**Ekonomisk konsekvens:** För Cloudflare betyder 24 kbps att 1 TB räcker i över 92 500 timmar (sparar enormt mycket pengar). För LiveKit/Daily förlängs inte gratistiden (eftersom de debiterar per minut), men det sparar användarnas nätverkskapacitet.