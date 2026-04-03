### 

MODUL 30

 Master Guide: Tesira AEC & Matrix Mix

#### Konceptet: "Single AEC Reference"

Många moderna Tesira-konfigurationer använder en enda gemensam **AEC Reference**\-signal för hela rummet. Detta sparar DSP-kraft men kräver disciplin i Matrix-mixern.

**Gyllene Regeln** 

"Allt ljud som går ut i högtalarna (utom mikrofonerna själva) MÅSTE också skickas till AEC Reference-pinnen."

#### Matrix Mixer: Mix-Minus Schema

Här ser du exakt vilka kryss (crosspoints) som ska vara aktiva i Tesirans Matrix Block.

INPUT (KÄLLA)

OUT: HÖGTALARE  
(Salen)

OUT: AEC REF  
(Referens)

OUT: FM-SÄNDARE  
(Nätverk/Zoom)

1\. Mikrofoner

PÅ

AV

PÅ

2\. Duckad Radiomix (Höger)

AV

AV

PÅ

3\. Ren AI-röst (Vänster)

PÅ

PÅ

AV (Mix-Minus)

#### Symptom: "Pumping" & Dubbel AEC

**Fenomenet**

Om ljudet låter metalliskt, hackigt eller "som under vatten" (Pumping), beror det oftast på att **både** Tesira och Zoom försöker ta bort ekot samtidigt.

**Varför det lät bra ibland?**

AEC jobbar bara när det finns motljud (någon pratar i Zoom). Om du var ensam var Zooms filter inaktivt. Problemet uppstår först vid dialog.

**Lösning: Original Sound** 

Stäng ALLTID av "Echo Cancellation" i Zoom när du använder Tesira. Låt hårdvaran göra jobbet.