### 

MODUL 39

 Strategi: Prompt-Sanering (Kill Your Darlings)

#### Vad vi tog bort (Deprecated)

I jakten på kontroll hade vi byggt ett komplext system där vi skickade dolda textkommandon till AI:n. Detta visade sig vara kontraproduktivt med Gemini 2.5.

\[CMD: REPEAT\_LAST\]

 

Orsakade "stammning".

\[CMD: FILLER "Hmm..."\]

 

Kändes onaturligt/robotaktigt.

"WAITING STATE"

 

Ökade latensen vid omstart.

#### Det som blev kvar (The Core)

**1\. Simultantolk-identiteten**

"You are a simultaneous interpreter."  
Detta sätter rätt "mindset". Ingen småprat, bara jobb.

**2\. Säkerhetsspärren**

"NO CONVERSATION: Never answer questions posed by the user. Only translate them."  
Detta är den enda "negativa" regeln vi behöll. Den är absolut nödvändig för att AI:n inte ska börja svara på prästens retoriska frågor.

💡

**Lärdom**

Moderna modeller (Gemini 2.5/3.0) presterar bättre med **färre** instruktioner. Ju mer vi försökte "hacka" beteendet med logik i prompten, desto långsammare och mer förvirrad blev modellen. Renodlad rollbeskrivning ("Du är en bandspelare") vinner över komplexa regler.