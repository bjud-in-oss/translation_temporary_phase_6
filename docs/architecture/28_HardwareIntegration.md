### 28\. Hardware Integration: Tesira & Pro Mode

För att uppnå studiokvalitet i kyrkomiljö använder vi en "Ren Signalkedja". Detta kräver att både hårdvara (DSP) och mjukvara (App) konfigureras för att inte motarbeta varandra.

#### Problemet: "Double Processing"

**Undervattens-effekten**

Tesira Forté har inbyggd AEC (Ekoupphävmning) och Brusreducering i världsklass. Webbläsare (Chrome) har _också_ dessa filter inbyggda som standard.  
  
Om **båda** är aktiva samtidigt, försöker webbläsaren "tvätta" ett ljud som redan är rent. Resultatet låter robotaktigt, klippt och som att man pratar under vatten.

#### Lösningen: Bit-Perfect Chain

**Steg 1: Hårdvara (Tesira)** 

Biamp Config

Vi måste berätta för datorn att Tesiran hanterar sitt eget eko.

USB Block > Initialization >  
"Speakerphone: Disables Computer AEC"

**Steg 2: Mjukvara (App)** 

Settings

Vi måste tvinga Chrome att stänga av sina filter via `MediaTrackConstraints`.

Inställningar > "Pro Mode"  
\[x\] PRO MODE (Raw Audio / DSP)

#### Det Optimala Flödet

Talare

→

Tesira (AEC+NR)

→

USB (Raw)

→

App (Pro Mode)

→

VAD (Neural)

Med denna kedja får vår Neurala VAD en helt ren signal, vilket gör att den reagerar snabbare och mer exakt på tal vs tystnad.