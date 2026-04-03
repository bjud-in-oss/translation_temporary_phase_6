### 1\. Systemets Funktionella Flöde (Testperspektiv)

"Detta är en **Signalkedja**. Ljudet flödar från mikrofon, genom VAD, in i Bufferten, och stoppas sedan av Skölden tills kusten är klar."

**1\. VAD & Input**

Ljudet passerar först `VAD` (Voice Activity Detection). Om `VAD > THR` flaggas det som tal (`SPK`).  
_Test:_ Lyser SPK när du pratar? Om inte, sänk C\_THR.

**2\. Buffert & Dam**

Godkänt ljud hamnar i `DAM` (The Dam) om skölden är uppe.  
_TTT-Logik:_ Om DAM fylls (högt tryck), vet systemet att du håller en monolog och ökar tystnadstoleransen (Trull-läge) för att inte avbryta.

**3\. The Shield (SHLD)**

Skölden skyddar mot avbrott. Den styrs av en **Hybrid-Prediktion**:  
1\. Olinjär gissning (vid tystnad).  
2\. Rullande säkerhetsmarginal (när AI svarar).  
3\. Direkt avslut (vid TurnComplete).

**4\. Utgång & Nätverk**

När skölden faller, skickas allt uppdämt ljud i `DAM` som en "Burst" via `TX` till Google. Svaret kommer tillbaka via `RX`.