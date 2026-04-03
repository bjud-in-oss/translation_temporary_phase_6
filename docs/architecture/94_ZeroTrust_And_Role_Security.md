# 94. Zero-Trust & Role Security

Detta dokument utgör vår säkerhetsbeskrivning och regelverk kring rättigheter och skydd av känsliga data när vi hanterar WebRTC (Cloudflare), LLM-kommunikation (Gemini) och Cloud Database Access. Arkitekturen följer en utpräglad Zero-Trust modell.

## 1. No LocalStorage för API-nycklar

**Krav/Problem:**
Alla molnsystem vi integrerar med ställer höga krav på access-tokens (Cloudflare App ID, Gemini API keys). Oerfarna utvecklare sparar dessa ofta i webbläsarens `localStorage`, särskilt under den tidiga onboarding-setupen, för att underlätta utvecklarupplevelsen.

> [!CAUTION]
> Under inga omständigheter får Cloudflare- eller Gemini-nycklar persisteras i localStorage i klartext. Att överge tokens på klientens lagringsdisk innebär grava säkerhetsbrister i produktion.

**Lösning:**
Arkitekturen designar in allt som flyktigt (RAM). Webbläsaren hämtar dessa tokens genom säkra förhandlingar via **Netlify API (BFF)**. När sidan laddas om tappar klienten kontexten och måste utföra ny rums-identifieringsfas. Ingen cachelagring sker på klient-driven.

## 2. Hårdkodad SFU-Blockad för Listeners

**Krav/Problem:**
Vi verkar inom en en-till-många topologi (t.ex. en mick/translator in, många lyssnare ut). Även om "Lyssnare" aldrig ges UI-knappar för mick, kan avancerade webbanvändare emulera sändar-events till Cloudflare SFU genom utvecklingskonsolen.

**Lösning:**
Ett hårdkodat barrikaderings-skikt säkerställer passivitet i Media-klasserna via villkoret `role === 'admin'`. Utan en bestyrkt `admin` roll kan VAD-motorn rulla och ljud fångas lokalt ifall användaren har mick rättigheter, men signalering nekas prompt att sänka tracks upp mot molnet (`pc.addTrack` och push blockeras helt), samt att klienten saknar behörighet att exekvera transkriberings-writes mot databasen.

## 3. PIN-kod för Sändare (Admins)

**Krav/Problem:**
URL-strukturen stöder query parameters i stil med `?role=admin` för att navigera UI:t. Detta kan missbrukas av besökare genom att man manuellt plussar på attributen bakom rumslänkar.

**Lösning:**
Query parametern kan i sig enbart tillkalla en speciell landningsskärm – den verkar aldrig som behörighetsgivare. 
Även om applikationen läser `role=admin` i URL:en, kommer detta tvinga fram en **PinCodeModal**. Denna verifierar användarens knapptryckningar via en `read`-begäran mot Databasen och kräver kryptografiskt-korrekta/inställda pinkod för rummet för den specifika organisationen INNAN den app-övergripande rättigheten (`isAdmin: true`) initieras i systemets Zustand-store.
