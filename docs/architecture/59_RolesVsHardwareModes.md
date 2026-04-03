### 

MODUL 59

 Roller vs Hårdvarulägen

**Kritisk Begreppsseparering**

I vår arkitektur får vi **aldrig** blanda ihop Användarroller (vem du är) med Hårdvarulägen (vilken maskin du sitter vid). En administratör kan sitta vid en mobiltelefon, och en vanlig lyssnare kan sitta vid en avancerad PC. Dessa två koncept är helt frikopplade från varandra.

#### 1\. Användarroller (Mötesrättigheter)

-   **Styrs via URL:** Rollen definieras av parametrar i URL:en (t.ex. `?role=teacher` eller `?role=admin`).
-   **UI-Rättigheter:** Ger tillgång till UI-kontroller för att byta mötestillstånd (t.ex. från "Gudstjänst" till "Söndagsskola") via WebRTC DataChannels.
-   **Oberoende av Hårdvara:** En lärare eller admin kan köra detta från en vanlig iPhone. Rollen tvingar **aldrig** fram avancerad ljudrouting eller specifika hårdvarukrav.

#### 2\. Hårdvarulägen (Audio Routing Mode)

Detta styrs av en lokal switch i klientens UI, och sparas i `localStorage` för den specifika enheten. Det definierar hur ljudet hanteras lokalt på maskinen.

**Simple Mode (Standard)**

Skickar allt ljud i mono/stereo centrerat, precis som ett vanligt webbsamtal.

**Används för:** Mobiler, Mac-datorer och Ljudpuckar.

**Pro Mode (Mix-Minus Ready)**

Aktiverar vår "Pro Split" (Vänster = Ren AI-röst, Höger = Duckad Radiomix) och **inaktiverar** webbläsarens inbyggda AEC.

**Används för:** Endast den specifika PC som är inkopplad i Tesira/vMix.

**Graceful Fallback:**

Om en användare på en iPhone försöker aktivera Pro Mode (som saknar stöd för avancerad kanalseparering eller inaktivering av AEC på iOS Safari), avbryts försöket snyggt och appen faller automatiskt tillbaka till Simple Mode.