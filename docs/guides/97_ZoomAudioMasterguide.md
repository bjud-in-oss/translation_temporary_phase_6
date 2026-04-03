### 

MODUL 97

 🎙️ Masterguide: Ljudhantering i Zoom

Denna guide förklarar hur vi optimerar ljudet för att undvika eko och burkigt tal. Den gyllene regeln för digitala möten är: **Endast en enhet per plats får städa ljudet åt gången.**

#### 1\. Grundprincipen: AEC är LOKALT (Per Klient)

AEC (Acoustic Echo Cancellation) är ett filter som hindrar att ljudet från dina högtalare åker tillbaka in i din egen mikrofon.

**Viktigt Förtydligande:**

AEC sköts individuellt av varje uppkopplad dator/telefon. Att vi stänger av Zooms AEC på kyrkans huvuddator påverkar **inte** de som sitter hemma. Deltagare hemma ska ha sin AEC påslagen som vanligt.

**Dubbel-AEC (Fällan):**

Det vi till varje pris måste undvika är att ha två AEC igång på samma dator. Om både vår hårdvara i kyrkan (Tesira/Jabra) och mjukvaran (Zoom) kör AEC samtidigt på kyrkans dator, "krockar" de. Resultatet blir att röster klipps bort, ljudet pumpar i volym eller låter som om talaren sitter i en plåtburk under vatten.

#### 2\. Scenario A: Stora salen (Biamp Tesira-system)

Målgrupp: Administratörer och Teknikansvariga

I stora salen sköts allt ljud av en Tesira DSP. Det är en kraftfull ljudprocessor som är kalibrerad exakt efter salens akustik och hanterar all ekosläckning (via AEC Ref).

**Inställning i Zoom: "Original Sound for Musicians" – PÅ**

**Varför?** Eftersom Tesira inte är en standard-USB-puck, vet inte Zoom att Tesiran redan städat ljudet. Vi måste tvinga Zoom att hålla fingrarna borta.

**Instruktion:**

1.  Gå till **Settings > Audio** i Zoom.
2.  Välj **Original sound for musicians**.
3.  _Valfritt skyddsnät:_ Markera rutan "Echo cancellation" under Original Sound (detta fungerar som en mild säkerhetsspärr utan att störa Tesiran för mycket).
4.  **I mötet:** Se till att knappen uppe till vänster i bild står på "Original Sound: On".

#### 3\. Scenario B: Mötesrummet (Jabra Speak2 75)

Målgrupp: Lärare och Dagliga användare

Jabran är en "smart" certifierad enhet som pratar direkt med Zoom.

**Inställning i Zoom: "Audio Profile: Auto"**

**Varför?** Genom att ha Zoom på Auto skapar vi ett intelligent skyddsnät. När Jabran används känner Zoom av den och stänger automatiskt av sin egen AEC (Jabrans inbyggda chip sköter det, vilket ger perfekt "Full Duplex").

**Fail-safe:**

Om en lärare glömmer koppla in Jabran och använder laptopens inbyggda mick/högtalare, slår Zooms Auto-läge omedelbart på mjukvaru-AEC. Utan detta skulle mötet dränkas i eko.

#### 4\. Snabbguide för felsökning

**Fjärrdeltagare (Zoom) hör eko av sig själva:**

**Orsak:** Kyrkans AEC fungerar inte. Ljudet från taket går in i prästens mick.

**Lösning (Tesira):** Kontrollera att "Original Sound" är PÅ i Zoom och att webbappen har "Pro Mode" (som stänger av webbläsarens AEC).

**Ljudet klipper / svajar när två pratar:**

**Orsak:** "Double processing" (Både Tesira/Jabra och Zoom försöker städa ljudet).

**Lösning:** Stäng av Zooms mjukvaru-AEC genom att aktivera "Original Sound" (Tesira) eller välja "Auto" (Jabra).

**Ljudet låter burkigt/långt borta:**

**Orsak:** Zoom har tjuvbytt till laptopens inbyggda lilla mikrofon istället för Tesira/Jabra.

**Lösning:** Byt källa i Zooms ljudinställningar.

#### 5\. Varför detta fungerar (Teknisk summering)

1.  Ljud in i mikrofonen.
2.  Lokal hårdvara (Tesira/Jabra) räknar ut vad som är eko och raderar det (Signal in - Högtalarljud = Rent tal).
3.  Datorn (Zoom/Webbapp) tar emot det rena talet.
4.  Om Zoom/Webbappen försöker köra AEC på detta igen, letar den efter eko som inte längre finns. Då börjar den istället äta upp frekvenser i talet (distorsion). Genom att be mjukvaran backa, får nätverket en perfekt ljudsignal.