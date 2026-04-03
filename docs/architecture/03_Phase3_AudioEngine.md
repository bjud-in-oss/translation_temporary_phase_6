# 03. Phase 3: Audio Engine & AEC Matrix

Denna fas bygger ljudmotorn med Web Audio API. Den ansvarar för att rätt ljud skickas till rätt plats utan att skapa ekoloopar.

## 1. Autoplay Policy & AEC-kontroll

- **Autoplay Policy:** Hooken måste hantera `AudioContext.resume()` vid initiering och uppvaknande (t.ex. vid `VOICE_START` från workleten) för att kringgå webbläsarens blockeringar och spara batteri i "Eco Mode".
- Koden för getUserMedia måste vara dynamisk baserad på HardwareMode (från Fas 1). Om HardwareMode === 'Pro' (eller vid användning av certifierad ljudpuck) måste appen tvinga fram `{ echoCancellation: false, noiseSuppression: false, autoGainControl: false }`. Detta låter Tesira eller Jabra-pucken hantera ljudtvätten och förhindrar "undervattensljud".

## 2. Simple Mode Routing (Mobiler & Ljudpuckar)

När appen körs i standardläge:

- **Lokal Utgång (Högtalaren):** Spelar ENBART upp den rena, nakna AI-rösten (i Mono/Center). Den får absolut inte spela upp mikrofonljudet, för att undvika rundgång i rummet.
- **Nätverksutgång (SFU broadcast_mix):** Appen skapar en "Radiomix" internt. Radiomixen åstadkoms genom att skicka både mikrofonen och AI-rösten genom GainNodes (Mic duckad till 15%, AI på 100%) och en kraftigt inställd `DynamicsCompressorNode` (t.ex. threshold: -30, ratio: 12). När AI:n talar trycker kompressorn automatiskt ner hela mixen (och därmed micken). Denna duckade mix skickas enbart till SFU:n för de som lyssnar med hörlurar hemma.

**DEN GYLLENE LJUDREGELN (Feedback-skyddet):**
Radiomixen (Ducked Mic + AI) får UNDER INGA OMSTÄNDIGHETER kopplas till `audioContext.destination` i Simple Mode. Detta skulle orsaka en omedelbar rundgång (feedback loop) i PA-systemet. Den får enbart exporteras till Nätverket (SFU).

## 3. Pro Mode Routing ("The Pro Split")

När HardwareMode === 'Pro' aktiveras (Huvudkyrkan med Tesira/vMix):
Appen MÅSTE använda en `ChannelMergerNode` (med 2 ingångar) för att garantera absolut hård vänster/höger-separation utan överhörning (bleed). *(Använd aldrig StereoPannerNode för detta).*

- **VÄNSTER KANAL (Ingång 0):** Endast ren AI-röst. Kopplas till PA-systemet i salen och används som referenssignal för hårdvaru-AEC.
- **HÖGER KANAL (Ingång 1):** Endast Radiomixen (kompressorns output). Kopplas till FM-sändaren för hörselhjälpmedel.

## 4. Intern Gain-Routing ("Lärarens Knapp")

I ljudmotorn (både Simple och Pro Mode) måste uppspelningen av den lokala AI-rösten passera en GainNode. Denna nod är mutad (0) som standard, och styrs av UI-knappen "Spela upp AI i Salen" som byggs i Fas 4.

## ARBETSREGEL FÖR DENNA FIL

Denna fil hanterar enbart Web Audio API, noder, ducking-algoritmer och mikrofon-parametrar. WebRTC DataChannels och visuella knappar hanteras i Fas 4.
