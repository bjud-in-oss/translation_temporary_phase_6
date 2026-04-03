### 3\. Lösningar & Hybridmotor

A

#### Hydraulisk VAD (Tripp Trapp Trull)

Vi har övergett statiska tider för tystnad. Systemet känner av "trycket" i buffertarna.  
• **Utgående tryck (DAM):** Ökar toleransen (Trull) för att tillåta konstpauser i monologer.  
• **Inkommande tryck (JITTER):** Sänker toleransen mjukt (Soft Landing) när AI:n pratar.  
• **Noll tryck:** Återgår till 200ms (Tripp) för blixtsnabb dialog.

B

#### Hybrid-Prediktion & Sköld

När du slutar prata gissar vi hur länge AI:n behöver "tänka" (Olinjärt samband: långa input ger snabbare ord-per-minut). Så fort första ljudpaketet kommer, byter vi strategi till en rullande "Medelrisk"-timer. Detta ger snabba svar vid korta fraser men skyddar vid tunga översättningar.

C

#### WebSocket Full-Duplex

Vi håller en öppen "tunnel" (WebSocket) mot Gemini. Vi strömmar 16kHz PCM-ljud upp och tar emot PCM-ljud ner i realtid.