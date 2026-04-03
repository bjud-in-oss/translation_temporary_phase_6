### 9\. Arkitektur: Blob Injection & Stabilitet (Långa Sessioner)

#### 

PROBLEM

 "Invalid URL" & Byggsystemets Fälla

Moderna byggverktyg (Vite/Webpack) har svårt att hantera sökvägar till Web Workers i produktion. Fel som `Failed to construct 'URL': Invalid URL` uppstår ofta när appen försöker ladda `vad.worker.ts` via `import.meta.url`. Detta dödar ljudmotorn helt.

#### 

LÖSNING

 Strategi: Manual Blob Injection

// Istället för att ladda en extern fil, bäddar vi in koden som en sträng:

const WORKER\_CODE = \`... all källkod här ...\`;

const blob = new Blob(\[WORKER\_CODE\], { type: 'application/javascript' });

const blobUrl = URL.createObjectURL(blob);

const worker = new Worker(blobUrl);

**Resultat:** 100% immunitet mot sökvägsfel. Workern existerar virtuellt i minnet och kräver ingen nätverksförfrågan för att laddas.

#### Stabilitetspaket: För Sessioner > 20 min

-   **Blob-Sanering:** Vi kör `URL.revokeObjectURL(blobUrl)` vid unmount. Annars fylls RAM-minnet med kopior av koden vid varje omstart.
-   **Brutal Terminering:** VAD-modellen (ONNX/WASM) ligger utanför JS Garbage Collector. Vi måste köra `worker.terminate()` för att tvinga webbläsaren att döda tråden.
-   **AudioContext Hard Close:** Webbläsare tillåter max 6 ljudmotorer. Vi anropar `.close()` (inte bara suspend) för att släppa hårdvarulåset.
-   **Zombie-skydd:** Innan en ny anslutning görs, verifierar vi att den gamla WebSocketen är stängd.