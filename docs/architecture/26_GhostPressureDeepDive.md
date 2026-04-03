### 26\. Diagnos: "Loopen" & Ghost Pressure

Det mest kritiska felet vi löste var "Loopen" – där AI:n upprepade första meningen gång på gång, eller klippte av användaren mitt i uppläsning (t.ex. 1 Nephi).

**Problemet: Context Fragmentation**

När vi använde en strikt VAD-gräns (275ms) klipptes ljudet vid varje andningspaus.

Användare: "Och jag, Nephi..." 

\[CUT 275ms\]

AI (Hör bara fragment): "Och jag Nephi."

Användare: "...föddes av goda föräldrar..." 

\[CUT 275ms\]

AI (Förvirrad context): "Och jag Nephi." (Upprepar)

Eftersom AI:n aldrig fick hela meningen ("Och jag, Nephi, föddes av goda föräldrar"), fastnade den i en loop av att försöka tolka fragmenten isolerat.

**Lösningen: Momentum (Ghost Pressure)**

Vi insåg att **Tid är Tryck**. Om en användare har pratat konstant i mer än 3 sekunder (C\_MOM), bygger de upp "Momentum".

**Utan Momentum** 

Dialog-läge

275ms

Klipper snabbt för "snappiness".

**Med Momentum (GHOST)** 

Monolog-läge

1200ms

Tillåter andningspauser.

**Varför 1200ms?** Vi testade 800ms (för kort för 1 Nephi) och 2000ms (för segt för kommandon). **1200ms** visade sig vara den "Gyllene Medelvägen". Det är precis tillräckligt långt för att ta ett djupt andetag och vända blad, men kort nog för att kännas naturligt när man slutat prata.

**Technical Implementation Specs**

• **Trigger:** `speechDuration > MOMENTUM_START (3.0s)`

• **Effect:** `hydraulicTarget = GHOST_TOLERANCE (1200ms)`

• **Visual:** Visas som "GHOST: ON" (Lila) i Tower-panelen.