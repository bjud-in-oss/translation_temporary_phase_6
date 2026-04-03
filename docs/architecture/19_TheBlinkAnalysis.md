### 19\. Diagnos: "The Stutter" (Varför det hackade)

Tidigare upplevde vi att texten "hackade till" eller startade om sin animation varje gång AI:n skickade ett nytt ord. Här är varför.

**Förr: Omstart vid varje bokstav**

När texten uppdaterades (t.ex. från "Hej" till "Hej på"), trodde React att det var en helt ny mening. Den raderade "Hej" och skrev ut "Hej på" från noll. Animationen startade om från 0 sekunder, vilket syntes som ett "blixtrande" eller hack.

**Nu: "Ratchet"-mekanism**

Vi använder nu en "spärrhake" (Ratchet) i koden. Vi minns vilket ord vi senast tände. Även om meningen blir längre, får animationen **aldrig gå bakåt**. Vi uppdaterar bara de _nya_ orden i slutet av meningen. De gamla orden förblir tända (Active).

**Teknisk lösning:**

Genom att separera `text`\-datat från `animation`\-logiken (se Modul 20) kan vi uppdatera texten tusentals gånger utan att störa den visuella tidslinjen.

**Technical Implementation Specs**

• **Variable:** `maxReachedIndexRef` (useRef).

• **Logic:** `if (newIndex > maxReachedIndexRef.current) maxReachedIndexRef.current = newIndex;`

• **Reset:** Nollställs **endast** när `timing.groupId` ändras (ny mening).