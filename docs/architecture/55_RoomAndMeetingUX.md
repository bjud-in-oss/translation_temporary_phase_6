### 

MODUL 55

 Room & Meeting UX

#### 1\. Fysiska Rum vs Digitala Möten

Systemet skiljer på den fysiska platsen och den aktuella aktiviteten för att ge en flexibel upplevelse.

-   **Fysiskt Rum (URL):** URL:en definierar det fysiska rummet, till exempel `/room/kapellet`. Detta gör att användare kan bokmärka eller scanna en fast QR-kod vid dörren.
-   **Digitalt Mötestillstånd:** Inuti rummet kan Admin byta Mötestillstånd (t.ex. från "Gudstjänst" till "Söndagsskola").
-   **WebRTC DataChannels:** När Admin byter möte skickas en signal via WebRTC DataChannels. Detta gör att alla anslutna klienter i rummet automatiskt uppdaterar sina språk- och UI-inställningar _utan att ladda om sidan_ eller göra databasanrop.

#### 2\. Deltagarnas Integritet & Mute-logik

Vi tillämpar strikta "Zoom-standard"-regler för mikrofonhantering för att skydda användarnas integritet.

-   **Deltagaren äger sin mikrofon:** En Admin kan **aldrig** tvinga en "Unmute". Admin kan bara skicka en förfrågan ("Ask to Unmute").
-   **Mute All:** Admin kan tvinga "Mute All" via DataChannels, vilket sätter allas `isMuted` till true.
-   **Handuppräckning:** Deltagare har en ✋-knapp för att be om ordet.
-   **Rättigheter:** Admin kan styra en global `allowSelfUnmute` boolean via DataChannels.

#### 3\. Inbjudan via QR

Ikonen för rumsval (fyra kvadrater) i gränssnittet visar rummets QR-kod vid klick, vilket gör delning omedelbar.

**Offentliga Rum**

Har fasta QR-koder som kan printas ut och sättas upp på väggar eller i programblad.

**Privata Diskussionsrum**

Genererar dynamiska Hash-URL:er och QR-koder direkt på skärmen för snabb, tillfällig delning mellan deltagare.