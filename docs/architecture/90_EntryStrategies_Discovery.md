const EntryStrategiesDiscovery: React.FC = () => (

# Inpassering & Discovery

Denna fil definierar hur användare hittar och ansluter till möten (rum), med fokus på friktionfri inpassering och integritet.

-   **QR-koder & Länkar (Primär Inpassering):** Appen ska stödja inpassering via direktlänkar (t.ex. app.com/join/1234), vilka fysiskt kan skrivas ut som QR-koder i kyrksalen. Om användaren skannar med mobilens kamera-app, gårvas de direkt in i rummet.
-   **Manuell Pinkod (Fallback):** En stor textruta på startsidan förblir huvudalternativet för de som saknar QR-läsare, för att undvika skrämmande kamera-rättighets-popups direkt vid sidladdning. Kamera-skanning via webbläsaren erbjuds endast via ett explicit knapptryck.
-   **Rummens Integritet (Visibility):** Databasen för rum (rooms) utökas med en visibility-flagga (public, unlisted, private).
-   **Församlingslistor:** Varje organisation (församling) får en publik landningssida (app.com/utby) som listar pågående möten, men endast de som är markerade som public.
-   **Karta (Discovery):** En specifik flik ("Hitta församling") erbjuder en kart-vy. Denna är strikt separerad från den snabba Onboardingen för att inte störa användare som redan är på plats och bara vill ansluta snabbt.

);