### 

MODUL 52

 SFU & Cloud Routing (WebRTC)

#### Paradigmskifte: Från Lokal Relay till Moln-SFU

Vi har övergett idén om att bygga och underhålla en egen lokal "Relay Server" (Node.js/Go) på plats i kyrkan. Istället använder vi en modern molnbaserad **SFU (Selective Forwarding Unit)**, som till exempel Cloudflare Realtime eller LiveKit, via vår `networkService`.

**Gammal plan (Lokal Relay)**

-   Kräver fysisk server/dator på nätverket.
-   Svårt med brandväggar och NAT.
-   Bandbredden på det lokala nätverket blir en flaskhals vid många lyssnare.
-   Ingen inbyggd ekosläckning eller avancerad routing.

**Ny plan (Moln-SFU)**

-   Noll installationskrav lokalt.
-   Inbyggd TURN-server löser alla brandväggsproblem.
-   Molnet tar bandbreddssmällen, obegränsat antal lyssnare.
-   Branschstandard WebRTC hanterar anslutningarna, medan vi behåller full lokal kontroll över AEC (mjukvara vs hårdvara) per klient.

#### Unicast vs Pub/Sub (Tracks & Rum)

I en traditionell P2P-lösning (Unicast) måste sändaren ladda upp en separat ljudström för varje lyssnare. Med 50 lyssnare kraschar sändarens uppkoppling direkt på grund av bandbredds- och CPU-brist.

Lösningen är en SFU med **Publish/Subscribe**\-modell. Appen publicerar endast **1 Audio Track** till det virtuella rummet i molnet. SFU:n tar sedan den tunga uppgiften att kopiera och skicka ut strömmen till alla 50 prenumeranter.

**Sändare (Appen)** 

Publicerar 1 Track (Audio)

1x Uppladdning

**Moln-SFU** 

Virtuellt Rum: "Svenska"

50x Nedladdningar (SFU:n gör jobbet)

Lyssnare 1

Lyssnare 2

Lyssnare 3...

**Sammanfattning:** Genom att publicera ett enda "Track" till SFU:n, sparar sändaren enormt mycket bandbredd och CPU. SFU:n hanterar sedan den tunga uppgiften att kopiera och skicka ut strömmen till alla prenumeranter i rummet, oavsett om de sitter på samma Wi-Fi eller på andra sidan jorden.