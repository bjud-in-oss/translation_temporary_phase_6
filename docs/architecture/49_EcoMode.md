### 

MODUL 49

 Energi: Eco Mode (Silence Detection)

Ljudkortet är en av de största strömtjuvarna på en laptop. Att hålla igång en DAC (Digital-to-Analog Converter) kostar batteri även om man spelar tystnad.

#### Väckarklockan

**Princip: Suspend-on-Idle**

Vi har implementerat en energimätare (RMS) direkt i `AudioWorklet`\-tråden.

-   Om utgående volym är < 0.001 i **3 sekunder**, skickas signalen `VOICE_STOP`. Huvudtråden kör då `ctx.suspend()`. Hårdvaran stängs av.
-   Om volymen stiger över gränsen, ELLER om ny data kommer via nätverket, skickas `VOICE_START`. Vi kör `ctx.resume()` blixtsnabbt.

#### Varför detta är viktigt

På en Chromebook (batteridrift) kan en aktiv AudioContext dra 5-10% CPU konstant. Med Eco Mode faller detta till nära 0% under tystnad. Dessutom eliminerar det "vitt brus" (hiss) som billiga ljudkort ofta genererar när de är aktiva men tysta.