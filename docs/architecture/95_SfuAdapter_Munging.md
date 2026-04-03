### 

MODUL 95

 SFU Adapters & SDP Munging

**Adapter Pattern:** Systemet är **SFU-agnostiskt**. Detta innebär att administratörer kan välja vilken SFU-leverantör de vill använda via inställningarna.

#### SFU Alternativ

-   **LiveKit Cloud (Rekommenderad):** 10k gratis minuter/månad, inget kreditkort krävs, inbyggd kill switch.
-   **Daily.co (Fallback):** 10k gratis minuter/månad, inget kreditkort krävs.
-   **Cloudflare Calls (För Power Users):** 1TB gratis egress, därefter $0.05/GB. Kräver kreditkort.

#### Server-side SDP Munging (Cloudflare Protection)

För att förhindra obegränsade egress-kostnader med Cloudflare modifierar Netlify Functionen SDP (Session Description Protocol) på serversidan innan den skickas till Cloudflare. Detta är "obrytbart" av klienten.

-   Injekterar `b=AS:24` (24 kbps) för ljud i Chrome/Safari.
-   Injekterar `b=TIAS:24000` (24000 bps) för Firefox (eftersom Firefox ignorerar `b=AS`).

#### WebRTC Garbage Collection (Memory Leak Prevention)

Ett kritiskt arkitektoniskt krav är korrekt hantering av WebRTC-livscykeln i React. Om anslutningar inte stängs ordentligt kraschar webbläsaren med felet `Cannot create so many PeerConnections` efter ca 500 re-renders (vanligt vid Hot Reloads eller rumsbyten).

**Åtgärd:** Reacts `useEffect`\-cleanup måste **alltid** anropa `peerConnection.close()` och nollställa alla referenser. Detta förhindrar port-exhaustion och minnesläckor.