### 

MODUL 36

 Distribution: Wi-Fi & Lyssnar-klienter

#### Nulägesanalys: Producent vs Konsument

Just nu är denna app en ren \*\*Generator\*\*. Den skapar ljudet men har inget eget system för att skicka det till 50 personer i kyrkbänkarna.

**Nuvarande Flöde**

App → Ljudkort → Tesira → 

Zoom / Hörslinga / FM-sändare

.  
_Lyssnaren behöver extern hårdvara eller Zoom-appen._

**Vision (BYOD)**

App → Wi-Fi → 

Lyssnarens Mobil

.  
_Besökaren scannar en QR-kod och lyssnar i webbläsaren._

#### Browser Security: Den Automatiska Fliken

**Hindret: Pop-up Blocker**

_"Kan systemet öppna flikar automatiskt när någon ber om ett språk?"_  
  
**Nej.** Webbläsare tillåter endast `window.open()` om det sker som direkt respons på ett användarklick (Trusted Event). Ett WebSocket-meddelande från en server räknas inte som ett användarklick.

**Lösning: Admin Dashboard**  
Vi bygger en vy där Admin ser: _"Förfrågan: Spanska (3 pers)"_.  
Admin klickar på en knapp "Starta Spanska". Då öppnas fliken, eftersom det är en mänsklig handling.

#### Arkitektur för Wi-Fi Lyssning (DEPRECATED)

**OBS: Denna arkitektur är föråldrad.** Vi har övergett idén om en lokal Relay-server. För den aktuella och moderna lösningen baserad på WebRTC och SFU (Selective Forwarding Unit), vänligen se **Modul 52**.

För att lyssnare ska kunna höra översättningen direkt i sina mobiler utan Zoom, krävs en \*\*Local Relay Server\*\*.

Översättar-App

WebRTC / WS

Relay Server

(Node.js / Go)

Mobil 1

Mobil 2

Mobil 3...

**Varför en server?** En webbläsare (Översättar-appen) orkar inte skicka ljudströmmar till 50 klienter samtidigt (Peer-to-Peer kraschar vid ~5-10 anslutningar). Vi måste ha en server som "multiplicerar" ljudet.