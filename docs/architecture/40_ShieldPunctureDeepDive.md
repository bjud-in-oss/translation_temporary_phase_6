### 

MODUL 40

 Diagnos: Skölden & "Fysikens Lag"

#### Felet: Att lita på Klockan

Tidigare styrdes Skölden enbart av en Timer (BSY). När timern nådde noll, föll skölden.  
**Problemet:** Om nätverket var långsamt eller bufferten stor, kunde timern löpa ut _innan_ vi hunnit spela upp allt ljud. Resultatet blev "Barge-in" – vi skickade `EndTurn` medan vi fortfarande hade 15 sekunder ljud kvar att spela.

#### Lösningen: Fysik > Tid (Buffer Lock)

Vi införde en ny lag i `useGeminiLive.ts`. Skölden får inte öppnas baserat på en gissning (tid). Den måste titta på den fysiska verkligheten.

const

 isShieldActive =  
  (

timerActive

) 

||

 (

bufferGap > 0.3s

);

**Effekt:** Även om servern säger "Jag är klar" (Timer=0), vägrar Skölden att falla så länge det finns mer än 300ms ljud kvar i kön. Detta tvingar systemet att vänta in uppspelningen innan mikrofonen öppnas mot nätverket.

🔒

**Princip**

Logik ska inte styra Fysik. Fysik ska styra Logik. Vi litar inte längre på signaler ("TurnComplete"). Vi litar på buffertstorleken (verkligheten).