import { onMessagePublished } from "firebase-functions/v2/pubsub";
import { google } from "googleapis";

// Initiera Google Cloud Billing API
const billing = google.cloudbilling("v1");

export const stopBilling = onMessagePublished("billing-alerts", async (event) => {
  try {
    // 1. Tolka Pub/Sub-meddelandet från Google Cloud Billing
    const pubsubData = JSON.parse(Buffer.from(event.data.message.data, 'base64').toString());
    
    const costAmount = pubsubData.costAmount;
    const budgetAmount = pubsubData.budgetAmount;

    console.log(`[Billing Alert] Aktuell kostnad: ${costAmount}, Budget: ${budgetAmount}`);

    // 2. Kontrollera om kostnaden överstiger budgeten
    if (costAmount <= budgetAmount) {
      console.log("Kostnaden är under budget. Ingen åtgärd krävs.");
      return;
    }

    console.warn("Kritisk gräns nådd! Initierar Kill Switch för fakturering...");

    // 3. Autentisera mot Google Cloud (använder funktionens inbyggda Service Account)
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform", "https://www.googleapis.com/auth/cloud-billing"],
    });
    const authClient = await auth.getClient();

    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    if (!projectId) {
      throw new Error("Kunde inte hitta Project ID i miljövariablerna.");
    }

    const projectName = `projects/${projectId}`;

    // 4. Koppla bort faktureringskontot (billingAccountName: '')
    const res = await billing.projects.updateBillingInfo({
      name: projectName,
      requestBody: {
        billingAccountName: "", // Tom sträng inaktiverar fakturering
      },
      auth: authClient,
    });

    console.error(`[KILL SWITCH AKTIVERAD] Fakturering inaktiverad för projekt ${projectId}. Svar:`, res.data);

  } catch (error) {
    console.error("Ett fel uppstod vid exekvering av Kill Switch:", error);
  }
});
