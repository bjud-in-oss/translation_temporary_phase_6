### 

MODUL 53

 Rum, Möten & Roller (State Specifikation)

#### 1\. Separation av Roll och Hårdvara (Kritisk Arkitektur)

För att systemet ska vara flexibelt och skalbart har vi en stenhård separation mellan **vem du är** och **vilken maskin du sitter vid**.

**UserRole (Auktoritet)**

-   **Roller:** Admin, Teacher eller Listener.
-   **Styrning:** Sätts via URL-parameter (t.ex. `?role=admin`).
-   **Funktion:** Styr ENDAST vilka UI-rättigheter du har (t.ex. knappar för att byta möte, Mute All).
-   **Enhetsoberoende:** En Admin eller Teacher kan köra appen på en mobiltelefon. Rollen har _ingenting_ med ljudrouting att göra.

**HardwareMode (Ljudrouting)**

-   **Lägen:** Simple eller Pro.
-   **Styrning:** Fysisk toggle-knapp i gränssnittet. Sparas i `localStorage` per enhet.
-   **Funktion:** Styr hur ljudet routas i webbläsaren (t.ex. stereosplit, AEC-inställningar).
-   **Enhetsspecifikt:** Detta är specifikt för den fysiska enhet som är inkopplad i PA-systemet (t.ex. en PC med Tesira).

#### 2\. Konceptet "Rum" (SFU Rooms)

Systemet bygger på isolerade SFU-rum. En användare kan befinna sig i det stora publika rummet eller i ett mindre, privat rum.

**Offentliga Rum (Huvudkyrkan)**

Fasta URL:er (t.ex. `/room/kapellet`). Här sker envägs-tolkning (Smart Broadcast).

**Privata Diskussionsrum**

Unikt hash-ID (delas via QR). Flervägs-tolkning där alla deltagare kan tala.

#### 3\. Översättning av Rumsnamn (UI)

För att undvika onödiga nätverksanrop, API-kostnader och komplex SFU-synkronisering använder vi en statisk ordlista (i18n) snarare än AI för rumsnamn.

**Teknisk Regel: Statisk Översättning (i18n)**

Systemet mappar fasta rums-IDn mot en lokal ordlista. Detta garanterar omedelbar laddning och noll API-förbrukning.

1\. 

// Publika rum:

 Visas enligt lokal ordlista (t.ex. "Huvudsalen", "Main Hall").

2\. 

// Privata rum:

 Dynamiska hash-IDn namnges ej av användaren.

3\. 

// UI-standard:

 Alla privata rum visas enhetligt som "Privat grupp" + Ikon.