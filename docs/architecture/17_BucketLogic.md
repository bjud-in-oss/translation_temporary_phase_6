### 17\. Grafikmotor: Hink-Logiken (Bucket Logic)

Hur vet datorn vilket ord som ska lysa och hur länge? Vi kan inte dela tiden rättvist, för ordet "i" går fortare att säga än "institutionalisera".

**Liknelse: Vattenhinkar**

Föreställ dig att varje ord är en hink.  
1\. Ett kort ord (t.ex. "Hej") är en liten kopp.  
2\. Ett långt ord (t.ex. "Välkommen") är en stor balja.  
3\. Ett kommatecken är en extra skvätt volym (paus).

Tiden är vattnet som rinner. Vi häller vattnet i hinkarna i tur och ordning. När vattnet rinner ner i "Välkommen-baljan", lyser det ordet på skärmen. Eftersom baljan är stor, lyser ordet längre.

**Matematiken (Viktning)** `Vikt = Antal Bokstäver`

-   Punkt (.) ger +15 vikt (Lång paus)
-   Komma (,) ger +6 vikt (Kort paus)

**Resultatet**

Karaoke-effekten känns "mänsklig" eftersom den saktar ner vid långa ord och stannar upp vid punkter, precis som en riktig talare.

**Technical Implementation Specs**

• **Punctuation Weight:** `. ! ?` = +15 chars. `,` = +6 chars.

• **Calculation:** `wordDuration = (wordWeight / totalWeight) * totalTime`

• **File:** `hooks/useKaraokeAnimation.ts`