# 62. Cloudflare DataChannel Migration

Denna arkitekturplan beskriver hur vi fasar ut högfrekvent data (transcripts och chatt) från Firestore och i stället går över till Cloudflare WebRTC Data Channels. Detta minskar drastiskt våra Firestore-läs-/skrivkostnader och möjliggör omedelbar, skalbar leverans av realtidsdata till anslutna klienter i samma rum.

## 1. Multiplexing
För att undvika onödig komplexitet och extra anslutningstider återanvänder vi samma instans av WebRTC-anslutning (`RTCPeerConnection`) som hanterar audio (via Cloudflare SFU). Så här gör vi gällande datachannels:

- **Etablering:** När vår translator/admin (sändaren) etablerar ljudspåret för mikrofon / AI mot Cloudflares server (`RTCPeerConnection.createOffer`), konstrueras även en datakanal: `const dc = pc.createDataChannel("chat")`.
- **Multiplexing:** WebRTC bakar in DataChannel-signalen tillsammans med ljudpaketen ("multiplexing"). Eftersom Cloudflare SFU vidarebefordrar RTC (inklusive datakanalen) till anslutna mottagare via Tracks och DataChannels, kan vi trycka högförbrukningsdata utan nyckelkostnader.

## 2. The History Burst Mönstret
Eftersom vi därmed eliminerar databas-lagringen och Cloudflare enbart skickar vidare data momentant ("fire-and-forget"), existerar ingen central historik av vad som sagts innan en publik-klient gick in i rummet (t.ex. "sena mottagare"). Vi löser detta med The History Burst-mönstret.

**Implementering:**
1. **Lokal lagring via Zustand (Sändaren):** 
   Sändaren (som producerar översättningar) bygger hela tiden upp en lokal buffert av meddelanden inuti sin Zustand-store. Vi maximerar/cappar denna array, t.ex. till de 100 senaste objekten. 
2. **Vid anslutning (Burst):** 
   När Cloudflare informerar sändaren att en ny lyssnare (Peer) har kopplat upp sig på datakanalen triggas ett `onopen` / anslutningsevent. 
3. **Synkronisering:**
   Sändaren itererar eller batch-skickar on-demand sin sparade Zustand-array i DataChanneln direkt till den nya enheten (`dc.send(JSON.stringify(historyArray))`). Den nya lyssnaren mottar en "history_burst", uppdaterar sin egen lokala Zustand med all tidigare historik, varpå realtidsnätverket fortsätter normalt.

## 3. Stegvis Migrering & Scope
Framgångskonceptet för bytet bygger på löst kopplade UI-komponenter för frontend.

1. **Behåll UI Inaktat:**
   De responsiva chattbubblorna och GUI-komponenterna lyssnar idag rakt på vår Zustand-store (`useStore(state => state.transcripts)`). Det ska de fortsätta att göra. Vi behöver inte redigera en enda render-logik.
2. **Kapsla logik i `useDataChannel.ts`:**
   Migreringen fokuseras enbart på hooken `useDataChannel`. Istället för att ladda och lyssna dygnet runt på Firebase-Snapshots, fokuserar vi hooken på att parsa `channel.onmessage`.
3. **Fasning:**
   Vi behåller de gamla "Firebase"-hookarna som legacy under bytet och implementerar en toggle/boolean för att testköra det nya History Burst-mönstret.
