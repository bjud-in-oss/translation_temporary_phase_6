### 

MODUL 96

 Kritiska Gotchas & Lärdomar

Här samlar vi våra viktigaste tekniska "blodiga läxor" kring React, Firebase, WebRTC och infrastruktur. Dessa insikter är avgörande för systemets stabilitet och prestanda.

#### 1\. React: Den sanna meningen med key-propen

Många tror att `key` bara används för att slippa varningar när man loopar arrayer. Den riktiga best practicen är att `key` styr en komponents identitet över tid i Reacts virtuella DOM. Om man byter `key` på en komponent, tvingar man React att unmounta den gamla och montera en helt ny instans.

#### 2\. WebRTC: Autoplay-policys och tystnad

Moderna webbläsare (särskilt Safari och Chrome) har strikta Autoplay-policys. Om en app försöker spela upp WebRTC-ljud innan användaren har interagerat med sidan (t.ex. klickat på en knapp), kommer ljudet att blockeras.  
  
**Lösning:** Kräv alltid att användaren klickar på en "Gå med i möte"-knapp innan `RTCPeerConnection` och ljud-elementet initieras.

#### 3\. Firebase: Firestore vs Realtime DB för Signallering

Även om Firestore är bra för statisk data (som BYOK-nycklar och roller), är det för långsamt för WebRTC-signallering och chatt. Tester visar att Firebase Realtime Database (RTDB) är 10-20x snabbare än Firestore eftersom RTDB använder äkta WebSockets.  
  
**Slutsats:** Använd RTDB för snabba händelser (signallering) och Firestore för lagring.

#### 4\. Infrastruktur och Kostnader: 100 % Gratis med Firebase Spark

Att hosta själva plattformen kostar 0 kr och kräver inget kreditkort. Vi använder Firebase Spark-plan som erbjuder generösa gratisgränser:

-   **Cloud Firestore** (används för inställningar, BYOK-nycklar och roller): Tillåter upp till 50 000 läsningar och 20 000 skrivningar per dag. Detta är ett enormt tak som vår Netlify-dörrvakt sällan kommer i närheten av.
-   **Realtime Database** (används för WebRTC-signallering): Tillåter upp till 100 samtidiga anslutningar (personer uppkopplade exakt samtidigt mot databasen). Eftersom signalleringen är överstökad på några sekunder när SFU-ljudet väl är igång, är detta mycket svårt att slå i taket på.

**Slutsats:** Genom att kombinera Netlify (gratis hosting & functions) med Firebase Spark, delegeras alla eventuella kostnader för medierouting och AI helt till organisationernas egna API-nycklar.

#### 5\. Firebase: onSnapshot och Oändliga Re-renders (Quota Exceeded)

Ett av de farligaste felen i React + Firebase är att skicka in anonyma funktioner (inline callbacks) till en hook som sätter upp en `onSnapshot`\-lyssnare. Eftersom funktionen får en ny minnesadress vid varje re-render, kommer `useEffect` att stänga ner och starta om Firebase-lyssnaren flera gånger i sekunden. Detta leder snabbt till "Quota Exceeded" och kraschar appen.  
  
**Lösning:** Använd **useRef-mönstret** för callbacks. Spara callback-funktionen i en `useRef` som uppdateras i en separat `useEffect`. Använd sedan `.current` inuti `onSnapshot`\-lyssnaren, och ta bort callbacken från lyssnarens dependency-array. Bryt även ut inline-funktioner i föräldrakomponenter till `useCallback`.