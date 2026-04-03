### 

MODUL 97

 🎯 Interactive Onboarding Engine & Data Mapping

För att underlätta för nya funktionärer ("Hjälp till"-flödet) överger vi statiska, färdigredigerade bilder i våra guider. Istället introducerar vi en interaktiv, CSS-driven motor för onboarding-kort.

#### 1\. Arkitektur för Viewern & Editorn

**MagnifierViewer.tsx:** Renderar originalbilden med dynamiska CSS-overlays (blur, förstoringsglas med X/Y-koordinater och zoom-faktor). Mellan steget för "Intro" och "SFU" ska den stödja en "Text-Only"-vy där man väljer ljudleverantör.

**MagnifierEditor.tsx:** Ett admin-verktyg där man kan dra förstoringsglasen över bilden. Verktyget genererar en JSON-sträng som kan kopieras och klistras in i koden för att uppdatera guiden permanent.

#### 2\. Den Kompletta Datamappningen

##### Del 1: INTRO

-   **Bild 1:** b84dfbcf-47a5-4d97-a1bd-5876aae6d4d5 (Ingen ring) | "Välkommen! Appen är gratis tack vare BYOK..."
-   **Bild 2:** e5cf2ea5-488f-4d71-9953-7c83fe8ea8c6 (Ring: x:50%, y:50%, zoom:2) | "Internet kan vara rörigt. Vi har suddat ut allt du inte behöver bry dig om..."
-   **Bild 3:** fe7070a5-37cd-4625-94a0-48bec8441ace (Ingen ring) | "Del 1: Din AI-Nyckel. Vi börjar med Google Gemini."

##### Del 2: GEMINI

-   **Bild 1:** 3afdd79f-9520-4819-ac91-d5bb86ff1be1 (Ring: x:12%, y:85%, zoom:3) | "Öppna Google AI Studio. Klicka på 'Get API key' nere till vänster."
-   **Bild 2:** 1c9fd3bd-1e00-4276-b2f4-a47d173dc55d (Ring: x:85%, y:15%, zoom:3) | "Klicka på 'Create API key' uppe till höger."
-   **Bild 3:** 47f3fd65-71d2-4c96-9dc8-76a64c99020c (Ring: x:50%, y:50%, zoom:3) | "Välj Create project."
-   **Bild 4:** 084aea68-36ce-4847-addb-e2d540b9a020 (Ring: x:75%, y:45%, zoom:4) | "Kopiera den färdiga nyckeln."
-   **Bild 5:** a142a8e8-cb96-41a7-9234-e34d51ed8570 (Ring: x:50%, y:50%, zoom:2) | "Klistra in nyckeln i appen."

##### Del 3: VÄLJ LJUDSERVER (Textvy)

Innehåll: Visar alternativ för LiveKit, Daily och Cloudflare med tillhörande beskrivning av gratistimmar. Valet avgör vilka bilder som visas härnäst.

##### Del 4A: LIVEKIT

Länkar i ordning: 693f1605..., 82be7e28..., 2c0b248b..., ba08f099..., af9550c7..., d38efc60.... Fokus (Ring) börjar generellt vid x:50, y:50 och justeras senare via editorn.

##### Del 4B: DAILY

Länkar i ordning: 71f62a2f..., 192c893e..., 79775d18..., 5fb1b3c6..., a9191a79..., f3938dc1..., dd0899c2....

##### Del 4C: CLOUDFLARE

Länkar i ordning: 4788a289..., d92da951..., 468e41f4..., 5c9ea6da..., b7918972..., 177aa3ca....

##### Del 5: OUTRO

-   **Bild 1:** eb5c7d15-c20e-40e8-8495-951220891185 (Ingen ring) | "Redo att tolka! Du har nu framgångsrikt hämtat nycklarna."