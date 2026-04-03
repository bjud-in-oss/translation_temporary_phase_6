### 

MODUL 54

 Audio Routing State Machine

Denna State Machine är hjärtat i ljudhanteringen. Den definierar den slutgiltiga ljudarkitekturen och hur ljud mixas och skickas lokalt respektive till molnet (SFU).

#### 1\. Simple Mode (Standard)

-   **Lokal Uppspelning:** Spelar bara upp den rena AI-rösten lokalt i enhetens standardhögtalare.
-   **Moln-sändning (Radiomix):** Skapar internt en duckad "Radiomix" (Originalljudet duckas automatiskt + AI-rösten läggs över). Denna mix skickas **enbart** till molnet (SFU `broadcast_mix`) för fjärrlyssnare.

#### 2\. Pro Mode ("The Pro Split")

Aktiveras på PC med Tesira/vMix. Använder en `StereoPannerNode` för att separera ljudströmmarna fysiskt.

-   **VÄNSTER KANAL (Salen):** Ren AI-röst. Skickas till Tesira AEC Ref och Takhögtalare. Styrs via en UI-toggle "Spela upp i Sal".
-   **HÖGER KANAL (FM-sändare):** Appens interna Radiomix (Duckat originalljud + AI). Skickas till FM-sändaren för lokala lyssnare med hörlurar.

#### 3\. Zoom- & Klient-upplevelse

-   **Enkel Prenumeration:** Alla fjärrlyssnare (t.ex. via Zoom) prenumererar _endast_ på `broadcast_mix` från SFU:n.
-   **Sömlös Upplevelse:** Lyssnare hör originalljudet klart och tydligt. När ett främmande språk talas, hör de automatiskt tolkningen med det duckade originalljudet i bakgrunden. Inget extra UI krävs.

#### 4\. Flervägssamtal & Klient-publicering

-   **Lyssnare som Sändare:** I privata rum måste även vanliga deltagare ('listeners') tillåtas publicera sitt lokala mikrofonljud till SFU:n (Cloudflare/LiveKit/Daily) när de är unmuteade. Detta möjliggör flervägssamtal.
-   **Spårhantering (Kritiskt för Cloudflare):** För att detta ska fungera när flera pratar samtidigt, måste SFU-adaptrarna uppdateras så att `ontrack`\-eventet använder `stream.addTrack(event.track)` på den befintliga strömmen, istället för att skriva över den. LiveKit och Daily hanterar detta nästan automatiskt, men det är kritiskt att implementera korrekt för Cloudflare.