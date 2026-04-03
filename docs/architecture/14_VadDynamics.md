### 14\. Arkitektur: Hydraulisk VAD (Tripp Trapp Trull)

Implementation v8.0. Systemet styrs nu helt av **trycket** i två riktningar.

BESLUTSMATRIS (Vid Sköld-öppning)

 

Trigger: TurnComplete / Timeout

**UPPTRAPPNING (Trull/Monolog)** 

1200ms - 2000ms

Villkor A (Materia):

 `DAM > 0 (Utgående Buffert)`

Villkor B (Rörelse):

 `GHOST (Tid > 3s)`

**Utgående Tryck:** Om vi har buffrad data som väntar (DAM), ELLER om du pratat länge (GHOST), måste vi öka toleransen.

Effekt: Vi väntar in andningspauser.

**MJUKLANDNING (Trapp/Lyssna)** 

HALVERA

Villkor: `JITTER > 0.1s` (Inkommande Tryck)

Användaren är tyst, men AI:n pratar (Jitter bufferten spelar upp). Vi sänker toleransen stegvis för att tillåta eftertanke utan att bli för aggressiva.  

Ny SIL = max(SIL / 2, BASE\_SIL)

**ÅTERSTÄLLNING (Tripp/Dialog)** 

BASE\_SIL (275ms)

Villkor: `INGET TRYCK (Varken In eller Ut)`

Total jämvikt. Vi går in i "Ping-Pong"-läge med maximal responsivitet.  

Ny SIL = 275ms

SÄKERHETSPÄRR: THE SQUEEZE

 

Trigger: Taltid > 20s

Oavsett vad TTT-logiken säger, tar "The Squeeze" över om en tur varar längre än 20 sekunder. Den tvingar ner toleransen linjärt mot 100ms för att garantera ett avbrott innan Googles 30s-gräns.