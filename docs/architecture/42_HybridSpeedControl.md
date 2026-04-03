### 

MODUL 42

 Tri-Velocity Dashboard: Ekvationen

Total upplevd hastighet är summan av tre oberoende system som samverkar.

**Master-Ekvationen**

TOTAL\_SPEED = PERSONA \* WSOLA \* LERP

1.20x

 

(Densitet)

1.30x

 

(Tid)

1.02x

 

(Pitch)

Exempel vid extrem belastning: 1.2 \* 1.3 \* 1.02 ≈ **1.59x** realtid.

#### De tre lagren

1.

**Persona (Reporter-läget)**

"Tala som en nyhetsuppläsare". Detta handlar inte om att spela upp ljudet snabbare, utan om att AI:n **minskar pauserna mellan ord**. Detta ökar informationstätheten (ord per sekund) naturligt.

2.

**WSOLA (Tidskompression)**

Klipper bort små bitar av ljudet för att korta ner det _utan_ att rösten blir ljus (Kalle Anka). Detta är vår arbetshäst för att jobba ikapp latens mellan 2-10 sekunder.

3.

**Lerp (Smoothing)**

**Alltid aktiv.** Börjar på 0% (1.00x) vid tom buffert. Ökar gradvis till max 2% (1.02x) när bufferten når 15 sekunder. Fungerar som en "stötdämpare" för att undvika hack i ljudet vid hastighetsförändringar.