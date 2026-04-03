### 4\. Barge-In Skydd: "The Shield"

#### Huvudproblemet: Halv-Duplex Beteende

Gemini Live beter sig som en walkie-talkie. Om vi sänder ljud (TX) medan den pratar (RX), tystnar den omedelbart för att lyssna ("Barge-in"). Vi måste skydda AI:n från att höra oss medan den pratar eller tänker.

**VIKTIGT: Skölden klipper inte sladden**

Skölden kopplar **inte** bort mikrofonen fysiskt. Det skulle göra att vi tappar ord. Istället styr den om ljudet till en temporär buffert ("Dammen"). När AI:n har pratat klart, öppnas dammluckorna och allt sparat ljud skickas iväg som en snabb sekvens.

##### Fas 1: Prediktiv Sköld (Olinjär Gissning)

När VAD upptäcker tystnad aktiveras skölden (Buffring startar). Tiden beräknas olinjärt baserat på längden på ditt tal + en fast säkerhetsmarginal.  
_Logik:_ Vi vet inte OM den svarar, så vi tar höjd.

##### Fas 2: Rullande Fönster (Medelrisk)

SÅ FORT vi tar emot det **första** datapaketet (RX) från AI:n, vet vi att förbindelsen lever. Vi kastar då bort gissningen från Fas 1 och använder en kortare, rullande timer som förlängs för varje nytt paket som kommer.

##### Fas 3: TurnComplete (Absolut)

Om signalen `TurnComplete` anländer, öppnas skölden **omedelbart** och bufferten töms ("flush"). Detta är den ultimata sanningen som nollställer systemet.