### 10\. Arkitektur: MessagePort & Buffert-tak

#### 

IMPLEMENTERAT (v7.0)

 MessagePort Audio Engine

Ljudmotorn är nu frikopplad från UI-tråden och använder **AudioWorklet** med `postMessage` (Zero-Copy Transfer).  
Detta har möjliggjort en halvering av buffertstorleken från 4096 till **2048 samples**, vilket ger en latensförbättring på 128ms utan att riskera "klickljud" vid tung grafik.

#### 

IMPLEMENTERAT (v8.0)

 Buffert-tak (800 Paket)

**Problemet: Ketchup-effekten**

Vid nätavbrott fortsätter vi spela in. Om avbrottet varar i 5 minuter, skulle vi vid återanslutning skicka 5 minuter ljud på en sekund. Detta överbelastar både servern och vår logik.

**Lösning (Aktiv i kod): FIFO med Tak**

Systemet har nu en hårdkodad spärr i `useGeminiLive.ts`.  
`const MAX_BUFFER_PACKETS = 800;`  
Om bufferten överstiger detta (ca 100 sekunder), raderas automatiskt det _äldsta_ paketet ("FIFO-shift"). Detta är nu en aktiv skyddsmekanism som förhindrar server-krasch vid långa avbrott.

#### 

STATUS: LIVE

 Kvarstående Utmaningar

**Monolog-timeout (20 min)**

Google har en hård gräns. Om ljud streamas i 20 minuter _utan en enda tystnad på 500ms_, klipper de anslutningen. VAD-systemet (The Squeeze) försöker motverka detta, men teoretiskt kan en extremt snabb talare trigga detta.