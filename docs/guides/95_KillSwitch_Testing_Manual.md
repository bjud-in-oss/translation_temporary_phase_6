# Kill Switch Testing Manual

Denna manual beskriver steg-för-steg hur en administratör verifierar att våra budgetskydd (Kill Switches) fungerar korrekt innan applikationen går live i produktion.

## 1. Test av Cloudflare Bandwidth Cap

Detta test säkerställer att vår SFU (Selective Forwarding Unit) vägrar nya anslutningar när en förutbestämd bandbreddsgräns är nådd.

### Utförande:
1. **Ändra gränsvärdet:**
   Öppna filen `cloudflare-worker/src/index.ts`. Leta upp variabeln `THRESHOLD_BYTES` och ändra dess värde till `0`. Detta simulerar att bandbreddsgränsen redan har överskridits.
2. **Deploya ändringen:**
   Kör följande kommando i terminalen för att rulla ut den uppdaterade workern:
   ```bash
   wrangler deploy
   ```
3. **Verifiera resultatet:**
   Öppna applikationen i webbläsaren och försök starta en session. Öppna webbläsarens utvecklarverktyg (DevTools) och kontrollera fliken "Console" eller "Network".
   - **Förväntat resultat:** Du bör se att ett anrop görs (t.ex. `POST /sessions`) och att detta anrop misslyckas (avvisas av Cloudflare eftersom gränsen är nådd).

### Återställning:
Efter ett lyckat test måste gränsvärdet återställas för att applikationen ska fungera normalt igen.
1. Ändra tillbaka `THRESHOLD_BYTES` i `cloudflare-worker/src/index.ts` till det ursprungliga skarpa värdet.
2. Deploya uppdateringen med `wrangler deploy`.

---

## 2. Test av Firebase/GCP Kill Switch

Detta test säkerställer att Firebase och Google Cloud Platform (GCP) kan stängas ner om det övergripande budgetlarmet utlöses.

### Utförande:
1. **Trigga funktionen manuellt:**
   Gå in i GCP Console och navigera till Cloud Functions för projektet. Leta upp funktionen `killSwitch` (som ligger i `functions/src/killSwitch.ts`). Trigga funktionen manuellt, till exempel genom att skicka in en test-händelse (payload) om den lyssnar på Pub/Sub, för att simulera att ett budgetlarm gått.
2. **Verifiera avstängningen:**
   - Kontrollera att API-åtkomst och fakturering (billing) för det aktuella projektet spärras. *Observera: Var försiktig så att inte andra kritiska projekt påverkas om ni testar på samma GCP-konto.*
3. **Verifiera loggar:**
   Logga in på Netlify och navigera till projektets loggar (utifrån var backend-tjänsterna eller SSR hostas, eller om webhook-svar loggas).
   - **Förväntat resultat:** Du ska kunna se att strängen `"Kill Switch Engaged"` loggas som ett kvitto på att systemet uppfattat budgetstoppet.

---

## 3. Visuell återkoppling i appen (Frontend)

Det är kritiskt att användaren får ett tydligt meddelande om systemet stängs ner från serverns håll, istället för en kryptisk krasch.

### Hantering i `useCloudflareSFU.ts`
När Cloudflare eller Firebase avvisar anslutningar på grund av budgetspärren, måste hooken `useCloudflareSFU.ts` vara byggd för att fånga upp detta gracefully.

- Cacha det specifika nätverksfelet (ex. HTTP 403, 429 eller ett anpassat svar från failover-logiken) som triggas när `THRESHOLD_BYTES` är nådd eller GCP är nere.
- Uppdatera UI-staten (t.ex. via en `error`-variabel) så att applikationen döljer onödiga anslutningsförsök.
- **Förväntat beteende i gränssnittet:** Applikationen ska omedelbart visa ett tydligt felmeddelande på skärmen för användaren:
  > **"Systemet är tillfälligt pausat på grund av budgetgränser"**
