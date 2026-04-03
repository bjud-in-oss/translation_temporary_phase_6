### 

MODUL 34

 Sermon Mode: 20-Minuters-Strategin

"Kan jag prata i 20 minuter utan paus?"  
Svaret är tekniskt sett **Nej** (servern gör timeout), men praktiskt sett **Ja** (om vi fuskar).

#### Begränsningen

Gemini Live är en _Turn-based_ modell. Den förväntar sig:  
`Lyssna → Tänk → Svara.`

Om den tvingas lyssna i 20 minuter utan att få svara ("Turn Complete"), fylls dess **Input Buffer** upp. Till slut klipper servern anslutningen för att skydda sig mot minnesläckage.

#### Lösningen: "Invisible Segmentation"

**Vi lurar systemet**

Appen har en inbyggd säkerhetsspärr i `useAudioInput.ts`.

if (speechDuration > 25.0s) {  
  flushTurn(); // Tvinga iväg ljudet  
}

-   **Micro-Turns:** Även om talaren (prästen) pratar oavbrutet, klipper appen ljudet i bitar om max 25 sekunder.
-   **Context Window:** Eftersom Gemini har ett "minne" (Context), kommer den ihåg vad som sades i förra klippet. Den kan därför fortsätta en mening grammatiskt korrekt även om vi klippte den mitt i ett ord.
-   **Resultat:** För användaren ser det ut som en oändlig ström. För servern ser det ut som en väldigt snabb konversation.

⏳

**Tips:** Om du ser att texten "hackar till" var 25:e sekund, är det detta skyddssystem som arbetar. Det är priset vi betalar för oändlig transkribering.