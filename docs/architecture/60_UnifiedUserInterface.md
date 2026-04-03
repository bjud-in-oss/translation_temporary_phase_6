# 60. Unified User Interface (Unified Flow)

Denna fil beskriver vår UX-arkitektur där vi helt frångår traditionella statiska flikar (t.ex. separata vyer för "Deltagare", "Chatt", "Presentation"). Istället bygger vi upplevelsen p\u00e5 ett s\u00f6ml\u00f6st **Event Stream Paradigm** d\u00e4r alla systemh\u00e4ndelser binds samman kronologiskt.

## 1. Onboarding & Display Name
Eftersom varje transkribering och interaktion (\"r\u00e4cker upp handen\") m\u00e5ste k\u00f6ttas till en specifik person f\u00f6r att Event Stream-vyn ska bli l\u00e4slig drar vi f\u00f6ljande krav:
- **Tvingande Namnkrav:** Strax innan eller direkt efter rumskoden matas in m\u00e5ste b\u00e5de Listeners och Admins ange ett \"Display Name\" (alternativt h\u00e4mtas detta on-the-fly om de anv\u00e4nder Google/Apple Sign-In). 
- Detta l\u00e4ggs till i `StartPage` och `PinCodeModal` UX-fl\u00f6det.

## 2. Navigationsstruktur (Top & Bottom)
Vi nyttjar en klassisk, tydlig topp- och bottenmeny likt moderna m\u00f6tesverktyg (t.ex. Zoom).

### Ljud & Maskinvarukontroller
- **Tydliga ikoner:** Stora och intuitiva knappar f\u00f6r Mute/Unmute p\u00e5 b\u00e5de egen mikrofon (f\u00f6r s\u00e4ndare) och uppspelningsljud/h\u00f6gtalare (f\u00f6r alla).
- **Asynkron inh\u00e4mtning av enheter:** 
  Vid ikonerna finns sm\u00e5 pilar f\u00f6r att expandera dropdown-menyer och byta enhet.
  - **Kritiskt UX-krav (Permissions):** Innan vi anropar `navigator.mediaDevices.enumerateDevices()` inf\u00f6r drop-down menyerna, m\u00e5ste vi kolla beh\u00f6righet via `navigator.permissions.query`. Systemet ska mjukt indikera \"V\u00e4ntar p\u00e5 mikrofon\u00e5tkomst\" till anv\u00e4ndaren godk\u00e4nner popupen i sin webbl\u00e4sare. D\u00e4refter cachas enheternas r\u00e4tta namn i bakgrunden.

### Spr\u00e5kv\u00e4ljare
- **Kompakt Visning:** P\u00e5 mobiler/sm\u00e5 sk\u00e4rmar minimeras spr\u00e5kv\u00e4ljaren till sin landskod/spr\u00e5kkod (t.ex. "SV" eller "EN").
- **Utg\u00f6r en s\u00f6kbar modal:** Klick \u00f6ppnar en ren, s\u00f6kbar lista med standardiserad terminologi f\u00f6r spr\u00e5ken.
- **Shared Device Mode:** N\u00e4r Tv\u00e5 anv\u00e4ndare sitter fysiskt vid samma enhet ritas tv\u00e5 asynkrona spr\u00e5kv\u00e4ljare j\u00e4mte varandra vars val modifierar dual-channel \u00e5tergivning eller grafiskt delad text.

## 3. Event Stream Paradigm (Mitten-vyn)
K\u00e4rnan visas h\u00e4r och agerar som ett flytande h\u00e4ndelsefl\u00f6de d\u00e4r allt l\u00e4ggs i ordning.

- Allt \u00e4r **100% kronologiskt**. Inga meddelanden \"pinnas\" artificiellt (utom uppvisade bilder) baserat p\u00e5 vem som pratar. Allt lagras i en l\u00e5ng array av Events.
- Events \u00e4r b\u00e5de: \"Talar just nu...\", \"R\u00e4cker upp handen\", \"Ny admin stiger in\".

### The Collapsed View (Intelligent Deduplicering)
Agerar som standardvy och \u00e4r det absolut smidigaste s\u00e4ttet f\u00f6r en Lyssnare att se vilka som medverkar och adresserar det de bryr sig om as-it-happens.
- **Reducer-baserad State (Viktig R\u00e4ttelse):** Collapsed View bygger **inte** p\u00e5 att vi h\u00e5rdkodat filtrerar de sista 100 raderna chat historik. Ist\u00e4llet driver vi Collapsed View p\u00e5 en frikopplad `Participant State` reducer. Varje aktiv unik deltagare har d\u00e4r en h\u00e5rdpekare p\u00e5 sin senast k\u00e4nda action. Det g\u00e4r vi f\u00f6rlorar aldrig en k\u00e4nd profil \u00e4ven om deras 105:e gamla rad d\u00f6ljs i huvud-chatten.
- **Visuellt Formt:** Visas som dynamiska \"kort\": `[Namn]: [Deras nuvarande aktivitet / text..]`

### The Expanded View (Historiken)
N\u00e4r anv\u00e4ndaren trycker/klickar n\u00e5gonstans mitti detta f\u00e4ll ned rullas Collapsed ut och all event-historik un-hides in l\u00e4sbar logg.
- **Historik-Capping:** Av mobila RAM-hj\u00e4lp renderas h\u00f6gst de ~100 modernaste tr\u00e5draderna. \u00c4ldre rader Garbage-Collectas i webbl\u00e4saren, med en minimal loader ifall vi scrollar l\u00e5ngst up (\"Ladda mer\").
- **Scroll Anchoring (Kritiskt UX-Krav):** Eftersom n\u00e4tet pl\u00f6tsligt trycker in upp till 99 items OVANF\u00d6r det nodobjekt anv\u00e4ndaren klickade p\u00e5 s\u00e5 anv\u00e4nder vi en ref till click-event elementet och kombinerar `getBoundingClientRect()` med Reacts `useLayoutEffect` f\u00f6r att direkt korrigera scrollbeteendet asynkront.

### Bildvisaren (Presentationsl\u00e4ge)
Bilder behandlas skilt d\u00e5 de inte \u00e4r sm\u00e5 notiser utan grafiskt f\u00f6rst\u00e5ndematerial.
- Bilder h\u00e5lls upplyfta! Fixerade (`sticky` eller `fixed`) i \u00f6vre delm\u00e5ttet av f\u00f6nstret (max ~50% av viewport h\u00f6jd).
- Nedanf\u00f6r f\u00f6rsts chatten.
- Animationskrav: Ers\u00e4ttning mellan tv\u00e5 bilder m\u00e5ste fr\u00e5n API renderas maximalt mjukt i \u00f6verg\u00e5ngen (crossfade p\u00e5 max `1 fps`). De dumpas omedelbart ur historiken efter st\u00e4ngning.
