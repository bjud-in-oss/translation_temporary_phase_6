### 

MODUL 57

 Långtidskörning & Minneshantering

För att hantera kyrkans "Sermon Mode" där möten kan pågå i över en timme, måste vi kringgå Googles standardgränser för WebSocket-sessioner (som ofta klipper efter 10-15 minuter för att skydda minnet). Vi använder två experimentella funktioner i `@google/genai` SDK:t för detta.

#### 1\. Context Window Compression (Sliding Window)

-   **Oändliga Sessioner:** Appen använder `contextWindowCompression: { slidingWindow: {} }` i konfigurationen för att tillåta oändliga sessioner (60+ minuter) utan att minnet kraschar.
-   **Perfekt för Tape Recorder Protocol:** Vårt "Tape Recorder Protocol" bryr sig inte om vad som sades för 20 minuter sedan. Det är en fullt acceptabel förlust att servern kastar gammal kontext för att hålla sessionen vid liv. Tolken behöver bara den omedelbara kontexten för att översätta nästa mening.
-   **Sömlöst Ljud:** Inga avbrott sker i den pågående ljudströmmen (PCM) när servern flyttar fönstret. Processen är helt transparent för Web Audio API på klientsidan.

#### 2\. Session Resumption (Återanslutning)

-   **Spara Biljetter:** Vi fångar upp och sparar `SessionResumptionUpdate` (biljetter/handles) från servern lokalt i minnet (t.ex. via en `useRef`).
-   **Nätverkssvängningar:** Om nätverket svajar (t.ex. byter från Wi-Fi till 4G) och WebSocketen dör, försöker vi återansluta med `sessionResumption: { handle: savedHandle }` för att behålla kontexten och undvika en kallstart.
-   **Kritisk Fallback (Hard Reset):** Om nätverket varit nere för länge och återupptagandet misslyckas (eftersom servern har städat bort sessionen), måste koden automatiskt falla tillbaka till att starta en helt ny, ren session.

#### Kända Fallgropar (Gotchas)

**TypeScript Varning**

Eftersom detta är experimentella funktioner i `@google/genai` SDK:t, kan Typescript-definitionerna saknas eller vara inkompletta. Utvecklare får använda `// @ts-ignore` eller casta config-objektet till `any` om nödvändigt för att kompilatorn ska godkänna bygget.