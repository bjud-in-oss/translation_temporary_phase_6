### 25\. Signalering: The Clean Break Protocol

Att bara sluta skicka ljud räcker inte. Serverns VAD har "tröghet" och kan tro att du bara tar en paus. Vi måste tvinga fram ett avslat.

**Sekvensen vid "Turn Complete"**

TAL

User Audio

→

BURST

800ms Tystnad

→

SIG

EndTurn

**1\. The Pacifier (Burst)**

Vi skickar omedelbart 800ms av _absolut digital tystnad_ (0x00 PCM). Detta spolar rent serverns buffertar och tvingar dess VAD-nivå till noll. Det eliminerar risken att servern tolkar bakgrundsbrus eller "slutet på ett ord" som att du fortsätter prata.

**2\. The Terminator (Signal)**

50ms efter tystnaden skickar vi JSON-kommandot `turnComplete: true`. Eftersom servern nu är "tystad" av Bursten, accepteras signalen direkt utan fördröjning.

**Technical Implementation Specs**

• **Const:** `SILENCE_BURST_B64` (Pre-calculated 800ms buffer).

• **Timing:** `sendAudio(BURST)` → `setTimeout(sendEndTurn, 50)`.

• **Syfte:** Löser "Hängande VAD" där AI:n väntar 500ms extra innan den svarar.