### 

FAS 1

 🧠 Core State & Session Memory

Referensmoduler: 53, 57, 59

Denna fas lägger grunden för appen. Innan ljud eller AI-logik byggs, måste vi ha en stenhård hantering av vem användaren är, vilken hårdvara de sitter vid, och hur länge sessionen får leva.

#### 1\. Separation av Roll och Hårdvara (Kritisk Arkitektur)

Zustand-storen (`useAppStore.ts`) måste strikt separera användarens auktoritet från den fysiska ljudroutern.

**UserRole (Auktoritet):**

Kan vara Admin, Teacher eller Listener. Detta styrs via URL-parametrar (t.ex. `?role=teacher`). Detta styr ENDAST vilka UI-knappar som är synliga (t.ex. knappar för att byta möte). En Teacher kan använda en mobiltelefon.

**HardwareMode (Ljudrouting):**

Kan vara Simple eller Pro. Detta styrs av en fysisk toggle-knapp i gränssnittet och MÅSTE sparas i `localStorage` per enhet. Denna bestämmer om appen ska göra en avancerad stereosplit eller inte.

#### 2\. Rums- och Möteslogik

Storen måste hantera två lager av plats:

-   **roomId (Fysiskt rum):** T.ex. "Kapellet". Hämtas från URL (`/room/kapellet`). Styr vilken SFU-kanal vi ansluter till.
-   **meetingState (Digital aktivitet):** T.ex. "Gudstjänst" eller "Söndagsskola". Ändras av en Admin/Teacher i realtid under pågående möte.

#### 3\. Oändligt Minne (Sermon Mode)

För att hantera timlånga möten måste vi förhindra att Googles WebSocket stänger ner pga fullt minne.

**Krav:**

I filen `useGeminiSession.ts` (eller där sessionConfig definieras), måste fältet `contextWindowCompression: {'{'} slidingWindow: {'{}'} {'}'}` inkluderas i konfigurationen mot Live API:et.

#### 4\. Participant & Permission State (UX/Integritet)

Storen måste hantera tillstånd för deltagarnas interaktion, baserat på klassisk videokonferens-standard.

-   **Room Permissions:** En boolean `allowSelfUnmute` (styrs av Admin/Teacher).
-   **Participant State:** Storen måste hålla koll på den lokala klientens `isMuted` (boolean) och `handRaised` (boolean).

**Regel (Integritet):**

En Admin kan **aldrig** tvinga `isMuted` till false (integritet). En Admin kan bara skicka en request, eller tvinga den till true (Mute All).

#### 5\. Säkerhet och Återhämtning

-   **Återanslutningslogik (Auto-reconnect):** Storen ska hantera tillstånd för att automatiskt försöka återställa sessionen vid tillfälliga nätverksavbrott.
-   **Sessionsskydd:** Implementera en varning (beforeunload) som hindrar Admin/Teacher från att oavsiktligt stänga fliken eller ladda om sidan under pågående möte.

#### 

⚠️

 ARBETSREGEL FÖR DENNA FIL

Denna fil definierar endast STATE och KONFIGURATION. Ljudhantering (Web Audio API) och Prompt-byggnation hör hemma i senare faser och ska inte beröras här.