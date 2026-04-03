### 20\. Lösningen: Arkitekt & Elektriker (Hybridmotor)

För att få 60 bilder i sekunden (silkeslen animation) var vi tvungna att dela upp ansvaret i koden. Vi kallar det "Hybrid-rendering".

**1\. React (Arkitekten)**

Reacts jobb är att **bygga huset**. Den placerar orden på skärmen i rätt ordning. Den är långsam men noggrann. Den körs bara när ny text kommer från servern.

**2\. rAF Engine (Elektrikern)**

Detta är en supersnabb loop (requestAnimationFrame) som körs 60 gånger i sekunden. Elektrikerns enda jobb är att **tända lamporna** (göra orden vita) vid exakt rätt millisekund. Den flyttar inga väggar (DOM-element), den slår bara på strömbrytarna (CSS-klasser).

**Varför detta löste problemet:** Tidigare försökte Arkitekten tända lamporna samtidigt som han byggde väggarna. Det blev rörigt. Nu låter vi Arkitekten bygga i fred, medan Elektrikern springer runt och tänder lampor i realtid.

**Technical Implementation Specs**

• **Bypass:** Vi använder `containerRef.current.children[i].classList.add('active')`.

• **Zero State:** Vi uppdaterar **aldrig** React state (useState) inuti rAF-loopen. Det skulle trigga re-render och döda prestandan.