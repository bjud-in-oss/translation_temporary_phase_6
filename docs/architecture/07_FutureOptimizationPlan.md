### 7\. Åtgärdsplan & Kritisk Analys

PLAN C

**Prompt-Styrning (Waiting Strategy)**

**Teori:** Beordra Gemini via systeminstruktionen att ignorera korta pauser.

**Analys:**

Geminis interna VAD styrs inte direkt av prompten. Men vi kan instruera den att använda fillers ("Hmm...", "Låt mig se...") innan svaret. Detta köper oss tid.

PLAN D

**BYOD Synkronisering (Arena-ekot)**

**Problem:** Om 50 personer lyssnar i sina mobiler via lokalt Wi-Fi, kommer de ha olika buffertstorlekar (Android vs iOS). Detta skapar ett "Arena-eko" i salen där allas telefoner ligger 50-200ms ur fas.

**Lösning: NTP-stämpel**

Servern (Native App) måste stämpla varje ljudpaket med "Target Play Time" (Server Tid + 500ms). Alla klienter synkar sin klocka mot servern och spelar upp ljudet exakt samtidigt, oavsett när de laddade ner det. Detta tvingar alla enheter att vara i fas, på bekostnad av lite högre latens.