### 

MODUL 41

 Diagnos: Visuell Integritet (TX Blinking)

#### Problemet: Falska Signaler

Under felsökningen av Skölden såg vi att **TX-lampan** (Transmit) blinkade blått trots att Skölden var Röd (Låst). Detta lurade oss att tro att nätverket läckte, när det egentligen bara var instrumentpanelen som var felkopplad.

**Varför det blinkade:**

handleStreamingAudio() {  
  

triggerVisualTX(); // <-- Låg före if-satsen

  
  if (shieldActive) buffer();  
  else send();  
}

Koden blinkade "Sänder" varje gång _mikrofonen_ levererade ljud, inte när _nätverket_ tog emot det.

#### Lösningen: Flytta Mätpunkten

Vi flyttade den visuella triggern **in i else-satsen**, precis innan `sendAudio()`.

`if (shieldActive) buffer();   else {       triggerVisualTX(); // <-- Nu visar den sanningen       send();   }`

👁️

**Princip: "Lita på Instrumenten"**

Om diagnosverktygen visar input (Mic) istället för output (Net), kan vi aldrig hitta logiska fel. En blinkande lampa i Tower måste betyda att en `WebSocket.send()` faktiskt har skett.