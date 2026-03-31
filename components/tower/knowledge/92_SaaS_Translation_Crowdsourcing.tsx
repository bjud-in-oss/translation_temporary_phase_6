import React from 'react';

const SaaSTranslationCrowdsourcing: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">SaaS, Translation & Crowdsourcing</h1>
    <p>Denna fil definierar strategin för hur plattformen kan skalas som en SaaS-tjänst och hur översättningar kan hanteras via crowdsourcing.</p>
    <ul className="list-disc ml-4">
      <li><strong>SaaS-modell:</strong> Plattformen byggs för att stödja flera organisationer (multi-tenant) där varje församling kan hantera sina egna rum, användare och inställningar.</li>
      <li><strong>Crowdsourcing av översättningar:</strong> Användare ska kunna bidra med översättningar och korrigeringar i realtid för att förbättra AI-modellernas träffsäkerhet.</li>
      <li><strong>Kvalitetskontroll:</strong> Ett system för att verifiera och godkänna crowdsourcade översättningar innan de rullas ut globalt.</li>
      <li><strong>Incitament:</strong> Gamification eller erkännande för användare som bidrar med högkvalitativa översättningar.</li>
      <li><strong>Integration:</strong> Sömlös integration av crowdsourcade data i den befintliga AI-pipelinen för kontinuerlig inlärning.</li>
    </ul>
  </div>
);

export default SaaSTranslationCrowdsourcing;
