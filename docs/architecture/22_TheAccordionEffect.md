### 22\. Fenomen: Dragspelet (Audio vs Text)

Ett kvarstående fenomen är att texten och ljudet rör sig på olika sätt, som ett dragspel som dras ut och trycks ihop.

**Ljudet (Linjärt)**

Ljudet strömmar konstant som vatten ur en kran. 1 sekund är alltid 1 sekund. Det är vår "Sanna Tid".

**Texten (Ryckig)**

Texten kommer i klumpar ("Chunks"). Ibland kommer 3 ord, sen tystnad, sen 10 ord på en gång.

**Konsekvens**

Ibland har vi mer ljud än text (markören stannar upp). Ibland har vi mer text än ljud (markören rusar iväg).  
  
Vår **Hink-logik (Modul 17)** löser detta genom att ständigt räkna om "hur mycket text har vi _just nu_ kontra hur mycket ljud som spelats". Det gör att dragspelet andas mjukt istället för att hacka.

**Technical Implementation Specs**

• **Fallback:** `effectiveDuration = Math.max(audioDuration, estimatedTextNeeded)`

• **Syfte:** Om vi har 5 sekunder text men bara 2 sekunder ljud, får animationen INTE ta 2 sekunder (då blir det oläsligt snabbt). Vi tvingar den att ta den tid texten behöver (5s), även om ljudet tar slut.