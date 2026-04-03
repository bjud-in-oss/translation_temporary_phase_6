# 96. Critical Gotchas & Battle Scars

Denna manual innehåller våra viktigaste stridsärr från hantering av Cloudflare SFU (WebRTC) och Firebase Firestore-signalering. Genom att noga studera detta dokument undviker vi att trampa i samma svårbegripliga fällor i framtiden.

## 1. React State Race Conditions vid SFU Initiering

**Problemet:**
Vi har observerat att asynkrona lokala hooks (till exempel `useGeminiLive`) inledningsvis kan returnera ett tomt `roomId`. Om detta tomma ID trillas ner som prop till datakanals-krokar (som `useDataChannel`), utvärderas `useEffect` med en s.k. 'tyst abort': `if (!roomId) return;`. Resultatet är att hela nätverksstacken mot Cloudflare-motorn uteblir – utan att några kraschar eller fel kastas i konsolen.

> [!WARNING]
> Många timmar spenderades på att felsöka varför Cloudflare aldrig anslöts, när felet i själva verket låg i hur React renderar hook-beroenden asynkront.

**Lösningen:**
SFU-anslutningar och WebRTC Data Channels **MÅSTE** hämta Rums-ID:t synkront från den globala tillstånds-storen direkt istället för via en kedja av lokala state-uppdateringar och props. 

```tsx
// ❌ Fel: Race condition risk!
const { roomId } = useGeminiLive();
useEffect(() => {
  if (!roomId) return; // Silent abort!
  connectToCloudflare();
}, [roomId])

// ✅ Rätt: Stabilt uttag direkt från global store på mount
const localRoomId = useStore(state => state.roomState?.roomId);
useEffect(() => {
   if (!localRoomId) throw new Error("SFU requires Room ID!");
   connectToCloudflare(localRoomId);
}, [localRoomId]);
```

## 2. Firestore Ghost Signals (WebRTC Signaling)

**Problemet:**
När en användare ansluter till ett bestående rum utlöser Firestore-lysningarna historiska meddelanden. Om en mottagarklient reagerar på gamla signalerings-event (som `TRACK_AVAILABLE`) i ett WebRTC-rum, prövar klienten ibland att prenumerera på spår/tracks som sedan länge är stängda. Detta leder till fullständig asymmetrisk krasch i MediaStream-objektet och applikationen låser sig.

**Lösningen:**
Signal-lyssnare för WebRTC måste avisa historik rigoröst. Vi löser detta genom en kort offset/buffer (cirka 10 sekunder varningstid) för att tillåta obalans i klockor vid synk, men *aldrig* tillåta "gamla" ghosts.

```tsx
// Vid hookens mount sätter vi vår baseline-tid med ett -10s fönster
const mountTimeRef = useRef(Timestamp.fromMillis(Date.now() - 10000));

// Lyssnaren nekar alla document som är daterade innan denna tidsstämpel
const q = query(
   collection(db, 'rooms', roomId, 'messages'),
   where('timestamp', '>=', mountTimeRef.current)
);
```

## 3. Firestore Object Sanitization (Undefined Error)

**Problemet:**
Firestore Firebase SDK kraschar momentant om skickade data-objekt innehåller nycklar där värdet är `undefined`. Ett vanligt tillvägagångssätt är att använda `delete object.field`, men i en globalt tillgänglig React/Zustand app muterar vi det originella objektet som av ren otur kan användas av ett annat synkront GUI, vilket skapar odefinierbara UI-buggar.

**Lösningen:**
Det enda tillåtna mönstret före en `setDoc` eller `addDoc` är att implementera en ren JS-sanering var funktionell kopia filtrerar bort `undefined`.

```tsx
// En ren formatering som klipper bort fält med värdet 'undefined'
const sanitizedPayload = Object.fromEntries(
  Object.entries(payload).filter(([_, v]) => v !== undefined)
);

await addDoc(colRef, sanitizedPayload);
```

## 4. The Late Joiner Problem (Transcripts)

**Problemet:**
En åhörare kan ansluta mitt i en livesändning (t.ex en predikan) i SFU-rummet. Utan state har klienten noll kontextuell text av vad som sagts dessförinnan, vilket är ett fattigt UI. Att hämta hela rummets historik kan innebära flera megabyte av text och oändliga reads.

**Lösningen:**
När vi förhämtar text (nuvarande Firestore lösning) hämtar vi text i `transcripts`-kollektionen begränsad till de senaste 100 raderna i rummet. 

```tsx
const transcriptQuery = query(
  collection(db, 'rooms', roomId, 'transcripts'),
  orderBy('timestamp', 'desc'),
  limitToLast(100)
);
```
*(Observera: Vid en övergång från Firestore till DataChannels måste detta mönster konverteras till ett lokal The History Burst The Zustand mönster).*
