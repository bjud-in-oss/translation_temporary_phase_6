### 6\. Utvärdering & Verklighetskoll

Teori möter verklighet. Här är de största riskerna med vår arkitektur.

**⚠️ Serverns VAD vs Lokal C\_SIL**

**Problem:** Vi ökar `C_SIL` (Paus-tolerans) i "Trull-läget" (upp till 2000ms) för att tillåta pauser. Men Googles server har en egen VAD-modul som vi inte styr.

**Risk:** Om vår `C_SIL` är längre än Serverns timeout, kommer Servern tro att turen är slut och börja prata (skicka svar) _medan vi fortfarande buffrar_.

**Lösning:** "Dammen". Om Servern börjar prata (RX aktiveras) innan vi är klara, stänger vi Skölden. Vårt buffrade ljud hamnar i Dammen istället för att krocka. Det skickas först när Servern är klar.

**Latens-gapet**

Om Gemini svarar extremt snabbt (Cache Hit) innan vår prediktionstimer (Steg A) löpt ut, förlitar vi oss helt på att RX-detektionen klipper skölden.