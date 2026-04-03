### 18\. Diagnos: Tidsankaret (Lookahead)

Varför tänds texten innan ljudet hörs? Det handlar om hur hjärnan fungerar.

**Fenomenet: Perceptuell Latens**

Om vi tänder ordet exakt samtidigt som ljudet spelas upp, upplever hjärnan att texten är "sen". Det tar några millisekunder för ögat att registrera ljuset och för hjärnan att läsa ordet.

**Lösning: Trumslagaren**

Tänk på en trumslagare. Han lyfter pinnen _innan_ han slår på trumman. Vi gör samma sak.

Animationstiden =

 

Ljudtid

 

\+ 0.05 sekunder

Vi lurar systemet att tro att vi är 50ms längre fram i tiden än vad vi egentligen är. Detta gör att texten tänds precis innan ljudet når örat, vilket skapar en känsla av omedelbarhet ("Snappiness").

**Technical Implementation Specs**

• **Constant:** `LOOKAHEAD_OFFSET = 0.05` (50ms).

• **Logic:** `const elapsed = (now - timing.startTime) + 0.05;`

• **Warning:** Ta inte bort detta! Utan 50ms känns appen "laggig" även om den är matematiskt perfekt.