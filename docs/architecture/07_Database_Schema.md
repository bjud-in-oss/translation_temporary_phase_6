# 07. Databas-Schema & Datalivscykel (TTL)

F\u00f6ljande \u00e4r v\u00e5rt g\u00e4llande databasschema f\u00f6r Firestore, inf\u00f6rlivade med en skarp 24timmars sj\u00e4lvst\u00e4dandedoc policy.

## 1. Top-Level Collections & Relations

Appens databas \u00e4r skulpterad kring huvud-kollektionen **Organizations**, med rum inuti som separata hierarkiska strukturer.

1. **`organizations/{orgId}`**
   - Huvudplats f\u00f6r att knyta samman organisationen med dess hemliga API/SFU-nycklar. Inneh\u00e5ller den offentliga pin-coden eller rumskoder som de n\u00e5s p\u00e5 webben.
   - Huvudplats för att knyta samman organisationen med dess hemliga API/SFU-nycklar. Innehåller den offentliga pin-coden eller rumskoder som de nås på webben.
   - *Subcolletion:* `secrets/{secretId}` för krypterade API-tokens.
2. **`rooms/{roomId}/...`**
   - Eftersom dokument i Firestore inte krävs fysiskt över root collection agerar `rooms/{roomId}` stamsätet även utan att döpas explicit från skaparen.
   - *Subcolletion:* `messages` (allt system signalement/loggar)
   - *Subcolletion:* `transcripts` (ren text-audio-inmatning)

## 2. Legacy / Test-mode för Transcripts och Messages

*Viktigt: Den tidigare logiken för 24-timmars radering (TTL) via Google Cloud har skrotats.*

Vår strategi för framtida skalning är att överge Firestore helt för högfrekvent data (som live-transkribering / chatt) och istället flytta detta till Cloudflare WebRTC Data Channels. Sålunda är lagring av `transcripts` och `messages`-dokument under rumskollektioner markerade som **Legacy/Test-mode** och kommer fasas ut.

Firestore kommer på sikt enbart agera initial state och rumsskapande (dvs. hantera `organizations/{orgId}` och instanser av `rooms/{roomId}`).
