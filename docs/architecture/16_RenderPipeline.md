### 16\. Grafikmotor: Museet & Dansgolvet

För att få appen att kännas snabb men ändå minnas allt som sagts, har vi delat upp skärmen i två världar med olika regler.

**1\. Historiken (Museet)**

Gamla meningar är som tavlor på ett museum. De hänger stilla på väggen. React (vår byggmästare) ramar in dem en gång och rör dem sedan aldrig mer. Detta sparar enormt mycket datorkraft.

**2\. Aktiv Text (Dansgolvet)**

Den meningen som sägs _just nu_ är på dansgolvet. Här blinkar lamporna (Karaoke-effekten) 60 gånger i sekunden. Vi använder en specialmotor (rAF) här som är supersnabb, men den får **bara** röra den aktiva raden.

**LÖSNINGEN (Varför historiken syns):** Tidigare försökte vi tvinga in allt på dansgolvet. Då försvann de gamla meningarna när musiken stannade. Nu flyttar vi dem aktivt till "Museet" (`history.map`) så fort de är färdiga.

**Technical Implementation Specs**

• **History:** Måste renderas via standard React `{'{history.map(...)}'}` inuti `SubtitleOverlay.tsx`.

• **Active:** Renderas separat som en enda `{''}`\-komponent.

• **Isolation:** `useKaraokeAnimation` får endast referera till ActiveItems DOM-nod, aldrig parent-containern.