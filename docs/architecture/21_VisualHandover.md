### 21\. Överlämning: Det Osynliga Transportbandet

Det svåraste ögonblicket är när en mening är klar och en ny börjar. Det får inte "hoppa" till. Vi löste det genom att efterlikna en teleprompter.

**1\. "Gråa Ut" (Opacity)**

När en mening blir historik, tar vi inte bort den. Vi sänker bara belysningen (`opacity: 0.5`). Det signalerar till hjärnan att "den här är klar, men du kan fortfarande läsa den om du vill".

**2\. Mjukt Glid (Fysikmotorn)**

När en ny mening dyker upp, scrollar vi inte direkt. Vi knuffar hela listan mjukt uppåt. Vår `useScrollPhysics` fungerar som stötdämpare på en bil. Även om datan kommer i ryckiga paket, blir rörelsen på skärmen mjuk.

**Resultat:**

Användaren upplever det inte som att text "byts ut", utan som att man färdas framåt längs ett oändligt pappersark.

**Technical Implementation Specs**

• **Hook:** `useScrollPhysics`.

• **Trigger:** Måste triggas av `activeGroup?.id`. När ID byts, omvärderas målet (Target).

• **Physics:** Spring Tension: 120, Friction: 20.