### 24\. Lösning: Nummerlappen

Varför fastnade texten på första meningen tidigare? Det handlade om ID-nummer.

**Problemet: "Kund Nummer 1"**

Tidigare gav vi aldrig ut nya nummerlappar. Systemet trodde att allt du sa under 20 minuter var en enda lång beställning från "Kund 1". Därför bytte den aldrig rad, den bara suddade och skrev nytt på rad 1.

**Lösningen: "Ny Kund, Tack!"**

Nu tvingar vi fram en ny nummerlapp (`counter++`) varje gång du tar en paus och börjar prata igen.  
  
**Resultat:**  
1\. "Kund 1" (din förra mening) skickas till arkivet (Historik).  
2\. Skärmen töms och görs redo för "Kund 2" (din nya mening).  
3\. Detta skapar den flödande listan.

**Technical Implementation Specs**

• **Local Generation:** Vi genererar ID lokalt i `handlePhraseDetected`. Vi litar INTE på serverns IDs.

• **Locking:** `responseGroupIdRef` används för att låsa ett inkommande svar till den fras (nummerlapp) som var aktiv när svaret började komma.