### 11\. Hydraulisk VAD: Tripp Trapp Trull

#### 

IMPLEMENTERAD (v8.0)

 Aktiv Logik i `useAudioInput`

Denna logik är inte längre en hypotes. Den körs live i varje "Worker Result"-cykel. Systemet beräknar dynamiskt `ACTIVE_SIL` (Paus-tolerans) baserat på tre tillstånd:

-   **Trull (Monolog):** Aktiveras om `damPressure > 0` (Full ut-buffert) ELLER `ghostPressure` (Tid > 3s). Toleransen ökas kraftigt för att tillåta andningspauser.
-   **Trapp (Lyssna):** Aktiveras om `jitterPressure > 0.1s` (AI:n pratar). Toleransen halveras mjukt för att vi ska sluta prata snabbare om vi blir avbrutna.
-   **Tripp (Dialog):** Aktiveras vid noll tryck. Återgår till `275ms` för blixtsnabb ping-pong.

**Kod-Implementering (Pseudokod)**

let

 target = 275;

if

 (shieldBuffer.length > 0) target = 2000; 

// Trull (Dam)

else if

 (ghostActive) target = 1200; 

// Trull (Ghost)

else if

 (bufferGap > 0.1) target = C\_SIL / 2; 

// Trapp

// Tripp är fallback (275ms)

**SQUEEZE (Nödstopp):**

Om `speechDuration > 20s`, tvingas target linjärt ner mot 100ms oavsett ovanstående logik.