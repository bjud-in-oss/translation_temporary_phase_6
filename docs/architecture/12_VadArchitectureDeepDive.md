### 12\. Systemanatomi: De Tre VAD-Lagren

#### LAGER 1: FYSIK (RMS)

**"Finns det energi?"**

Noise Gate. Filtrerar bort digital tystnad. (0.002)

#### LAGER 2: INTELLIGENS (NEURAL)

**"Är det mänskligt?"**

ONNX Silero Model. Avgör om ljudet är tal.

#### LAGER 3: TID (TRIPP TRAPP TRULL)

**"Är meningen slut?"**

Här bor "Hydrauliken". Toleransen `ACTIVE_SIL` justeras dynamiskt baserat på bufferttryck (DAM/JITTER). I monologer ökar den. Vid 20-30s aktiveras "The Squeeze" för att tvinga fram ett slut.