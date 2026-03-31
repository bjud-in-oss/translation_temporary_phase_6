import React from 'react';

const Phase7Masterplan: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-300">
      <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-indigo-400 mb-2">Fas 7: Skalbarhet, Ekonomi & Säkerhet</h2>
        <p className="text-sm">
          Detta dokument fastställer arkitekturen för hur systemet ska gå från en lokal prototyp till 
          en globalt skalbar, självhostad plattform med obefintliga driftskostnader och noll ekonomisk risk.
        </p>
      </div>

      <section>
        <h3 className="text-lg font-semibold text-white mb-3">1. Arkitektur (Ljud & Text)</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong className="text-white">Ljud via Cloudflare SFU:</strong> Sändaren (tolken) ansluter direkt till Gemini Live API via WebSockets. 
            Det översatta ljudet skickas som ett (1) spår till Cloudflare Calls (SFU). Cloudflare kopierar och distribuerar ljudet till lyssnarna. 
            Detta utnyttjar Cloudflares generösa gratiskvot på 1 Terabyte per månad.
          </li>
          <li>
            <strong className="text-white">Text via WebRTC DataChannels:</strong> För att undvika databas-kvoter (som Firestore) ska transkribering 
            och systemkommandon (t.ex. PTZ-kamerastyrning från AI) skickas i samma WebRTC-anslutning som ljudet via Cloudflare. Detta ger 
            noll latens och drar inga databasanrop.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-white mb-3">2. Gemini Live API - Kapacitet & Demo-läge</h3>
        <p className="text-sm mb-2">
          Systemet utnyttjar Googles Free Tier-gränser för Gemini Live API som ett naturligt säljverktyg (PLG):
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong className="text-white">3 Samtidiga Sessioner:</strong> Gratisnivån tillåter max 3 samtidiga sessioner. Tack vare vår SFU-arkitektur 
            räknas ett helt församlingsmöte med hundratals lyssnare som endast 1 session mot Gemini. Vi kan därmed erbjuda 3 parallella 
            demo-möten globalt på en enda gratisnyckel.
          </li>
          <li>
            <strong className="text-white">Sessionsförlängning:</strong> Google stänger anslutningen efter 15 minuter. Appen använder 
            <em>Session Resumption</em> och <em>Context Window Compression</em> för att sömlöst och oändligt återansluta.
          </li>
          <li>
            <strong className="text-white">Tokens:</strong> Gränsen ligger på 1 000 000 Tokens Per Minute (TPM). Tre kontinuerligt talande sändare 
            använder mindre än 3 % av denna gräns.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-red-400 mb-3">3. Säkerhet: The Billing Kill Switches</h3>
        <p className="text-sm mb-2">
          För att skydda projektet från oändliga kod-loopar och illvilliga DDOS-attacker (som kan orsaka astronomiska moln-fakturor) 
          krävs det att två separata "Kill Switches" implementeras innan BYOK-lansering:
        </p>
        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <h4 className="font-semibold text-white">Google Cloud (Skyddar Gemini & Firebase)</h4>
            <p className="text-sm mt-1">
              En GCP-budget kopplas till ett Pub/Sub-ämne. En separat Firebase Cloud Function lyssnar på ämnet. Om budgeten (t.ex. 50 kr) överskrids, 
              använder funktionen Googles Billing API för att sätta <code>billingAccountName: ''</code>. Detta kopplar omedelbart bort 
              kreditkortet och tvingar projektet till en säker, gratis Spark-nivå.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
            <h4 className="font-semibold text-white">Cloudflare (Skyddar SFU Bandbredd)</h4>
            <p className="text-sm mt-1">
              En schemalagd Cloudflare Worker frågar GraphQL Analytics API (<code>callsTurnUsageAdaptiveGroups</code>) om förbrukad bandbredd 
              varje timme. Om egressBytes överstiger t.ex. 950 GB (nära 1 TB-taket), blockerar Workern API:et för att skapa nya rum via en 
              hårdkodad 403 Forbidden-respons, vilket fryser systemet tills nästa månad.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Phase7Masterplan;
