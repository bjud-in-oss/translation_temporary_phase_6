### 

MODUL 37

 Puppeteer Protocol: Regissören

#### Konceptet: Osynlig Styrning

När en talare tar en lång paus (t.ex. för att läsa i en bok eller tänka), riskerar AI:n att tro att meningen är slut och "hallucinera" fram ett eget slut.  
  
**Lösningen:** Appen agerar "Regissör" (Puppeteer). Vid tystnad skickar vi osynliga textkommandon (User Turns) till AI:n. Dessa syns inte för användaren, men tvingar AI:n att hålla sig aktiv utan att avsluta meningen.

#### Tidslinjen (Systemparametrar)

1.5s

**STEG 1: REPEAT** `[CMD: REPEAT_LAST]`

Om tystnaden varar 1.5 sekunder, ber vi AI:n upprepa sitt _sista ord_ med en tvekande ton. Detta köper tid och signalerar till lyssnaren att "tolken tänker".

3.0s

**STEG 2: FILLER** `[CMD: FILLER "..."]`

Vid 3 sekunder injicerar vi ett utfyllnadsord (t.ex. "Låt se..." eller "Hmm...") baserat på målspråket. Detta håller ljudkanalen öppen ("Holding the floor").

5.0s

**STEG 3: HARD CUT** `RESET`

Om tystnaden varar i 5 sekunder ger vi upp. Vi dödar timern och tvingar fram ett avslut på turen ("Flush") för att spara resurser.

#### Teknisk Implementation

**sendTextSignal()**

En ny funktion i `useGeminiSession` som tillåter oss att skicka:  
`clientContent: { turns: [role: 'user'] }`  
utan att bryta den pågående ljudströmmen.

**Prompt Injection**

Systemprompten har uppdaterats med sektionen **PRIORITY 3: SYSTEM COMMANDS**. AI:n är instruerad att lyda dessa textkommandon med absolut prioritet över ljudanalys.