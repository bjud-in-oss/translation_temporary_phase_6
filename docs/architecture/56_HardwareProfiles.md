### 

MODUL 56

 Hardware Profiles & AEC

#### 

⚠️

 DEN GYLLENE REGELN OM AEC

Mjukvaru-AEC (Acoustic Echo Cancellation i webbläsaren) och Hårdvaru-AEC (i DSP/Ljudpuck) får **ALDRIG krocka**. Om båda är aktiva samtidigt skapas fasfel, artefakter och ett "undervattensljud".

Webbappen är i grunden **hårdvaru-agnostisk**. Det är dock Admin-vyns ansvar att hantera valet av ljudkort (via `setSinkId` för utljud och `getUserMedia` för inljud). Nedan beskrivs våra huvudscenarier för ljudrouting och AEC.

#### Profil A: Pro Mode (Tesira/vMix)

-   **AEC-Hantering:** Webbläsarens AEC stängs av (`echoCancellation: false`). Tesiran ställs på "Speakerphone: Disables Computer AEC" via USB och sköter all ekosläckning.
-   **Mix-Minus (Hårdvara):** Tesira-hårdvaran konfigureras med "Mix-Minus" i sin Matrix. Detta görs för att undvika att datorns utljud ekar tillbaka in i mikrofonen.

#### Profil B: Simple Mode (Mac + Jabra Puck)

-   **AEC-Hantering:** Webbläsarens AEC stängs av (`echoCancellation: false`). Ljudpuckens inbyggda hårdvaru-AEC förhindrar rundgång och eko helt automatiskt.
-   **Routing:** Ingen Mix-Minus krävs i mjukvaran. Pucken hanterar in/ut.

#### Profil C: Simple Mode (Mobiler)

-   **AEC-Hantering:** Webbläsarens AEC är **PÅ** (`echoCancellation: true`). Eftersom mobilen saknar avancerad DSP-hårdvara måste webbläsaren sköta ekosläckningen.

#### Kända Fallgropar (Gotchas)

**ASIO vs Sandlådan**

Webbläsare förstår **INTE** ASIO-drivrutiner på grund av säkerhetssandlådan. Alla ljudkort, inklusive avancerade system som Tesira, måste presentera sig som standard Windows WASAPI/WDM-enheter för att överhuvudtaget kunna väljas i appen.

**Windows "Ljudförbättringar"**

Om "Windows Sonic" eller annat rumsligt ljud är påslaget i Windows inställningar kan ljud blöda mellan kanalerna. Detta förstör all form av routing och **måste vara avstängt**.