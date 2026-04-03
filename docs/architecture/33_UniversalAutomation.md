### 

MODUL 33

 Strategi: Antigravity & Cross-Platform

#### Utvecklingsmiljön: Google Antigravity

Med **Google Antigravity** (Agent-first IDE) kan vi automatisera mycket av "boilerplate"-koden. Eftersom plattformen har terminal- och webbläsarkontroll är den idealisk för att bygga **Tauri**\-appar.

**Ditt Workflow (Chromebook)**

-   Kör Linux (Crostini) på Chromebooken.
-   Använd Antigravity för att skriva Rust/React-koden.
-   Kör `npm run tauri dev` lokalt för att testa UI och logik.

#### Utmaningen: Linux vs Kyrkan

**Hemma (Linux)**

• Ingen Tesira.  
• Inget ASIO.  
• Standard Mikrofon.

**Kyrkan (Windows)**

• Tesira via USB.  
• ASIO Drivrutiner.  
• Windows Audio Session (WASAPI).

#### Lösningen: "Mocking"

Du behöver inte sitta i kyrkan för att koda. Vi bygger appen så att den är "Hårdvaru-agnostisk".

**1\. Abstraktionslagret (Rust)**

Vi skriver en Rust-modul som heter `AudioSource`.  
\- På **Linux**: Den kopplar upp sig mot PulseAudio (din mic).  
\- På **Windows**: Den försöker först ladda ASIO/WASAPI Loopback.

**2\. Bygg & Deploy**

När du är nöjd med koden på Chromebooken, kör du ett "Cross-Compile" build script (eller GitHub Action) som spottar ut en `.exe`\-fil. Denna fil flyttar du till kyrkdatorn.

🚀

**Nästa steg**

1\. Använd din Chromebook och Linux.  
2\. Starta ett nytt projekt i Antigravity/AI Studio för **"Tauri Native Host"**.  
3\. Instruera AI:n: _"Jag utvecklar på Linux men målet är Windows med ASIO. Skapa en Rust-backend som använder 'CPAL' (Cross-Platform Audio Library) så att jag kan testa med min mic hemma."_