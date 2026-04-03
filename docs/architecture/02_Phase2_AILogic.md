### 

FAS 2

 🤖 AI Logic & Prompt Engineering

Referensmoduler: 51

Denna fas ansvarar för filen `utils/promptBuilder.ts`. Systemet får inte längre lita på en enda statisk prompt, utan måste vara kontextmedvetet.

#### 1\. Den Kontextmedvetna Buildern

Funktionen som bygger systemprompten måste läsa av appens tillstånd (hur många språk som är valda, eller vilket rums-läge som är aktivt) och dynamiskt välja mellan två olika huvudmallar innan anslutningen till Gemini öppnas.

#### 2\. Scenario A: Tvåvägs-tolken (Solo-läge)

Används när en användare sitter ensam med en enhet (t.ex. en telefon som skickas mellan två personer) och har valt två språk (L1 och L2).

**Krav på Mall:**

Prompten måste explicit instruera AI:n att använda en IF-logik: "Lyssna på ljudet. Identifiera om L1 eller L2 talas. Om L1 talas -> översätt till L2. Om L2 talas -> översätt till L1."

#### 3\. Scenario B: Smart Broadcast (SFU / Multi-läge)

Används i Huvudkyrkan eller i privata rum där varje deltagare har en egen enhet och bara har valt ett Målspråk (L1).

**Krav på Mall:**

AI:n agerar envägs-tolk. Prompten måste innehålla vår Smart Mute-funktion för att förhindra över-översättning och dubbelekande.

**Kritisk instruktion:**

"Översätt allt du hör till \[Målspråk\]. KRITISK REGEL: Om språket som talas REDAN ÄR \[Målspråk\], var helt tyst och generera inget ljud."

#### 4\. The Core Laws (Gäller för alla mallar)

Oavsett vilken mall buildern väljer, måste följande grundregler alltid injiceras i slutet av prompten för att tvinga fram låg latens:

-   **"The Tape Recorder Protocol":** Linear flow. NEVER backtrack or restart a sentence to regain context.
-   **"Speed over perfection":** IGNORE GRAMMAR. It is acceptable if the output is grammatically broken.
-   **"Safety":** NO CONVERSATION. Do not answer questions asked by the speaker. Only translate.

#### 5\. API Robustness

Definiera en strategi för felhantering mot Gemini API.

-   **Felhantering:** Hantering av rate-limits/kvoter, timeouter och oväntade krascher.

#### 

⚠️

 ARBETSREGEL FÖR DENNA FIL

Denna fil hanterar enbart textsträngarna och villkoren för att generera instruktionen till AI:n. Web Audio API-hantering och SFU-anslutningar hanteras i Fas 3.