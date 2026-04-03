### 29\. Ljudmixning: The Pro Split (Stereo) & AEC

#### Problemet: AI-Rundgång

**Scenario:** AI:n översätter → Ljudet går ut i kyrkans högtalare → Mikrofonen hör högtalarna → AI:n hör sig själv → AI:n översätter sin egen översättning (Loop).

Mjukvaru-AEC (Webb)  

Ofta för svag för kyrkorum.

Hårdvaru-AEC (Tesira)  

Korrekt lösning.

#### Lösningen: Tesira AEC Reference

För att Tesiran ska kunna "radera" AI-rösten från mikrofonen måste den veta exakt vad den ska leta efter.

Tesira Logic View

USB Input

(AI Ljud)

\--->

Högtalare

Mikrofon

AEC Input

REF

USB Output

(Till App)

**Nyckeln:** Du måste dra en sladd (virtuell) från _USB Input_ (AI-ljudet) till _AEC Reference_\-pinnen på mikrofon-blocket. Då vet Tesiran: "Detta ljud kommer ur högtalarna, ta bort det från mikrofonen."

#### Fler Kanaler? (Stereo Split)

Webbläsare har svårt att hantera 3-4 ljudkort samtidigt. Det bästa sättet att separera t.ex. "AI-ljud" från "Zoom-ljud" in i Tesiran är att använda **Stereo-panorering**.

**Vänster Kanal (L)** 

AI Översättning

**Höger Kanal (R)** 

Duckad Radiomix

I Tesiran tar du emot USB (2-ch). Du splitar upp signalen.  
Vänster → Högtalare + AEC Ref.  
Höger → FM-sändare (Duckad Radiomix).

#### Avancerat: 4x4 Tesira Matrix

**Fråga:** "Vi använder 4 kanaler USB (4in/4out). Fungerar appen då?"  
**Svar:** Ja, men webbläsaren lyssnar normalt bara på Kanal 1 & 2. Du måste mappa ljudet rätt i Tesiran.

Tesira USB UT

Innehåll

Appens Öra

Kanal 1

Talare (Preacher)

PRIMÄR INPUT

Kanal 2

Reserv / Zoom

Ignoreras (oftast)

Kanal 3

Inspelning / Kör

Ignoreras

Kanal 4

Orgel

Ignoreras

**Konfiguration:** I Biamp Canvas, koppla "Talarmikrofonen" till **Pin 1** på USB-utgångsblocket. Det säkerställer att appen hör rätt sak.