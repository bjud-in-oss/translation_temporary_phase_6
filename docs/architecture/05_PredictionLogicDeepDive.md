### 5\. Prediktionslogik (The Brain)

Att vänta för länge skapar latens. Att vänta för kort skapar avbrott. Lösningen är en adaptiv modell som byter strategi.

**Steg A: Innan första ljudet (The Guess)**

Från att skölden aktiveras tills första RX-paketet kommer, använder vi följande formel:

Väntetid = (InputLängd \* OlinjärFaktor) + FastMarginal

_Teori:_ Vi antar att AI:n översätter långa stycken proportionellt snabbare än korta (effektivisering). Vi lägger till en fast marginal för säkerhets skull.

**Steg B: Efter första ljudet (Confirmed)**

När första paketet anländer vet vi att en `TurnComplete` högst sannolikt är på väg.

-   • Strategi: **Medelrisk**
-   • Handling: Byt till rullande timer. Om TurnComplete uteblir, behöver vi inte vänta lika länge som i Steg A.

**Steg C: TurnComplete (The Truth)**

Denna signal trumfar allt. Kommer den, faller skölden på millisekunden.