const CMSOnboardingArchitecture: React.FC = () => (

# CMS Onboarding & Magnifier Math

Denna fil dokumenterar den framtida ombyggnaden av guiden från en platt "Wizard" till ett CMS-drivet Story-format.

-   **Datamodell (Hierarkisk):** Guide -> Slides -> Blocks. En slide kan ha 1, 2 eller 3 kvadratiska (1:1) block i en responsiv CSS Grid (som tvingas till 1 kolumn på mobil).
-   **Visuellt Gränssnitt:** "Story"-streck i toppen för navigering (istället för siffror), samt stora, osynliga touch-zoner (< >) längs skärmens kanter för swipe/klick-bläddring.
-   **Crop & Masking:** Originalbilder (16:9) maskeras in i 1:1-kvadrater via CSS background-position istället för att beskäras fysiskt, för att bevara responsiviteten.
-   **Matematik (Ray-Ellipse Intersection):** Magnifier-motorn ritar sikte och glas som ellipser. Linjen mellan dem beräknas med trigonometrisk strål-korsning för att aldrig krascha vid fönsteromstorlek, skyddad av "debounce" och "null-checks".
-   **In-Place Editor:** Redigering sker genom att klicka på en penn-ikon som öppnar en "Takeover Modal" över skärmen, vilket skyddar CSS-griden från att gå sönder av redigeringsverktygen (sliders).

);