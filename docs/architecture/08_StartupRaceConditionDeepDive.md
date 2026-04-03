### 8\. Historik: Uppstartsproblemen (Race Condition & Stall)

Under utvecklingen av v4.0 uppstod två kritiska fel som gjorde att systemet ibland startade "tyst" eller inte alls efter en omstart. Här är den tekniska obduktionen av dessa buggar.

BUGG 1

**Race Condition: "Det tysta startskottet"**

**Symptom:** Användaren tryckte "PÅ". Mikrofonikonen lös grönt, Diagnosen sa "Engine Running", men _inget ljud skickades_ (TX blinkade inte).

**Orsak:** Reacts `useState` är asynkront. När knappen trycktes, anropades `initAudioInput()` omedelbart. Inuti ljudloopen (ScriptProcessor) fanns en säkerhetsspärr: `if (activeMode !== 'translate') return;`. Eftersom React inte hunnit uppdatera variabeln `activeMode` än, trodde ljudmotorn att den fortfarande var "AV" och blockerade sig själv millisekunden efter start.

**LÖSNING: "Force Active" Flagga** Vi skickar nu med `forceActive: true` till init-funktionen. Detta tvingar ljudmotorn att manuellt sätta en intern referens (Ref) till "PÅ" omedelbart, utan att vänta på Reacts långsamma renderingscykel.

BUGG 2

**Engine Stall: "Död vid återuppståndelse"**

**Symptom:** Efter att ha tryckt "Starta Om" i menyn, kopplade WebSocket upp sig (WS: OPEN), men Diagnosen visade `Frames Delta: 0`. Systemet var hjärndött.

**Orsak:** För att spara batteri dödar `disconnect()` hela ljudmotorn (stänger AudioContext). När `connect()` sedan kördes för att återansluta nätverket, antog den att ljudmotorn fortfarande levde. Resultatet blev en öppen telefonlinje där ingen pratade.

**LÖSNING: "Hjärtstartaren"** Vi lade till en kontroll i `connect()`. Innan vi ringer upp Google, känner vi på AudioContexts puls. Om den är `closed` eller `null`, utför vi en blixtsnabb omstart av ljudmotorn ("Heart Start") innan nätverksanropet görs.