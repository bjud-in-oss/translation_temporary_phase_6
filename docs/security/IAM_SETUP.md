# IAM Setup & Security Roles (Kill Switches)

För att säkerställa att våra "Kill Switches" fungerar och kan skydda systemet mot skenande kostnader, krävs följande behörigheter i Google Cloud Platform (GCP) och Cloudflare.

## 1. Google Cloud Platform (GCP) / Firebase

Firebase Cloud Function (`stopBilling`) använder Googles Billing API för att programmatiskt koppla bort faktureringskontot från projektet om budgeten överskrids.

### Krav på Service Account
Funktionen körs som standard med projektets **App Engine default service account** (eller Compute Engine default service account beroende på generation). Detta konto måste tilldelas rättigheter för att hantera fakturering.

**Nödvändig Roll:**
*   **Project Billing Manager** (`roles/billing.projectManager`)

**Hur du konfigurerar detta:**
1. Gå till Google Cloud Console -> IAM & Admin -> IAM.
2. Leta upp funktionens Service Account (t.ex. `[PROJECT_ID]@appspot.gserviceaccount.com`).
3. Klicka på pennan (Edit principal) och lägg till rollen **Project Billing Manager**.
4. Spara.

*(Observera: För att kunna tilldela denna roll måste du själv vara Billing Account Administrator).*

## 2. Cloudflare

Cloudflare Workern (`sfu-kill-switch`) läser av GraphQL Analytics API och skriver till Workers KV.

### Krav på API Token
Workern behöver en `CLOUDFLARE_API_TOKEN` (som läggs in som en secret via `wrangler secret put CLOUDFLARE_API_TOKEN`).

**Nödvändiga Behörigheter för Token:**
*   **Account Analytics**: `Read` (Krävs för att läsa `callsTurnUsageAdaptiveGroups`)
*   **Workers KV Storage**: `Edit` (Krävs för att skriva `SYSTEM_STATUS` till KV-namespacet)

**Hur du konfigurerar detta:**
1. Gå till Cloudflare Dashboard -> My Profile -> API Tokens.
2. Skapa en Custom Token.
3. Välj Permissions:
   * Account -> Account Analytics -> Read
   * Account -> Workers KV Storage -> Edit
4. Välj Account Resources: Include -> Ditt konto.
5. Spara och kopiera tokenet till Workerns secrets.
