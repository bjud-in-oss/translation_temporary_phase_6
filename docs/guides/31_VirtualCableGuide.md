### 

MODUL 31

 Guide: Kablage & Native Bridge Strategy

#### Webbens Begränsning: "The Split"

Webbläsare är isolerade (Sandboxed). De kan inte "höra" vad som kommer ur dina högtalare. Därför måste vi använda **Virtuella Kablar** för att lura webbläsaren att tro att datorljudet är en mikrofon.

**NACKDELEN** 

När du skickar ljudet till Kabeln, tystnar dina högtalare. Du måste manuellt aktivera "Medhörning" i Windows/Mac, vilket är krångligt.

#### Problemet med ASIO

**"Varför ser inte webben mitt ASIO-ljud?"**

Många proffsljudkort (och Dante/Zoom Rooms) använder ASIO-drivrutiner för låg latens. **Chrome/Edge stöder INTE ASIO.** De ser bara standard Windows Audio (WASAPI).

-   Om Zoom skickar ljud via ASIO → Webben är döv.
-   Om du använder VB-Cable (WDM) → Du tappar ASIO-prestandan i Zoom.

#### Framtiden: C++ Native App

En installerad app (C++/Rust/Electron) löser både "Speakerphone"-problemet och ASIO-problemet genom tekniken **Loopback Capture**.

**Webb (Nu)**

Zoom → Kabel → App.  
Du hör inget (utan krångel).

**Native App (Framtid)**

Zoom → Högtalare (Du hör).  
Appen → "Tjuvlyssnar" på högtalaren (WASAPI Loopback).

**Slutsats:** För slutanvändare hemma är en Native App överlägsen eftersom den inte kräver någon konfiguration. "Det bara funkar".

#### Setup: Mac (BlackHole)

Nuvarande Lösning

1.  Installera **BlackHole 2ch**.
2.  Öppna "Audio MIDI Setup". Skapa **Multi-Output Device**.
3.  Kryssa i BÅDE dina hörlurar och BlackHole.
4.  Välj Multi-Output som högtalare i Zoom.
5.  Välj BlackHole som mikrofon i denna Web-app.

#### Setup: PC (VB-Cable)

Nuvarande Lösning

1.  Installera **VB-Cable**.
2.  I Zoom: Välj "CABLE Input" som högtalare. (Ljudet tystnar för dig).
3.  I Windows Ljudinställningar → Inspelning → CABLE Output → Egenskaper → Lyssna.
4.  Kryssa i **"Lyssna på den här enheten"** och välj dina riktiga högtalare.
5.  I Appen: Välj "CABLE Output" som input.