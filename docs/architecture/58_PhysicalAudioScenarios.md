### 

MODUL 58

 Fysiska Ljudscenarier & Routing

Appen är hårdvaru-agnostisk. Detta innebär att routingen ser helt olika ut beroende på vilken maskin och kringutrustning som används. Här dokumenteras hur ljudet flödar fysiskt och virtuellt i våra tre huvudscenarier.

#### 1\. Scenario A: Den lilla gruppen (Mobiler)

-   **Setup:** Flera personer sitter runt ett bord med varsin mobiltelefon (t.ex. iOS Safari) i samma privata rum.
-   **Ljudflöde:** Alla mobiler skickar sitt ljud till SFU. AI-Leadern översätter. Enbart den rena AI-rösten spelas upp lokalt i mobilernas högtalare (ingen duckad mix).
-   **Ekohantering:** Webbläsarens inbyggda mjukvaru-AEC (som är PÅ i Simple Mode) i kombination med låg högtalarvolym förhindrar rundgång. Ingen Pro-routing krävs.

#### 2\. Scenario B: Mac + Ljudpuck (Mellanstort möte)

-   **Setup:** En Mac-dator (Safari/Chrome) kopplad till en Jabra/Polycom-ljudpuck placerad mitt på bordet.
-   **Ljudflöde:** Datorn agerar "Leader". Pucken fångar allas röster → Webbappen → AI → Puckens högtalare.
-   **Ekohantering:** Ljudpuckens stenhårda inbyggda AEC förhindrar effektivt att AI-rösten går tillbaka in i mikrofonen. Viktigt: Eftersom vi använder extern DSP-hårdvara här, rekommenderas att webbläsarens AEC inaktiveras i UI:t (eller att webbläsaren automatiskt känner igen pucken och bypassar sitt eget filter) för att undvika dubbel-AEC.

#### 3\. Scenario C: Huvudkyrkan (Pro Mode via vMix/Tesira)

-   **Setup:** PC-dator inkopplad i kyrkans PA-system och FM-sändare.
-   **Varifrån kommer Zoom?:** Webbappen har ingen aning om vad Zoom är. Den fysiska DSP:n (Tesira) eller mjukvarumixern (vMix) slår ihop ljudet från Salens mikrofoner och Zoom, och skickar in denna mixade klump i Webbappens mikrofon-ingång.
-   **Utljudet (The Pro Split):** Webbappen använder Web Audio API (`StereoPannerNode`) för att skicka ren AI-röst i VÄNSTER kanal, och en duckad Radiomix (originalljud + AI) i HÖGER kanal. Extern hårdvara/mjukvara delar sedan på dessa kanaler och skickar dem till FM respektive Takhögtalare.