### 23\. Kod-Arkeologi: Husets Grundstenar

I programkod finns det ibland rader som ser onödiga ut, men om man tar bort dem rasar taket in. Här är två sådana "bärande väggar" i vår app.

**1\. Historik-Loopen (Bokhyllan)**

Fil: components/SubtitleOverlay.tsx

// Utan denna rad har vi ingenstans att ställa de lästa böckerna

  
{history.map((item) => (  
  <HistoryItem text={item.text} />  
))}

**Risk:** Om någon tar bort denna loop för att "städa", kommer appen bara visa en rad åt gången.

**2\. Bladvändaren (Phrase Counter)**

Fil: hooks/useGeminiLive.ts

// Tvingar systemet att byta blad

  
handlePhraseDetected = (...) => {  
  

phraseCounterRef.current += 1;

  
}

**Risk:** Utan denna skriver vi över samma sida om och om igen. Texten uppdateras men flyttas aldrig till historiken.

**Technical Implementation Specs**

• **Phrase ID:** Måste vara ett `number` (Group ID), inte en sträng.

• **Comparison:** Vi använder `<` och `>` för att sortera historik vs framtid. ID:t måste vara sekventiellt ökande (1, 2, 3...).