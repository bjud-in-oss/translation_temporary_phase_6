### 15\. The Squeeze: Hantering av Monologer

Även i "Trull-läge" (hög tolerans) kan vi inte vänta för evigt. Google har en hård gräns på ca 30 sekunder.

**0-20 sek: Tripp Trapp Trull**

Systemet anpassar sig efter talaren. Om bufferten fylls, ökar vi toleransen för att tillåta konstpauser.

**20-25 sek: The Squeeze (Pressen)**

Vid 20 sekunder börjar systemet bli nervöst. Toleransen sänks linjärt från nuvarande nivå ner till **100ms**. Vid 25 sekunder är vi nere på botten.

**25-30 sek: Andrum (The Gap)**

Vi ligger kvar på 100ms tolerans. Detta är "Kill Zone". Minsta lilla millisekund av tystnad kommer att bryta turen omedelbart för att rädda sessionen innan Googles 30s-gräns slår till.