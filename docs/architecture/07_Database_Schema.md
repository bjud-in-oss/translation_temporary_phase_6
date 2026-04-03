# 07. Databas-Schema & Datalivscykel (TTL)

F\u00f6ljande \u00e4r v\u00e5rt g\u00e4llande databasschema f\u00f6r Firestore, inf\u00f6rlivade med en skarp 24timmars sj\u00e4lvst\u00e4dandedoc policy.

## 1. Top-Level Collections & Relations

Appens databas \u00e4r skulpterad kring huvud-kollektionen **Organizations**, med rum inuti som separata hierarkiska strukturer.

1. **`organizations/{orgId}`**
   - Huvudplats f\u00f6r att knyta samman organisationen med dess hemliga API/SFU-nycklar. Inneh\u00e5ller den offentliga pin-coden eller rumskoder som de n\u00e5s p\u00e5 webben.
   - *Subcolletion:* `secrets/{secretId}` f\u00f6r krypterade API-tokens.
2. **`rooms/{roomId}/...`**
   - Eftersom dokument i Firestore inte kr\u00e4vs fysiskt \u00f6ver root collection agerar `rooms/{roomId}` stams\u00e4tet \u00e4ven utan att d\u00f6pas explicit fr\u00e5n skaparen.
   - *Subcolletion:* `messages` (allt system signalement/loggar)
   - *Subcolletion:* `transcripts` (ren text-audio-inmatning)

## 2. 24-Timmars Radering (Time To Live / TTL)

N\u00e4r vi utnyttjar Cloudflare SFU med st\u00e4ndigt inl\u00f6pande text logs (uppemot 1 per sekund vid m\u00e5nga l\u00e4nkar) riskerar databasen sv\u00e4lla fruktansv\u00e4rt och rulla \u00f6ver fri-volymtier rader p\u00e5 n\u00e5gon dags anv\u00e4ndn.

D\u00e4rf\u00f6r konfigurerar vi **Firestore TTL (Time To Live)** s\u00e5 att databasen st\u00e4dar per automatik via GCloud Services. 

### Kritiskt Teknisk Krav (Firestore Types)
F\u00f6r att \u00f6verenskomna systemst\u00e4dningar fungerar kr\u00e4ver Google strikt format: 
Man kan *icke* f\u00f6rdela integer / Number-ms data. Kolumnen `expiresAt` m\u00e5ste registreras som det officiella Firestone/Firebase formatetet Timestamp.

- **V\u00e5r Standardmall n\u00e4r en message/transcript skapas i Typescript Node:**
```tsx
  await addDoc(collection(db, 'rooms', roomId, 'messages'), {
     ...msgData,
     // S\u00e4tt en 24-TIMMARS f\u00f6rfallotidspunkt korrigerat till ett r\u00e4tt m\u00e4tit Google Timestamp
     expiresAt: Timestamp.fromMillis(Date.now() + 86400000), 
     timestamp: serverTimestamp()
  });
```

### Konfigurera i Produktionsmilj\u00f6n (Google Cloud Console)
F\u00f6r att skriptet ovan ska ha verkan m\u00e5ste folket/admin som r\u00e5r \u00f6ver FireBase-klient-portalen d\u00e4refter bygga en Time-To-Live Policy f\u00f6r dessa subcollections.
Det g\u00f6rs antingen via `gcloud firestore field-ttl policies set ...` med f\u00e4ltnamnet satt p\u00e5 `expiresAt`. Detta g\u00e4ller b\u00e5de "messages" samt "transcripts". Ingen kod b\u00f6r p\u00e5 v\u00e5ran sida byggas p\u00e5 cron/scheduler cloud funktion d\u00e5 detta tj\u00e4nar noll extra valuta relativt den inbyggda gcloud funktionen.
