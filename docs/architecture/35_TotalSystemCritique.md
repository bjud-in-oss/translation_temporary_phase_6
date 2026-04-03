### 

MODUL 35

 Totalanalys & Rekursiv Kritik

#### 1\. Total Funktionalitet & "The Dam"

Systemet är en **Realtids-Orkestrator** som hanterar flödet mellan en fysisk talare och en AI-tolk.

**Korrigerad Definition: "The Shield"**

Skölden kopplar **inte** bort mikrofonen. Den fungerar som en fördämning (Dam).

**Felaktig bild** 

"Klipp kabeln." (Data förloras).

**Korrekt bild** 

"Stäng slussen." (Data buffras).

När AI:n pratar, samlas användarens tal i `shieldBuffer`. När AI:n tystnar, öppnas slussen och allt buffrat ljud skickas som en snabb sekvens ("Burst"). Detta förhindrar att vi tappar ord, men garanterar att AI:n aldrig hörs "i munnen" på sig själv (Semantisk Eko).

(Notera: Sedan övergången till Gemini Live strävar systemet efter Full Duplex utan buffring. "The Shield/Dam" agerar numera endast Fallback vid hög latens).

#### 2\. AEC Topologi (Den totala ljudbilden)

Ekoupphävning sker i tre isolerade lager som inte får krocka.

**1\. Tesira (Rummet)**

Tar bort ekot från **Kyrksalen**.  
Krav: `AEC Reference` måste matas med BÅDE Zoom-ljud och AI-ljud.

**2\. Zoom (Remote)**

Tar bort ekot från **Deltagarnas hem**.  
Krav: Deltagare kör standard Zoom-inställningar (AEC På).

**3\. Appen (Passiv)**

Gör **ingenting** (Pro Mode).  
Krav: Vi litar på Tesiran. Dubbel processning skadar ljudkvaliteten.

#### 3\. Aktionsplan (Fas 1-4)

**FAS 1: Mjukvaran (The Software)**

Optimering av Webbappen. Implementering av "Pro Mode" för att stänga av webbläsarens filter. Ljudmotorn flyttad till AudioWorklet för stabilitet.

**FAS 2: Hårdvaran (The Hardware)**

Fysisk konfiguration av Tesira.  
1\. Stereo Split (Vänster=AI, Höger=Duckad Radiomix).  
2\. Dragning av AEC Reference-kabel i Biamp Canvas.

**FAS 3: Integrationen (The Integration)**

Sammanfogning av mjukvara och hårdvara.

-   **Input:** Komma åt ljudkällor och mixa dem korrekt.
-   **Output:** Distribuera ljudet till kyrkan och Zoom.

**FAS 4: Driften (The Operation)**

Löpande underhåll, övervakning och optimering av systemet i skarp drift.

#### 4\. Rekursiv Kritisk Analys (Iterationen)

Kritik 1 (Skeptikern)

"Buffring (The Shield) låter bra i teorin, men om användaren pratar i 20 sekunder medan AI:n pratar, kommer AI:n att få 20 sekunder gammalt ljud när den är klar. Då svarar den på en fråga som ställdes för en evighet sedan."

Svar (Arkitekten)

Valid poäng. Men alternativet (Barge-in) är värre.  
**Lösning:** FIFO-taket (Modul 10). Vi har satt en gräns på 600 paket. Om bufferten blir för gammal, börjar vi kasta den _äldsta_ datan.

Kritik 2 (Ljudteknikern)

"Ni förlitar er på Tesira AEC. Men om Zoom-deltagarna hemma INTE har headset, utan högtalare, kommer de att skapa ett eko som Tesiran i kyrkan omöjligt kan ta bort."

Svar (Systemet)

Korrekt. Tesira hanterar enbart _Rummet_.  
**Lösning:** Hemma-deltagare kör standard Zoom (med mjukvaru-AEC på). De två systemen hanterar olika akustiska loopar.

\[DEPRECATED\] Kritik 3 (BYOD-säkerhet)

"Om ni kör en lokal webbserver i kyrkan för BYOD, hur hanterar ni HTTPS? Moderna mobiler vägrar spela upp ljud från osäkra (http) källor."

Svar (Fas 3 - Cloudflare SFU)

Detta är en huvudutmaning i Fas 3. All ljud-distribution till mobiler hanteras nu via Cloudflare SFU (WebRTC) i molnet istället för lokala servrar.