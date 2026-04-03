### 

MODUL 99

 Framtidsvisioner (Phase 5)

Här dokumenteras projektets långsiktiga roadmap ("Phase 5"). Arkitekturen är förberedd för dessa paradigmskiften för att ta systemet från en renodlad tolk-app till ett komplett, AI-drivet ekosystem för möten.

#### 1\. Att ersätta Zoom (The Ultimate SFU)

**Vision:** Eftersom vi använder Cloudflare WebRTC SFU (samma underliggande teknik som Google Meet), bygger vi redan ett komplett videokonferenssystem.

**Genomförande:** I framtiden kan appen låta fjärrdeltagare ansluta med både bild och ljud direkt in i våra SFU-rum. Appen kan då spela upp de obearbetade rösterna från fjärrdeltagarna i takhögtalarna. Detta eliminerar behovet av en extern Zoom-klient i kyrkan helt och hållet.

#### 2\. The AI Director (Multimodal Kamera-styrning)

**Vision:** Gemini 2.0+ är multimodala modeller som kan processa video i realtid.

**Genomförande:** Genom att koppla in en webbkamera i Admin-datorn som överblickar kapellet, kan AI:n se vem som ställer sig upp. AI:n kan då via ett API (t.ex. VISCA över IP) skicka kommandon för att styra PTZ-kamerorna i taket och zooma in på rätt person, samt slå på rätt mikrofon på mixerbordet. Appen går från att vara en tolk till att bli en bildproducent.

#### 3\. Smart Bildströmning (Gratisnivå & Ken Burns)

**Vision:** Att sända live-video kan vara extremt resurskrävande och dyrt. För att hålla lösningen 100% gratis för kyrkor kan vi använda smarta bildtekniker.

**Genomförande:** Istället för 30 fps video, skickar vi högupplösta stillbilder. På klientsidan appliceras mjuka **Ken Burns-effekter** (långsam inzoomning och panorering via CSS/JS) för att skapa en illusion av rörelse och liv utan att utmatta servrarna.

**AI-Klippning:** AI:n kan analysera bilden, identifiera talaren och automatiskt beskära (klippa) stillbilden för att förfina kompositionen och fokusera på det som är viktigt, vilket ytterligare förstärker rörelsekänslan.

**Kalkyl för Gratisnivå (Gemini API):**

Googles gratisnivå för Gemini tillåter **15 requests per minut (RPM)**. Genom att uppdatera stillbilden var **5:e till 10:e sekund** (6-12 RPM) håller vi oss väl inom gratisgränsen. Ken Burns-effekten överbryggar gapet mellan bilduppdateringarna så att tittaren inte upplever det som ett statiskt bildspel, utan som en dynamisk sändning.

#### 4\. Fallback: Walkie-Talkie-läget

**Vision:** Om simultantolkning via Gemini Live stöter på oöverstigliga akustiska problem i svåra lokaler, är arkitekturen förberedd för sekventiell tolkning.

**Genomförande:** En "Push-to-talk"-funktion där ljud spelas in, skickas till AI, och sedan spelas upp när talaren är tyst. Detta eliminerar 100% av alla ekoproblem, men till priset av att mötestiden fördubblas.