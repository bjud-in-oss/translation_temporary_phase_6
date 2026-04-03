### 

MODUL 98

 Kritiska Gotchas & Akustik (Skyddsnätet)

**⚠️ VARNING:** Detta är vårt "Skyddsnät". Här dokumenteras de kritiska fysiska och tekniska lagar vi identifierat. Framtida utveckling får **aldrig** oavsiktligt bryta mot dessa regler, då det omedelbart förstör systemets ljudkvalitet eller stabilitet.

#### 1\. Lagen om Dubbel AEC (Varning för Undervattensljud)

**Regel:** Mjukvaru-AEC (Webbläsare/Zoom) och Hårdvaru-AEC (Tesira/Jabra) får **aldrig** vara igång samtidigt.

**Konsekvens:** Om båda försöker släcka eko, försöker de förutse varandra. Resultatet blir fasfel, metalliskt ljud och ett bubblande "undervattensljud".

**Lösning:**

Appen tvingar `echoCancellation: false` när Pro Mode är aktivt. Tesiran ställs in på "Speakerphone: Disables Computer AEC".

#### 2\. Tesiras AEC Ref (Lärarens Knapp)

**Regel:** Allt ljud som spelas upp i takhögtalarna MÅSTE skickas till Tesirans AEC Reference-ingång, med exakt samma volym.

**Praktik:** Om "Lärarens knapp" aktiveras så att AI-rösten spelas upp i rummet, måste den routas in i AEC Ref. Annars kommer rummets mikrofoner att plocka upp AI-rösten och skicka tillbaka den till molnet (vilket skapar en oändlig loop av rundgång).

#### 3\. Prestanda & Tråd-svält (Main Thread Starvation)

**Problem:** Vår app använder UI-animationer (karaoke-text, scroll). Ljudhanteringen (`ScriptProcessorNode`) delar tyvärr samma tråd som UI:t (Main Thread). Om UI:t laggar >16ms, svälter ljudbufferten och vi får sprak/klickljud (dropouts).

**Lösning idag:**

Vi tvingar upp bufferten till 4096 samples (~250ms latens) för att ge UI:t andrum.

**Lösning imorgon:**

Koden måste i framtiden refaktoreras till att använda `AudioWorklet`, vilket flyttar ljudbearbetningen till en dedikerad, oavbrytbar bakgrundstråd (likt ASIO).

#### 4\. Förbjuden mixning av Roller och Hårdvara

**Regel:** "Admin" och "Teacher" är Användarroller (styr UI). "Pro Mode" är ett Hårdvaruläge (styr stereosplittning och ljudkort).

Anta aldrig att en Admin sitter vid en PC. En Admin kan sitta på en iPhone på bussen.