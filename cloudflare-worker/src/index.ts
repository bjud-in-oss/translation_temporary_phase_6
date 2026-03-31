export interface Env {
  SYSTEM_KV: KVNamespace;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string;
}

export default {
  // Körs via Cron Trigger (t.ex. "0 * * * *" för varje timme)
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(checkBandwidthAndLock(env));
  },
};

async function checkBandwidthAndLock(env: Env) {
  const THRESHOLD_BYTES = 0 * 1024 * 1024 * 1024; // 950 GB

  // Beräkna start och slut för innevarande månad
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

  const query = `
    query getTurnUsage($accountTag: string, $start: string, $end: string) {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          callsTurnUsageAdaptiveGroups(
            limit: 1,
            filter: { datetime_geq: $start, datetime_leq: $end }
          ) {
            sum {
              egressBytes
            }
          }
        }
      }
    }
  `;

  const variables = {
    accountTag: env.CLOUDFLARE_ACCOUNT_ID,
    start: startOfMonth,
    end: endOfMonth
  };

  try {
    const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    });

    const result: any = await response.json();
    const usageData = result?.data?.viewer?.accounts?.[0]?.callsTurnUsageAdaptiveGroups?.[0]?.sum;
    const egressBytes = usageData?.egressBytes || 0;

    console.log(`Aktuell SFU-förbrukning: ${(egressBytes / (1024**3)).toFixed(2)} GB`);

    if (egressBytes > THRESHOLD_BYTES) {
      console.log("Kritisk gräns nådd! Låser systemet i KV...");
      await env.SYSTEM_KV.put("SYSTEM_STATUS", "LOCKED");
    } else {
      // Valfritt: Återställ om vi är under gränsen (t.ex. vid månadsskifte)
      await env.SYSTEM_KV.put("SYSTEM_STATUS", "OK");
    }
  } catch (error) {
    console.error("Kunde inte hämta Cloudflare Analytics:", error);
  }
}
