### 

MODUL 93

 Multi-Tenant BYOK & UX-flöde

Systemet använder en **"Väg 3"-arkitektur (Multi-Tenant, Delegerad BYOK)**. Detta maximerar tillgängligheten för slutanvändare utan att kompromissa med budgetkontroll och säkerhet. Systemet är 100 % kostnadsfritt för plattformsägaren att hosta (Netlify + Firebase Spark). Kostnaderna för AI och medie-routing (Egress) delegeras helt till de enskilda organisationerna via BYOK (Bring Your Own Key).

#### Hierarki och Behörigheter

-   **Plattformsägaren (Infrastruktur):** Tillhandahåller appen via kyrktolk.netlify.app. Betalar 0 kr tack vare free-tiers.
-   **Main-Admin (Ex. Kyrkans IT-ansvarige):** Skapar ett konto och anger organisationens egna Gemini- och SFU-nycklar i inställningsvyn. Nycklarna sparas säkert i Firestore. Bjuder in "Leaders".
-   **Leader (Ex. Lärare/Stödsyskon):** Loggar in i systemet. Kan dynamiskt skapa tidsbegränsade mötesrum via UI:t (ex. URL: /utby/sondagsskola). Aktiverar API-anropen.
-   **Visitor (Lyssnare):** Kräver ingen inloggning. Klickar på en delad länk.

#### Rumstyper & Väntrums-logik (Kostnadsskydd)

För att balansera användarvänlighet med budgetskydd kan en Leader skapa två typer av rum:

-   **1\. Värdstyrda rum (Standard):**
    
    Om en Visitor surfar till möteslänken innan en Leader har startat rummet, placeras de i ett **"Väntrum"** (en låst UI-vy). WebRTC-anslutningen och Gemini-anropen förblir blockerade tills en verifierad Leader träder in i rummet och låser upp sessionen.
    
-   **2\. Auto-Start rum ("Join before host"):**
    
    Ljudmotorn och AI:n startar omedelbart när den första personen klickar på länken (inget väntrum). För att skydda BYOK-budgeten **MÅSTE** dessa rum ha en hård tidsgräns (t.ex. 45 eller 60 minuter) som sätts av Leadern vid skapandet. När tiden löper ut klipper Netlify-dörrvakten anslutningen automatiskt. Detta maximerar friktionen för vanliga användare vid obehörig användning.