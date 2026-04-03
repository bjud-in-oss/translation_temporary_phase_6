### 

MODUL 51

 Arkitektur: Prompt Engineering & Språkval

Vår arkitektur för AI-prompter är kontextmedveten och byter mall baserat på rumstyp och antal valda språk för att stödja vår SFU-routing.

**UI (Språkval)** 

Väljer språk

→

**Builder** 

Väljer mall & injicerar variabler

→

**System Prompt** 

Låst för sessionen

#### 2\. Språkväljaren (State)

-   **Solo-läge:** I ett privat rum (1 enhet) väljer användaren **två språk**.
-   **Multi-läge:** I SFU/Offentligt rum är det låst till ett enda **Målspråk**.

#### 3\. Prompt Builder (Den Kontextmedvetna Fabriken)

Filen `utils/promptBuilder.ts` byter mall baserat på appens State (antal valda språk/rumstyp).

**Scenario A: Tvåvägs-tolken (Solo-läge)**

När två språk anges, används en strikt villkorsmall för pendling:

1\. Listen to the audio. Identify if the speaker is using {'{{L1}}'} or {'{{L2}}'}.

2\. If {'{{L1}}'} is spoken → Translate to {'{{L2}}'} immediately.

3\. If {'{{L2}}'} is spoken → Translate to {'{{L1}}'} immediately.

**Scenario B: Smart Broadcast (SFU / Multi-läge)**

När endast ett målspråk anges, används en envägsmall med en inbyggd Smart Mute-funktion för att undvika över-översättning av rätt språk:

1\. If the spoken language is NOT {'{{L1}}'} → Translate it to {'{{L1}}'} immediately.

2\. CRITICAL MUTE RULE: If the spoken language ALREADY IS {'{{L1}}'} → BE COMPLETELY SILENT. Do not output any audio.

#### 4\. System Prompt (The Law)

Prompten är statisk. Om användaren byter språk eller rum måste WebSocket-sessionen (`ai.live.connect()`) startas om.

**Båda mallarna delar våra tre heliga grundregler:**

-   **"NEVER BACKTRACK"** (Tape Recorder Protocol).
-   **"IGNORE GRAMMAR"** (Flöde över perfektion).
-   **"NO CONVERSATION"** (Svara aldrig på talarens egna frågor).