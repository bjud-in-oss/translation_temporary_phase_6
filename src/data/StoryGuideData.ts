import { OnboardingGuide } from '../types/Onboarding';

export const SYSTEM_GUIDE: OnboardingGuide = {
  id: 'main-guide',
  slides: [
    {
      id: 'slide-1',
      layout: '1-col',
      blocks: [
        {
          id: 'intro-1',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/b84dfbcf-47a5-4d97-a1bd-5876aae6d4d5',
          textOverlay: { text: 'Hej och varmt välkommen! Vad fantastiskt att du hjälper din församling att komma igång med AI-tolkning. Vår app är helt gratis att använda för er tack vare något som kallas BYOK (Bring Your Own Key). Det betyder helt enkelt att du hämtar dina egna "digitala lösenord" från de tjänster vi använder.', x: 10, y: 70, width: 80, fontSize: 110 }
        }
      ]
    },
    {
      id: 'slide-2',
      layout: '1-col',
      blocks: [
        {
          id: 'intro-2',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/e5cf2ea5-488f-4d71-9953-7c83fe8ea8c6',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 75, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'Så läser du bilderna...\nInternet kan vara rörigt. I den här guiden har vi suddat ut allt du inte behöver bry dig om.\nFölj den röda linsen: Leta bara efter den röda ringen.\nLäs i förstoringsglaset: Vi har zoomat in det viktiga åt dig.', x: 10, y: 10, width: 80 }
        }
      ]
    },
    {
      id: 'slide-3',
      layout: '2-col',
      blocks: [
        {
          id: 'gemini-1',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/3afdd79f-9520-4819-ac91-d5bb86ff1be1',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 30, y: 70, width: 30, height: 30, zoom: 3, targetX: 12, targetY: 85 },
          textOverlay: { text: '1. Öppna Studio\nÖppna Google AI Studio. Klicka på "Get API key" nere till vänster.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'gemini-2',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/1c9fd3bd-1e00-4276-b2f4-a47d173dc55d',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 65, y: 30, width: 30, height: 30, zoom: 3, targetX: 85, targetY: 15 },
          textOverlay: { text: '2. Skapa nyckel\nKlicka på den grå knappen "Create API key" uppe till höger.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-4',
      layout: '3-col',
      blocks: [
        {
          id: 'gemini-3',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/47f3fd65-71d2-4c96-9dc8-76a64c99020c',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 75, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: '3. Nytt projekt\nVälj "Create project" i rutan som dyker upp.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'gemini-4',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/084aea68-36ce-4847-addb-e2d540b9a020',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 70, width: 30, height: 30, zoom: 4, targetX: 75, targetY: 45 },
          textOverlay: { text: '4. Kopiera nyckel\nKlicka på den lilla ikonen som ser ut som två papper för att kopiera din färdiga nyckel.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'gemini-5',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/a142a8e8-cb96-41a7-9234-e34d51ed8570',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 20, width: 30, height: 30, zoom: 2, targetX: 50, targetY: 50 },
          textOverlay: { text: '5. Klistra in\nKlistra in nyckeln i appen.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-5',
      layout: '1-col',
      blocks: [
        {
          id: 'sfu-intro',
          type: 'text',
          textContent: 'Välj din SFU-leverantör nedan.'
        }
      ]
    },
    {
      id: 'slide-6',
      layout: '3-col',
      blocks: [
        {
          id: 'livekit-1',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/471015',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 60, y: 50, width: 30, height: 30, zoom: 3, targetX: 30, targetY: 50 },
          textOverlay: { text: 'LiveKit Logga in\nLogga in med Google.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'livekit-2',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/a44a59',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 75, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'LiveKit Fortsätt\nKlicka på "Continue".', x: 10, y: 70, width: 80 }
        },
        {
          id: 'livekit-3',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/b6df8b',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 60, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 90 },
          textOverlay: { text: 'LiveKit Hoppa över\nKlicka på "Skip for now" längst ner.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-7',
      layout: '3-col',
      blocks: [
        {
          id: 'livekit-4',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/c9116e',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 35, y: 50, width: 30, height: 30, zoom: 3, targetX: 10, targetY: 60 },
          textOverlay: { text: 'LiveKit Inställningar\nGå till Settings och API keys.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'livekit-5',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/a06d51',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 20, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'LiveKit Nyckelrad\nKlicka på raden där din nyckel står.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'livekit-6',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/cb6a78',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 40, y: 50, width: 30, height: 30, zoom: 3, targetX: 70, targetY: 50 },
          textOverlay: { text: 'LiveKit Kopiera\nKopiera både WebSocket URL och API key.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-8',
      layout: '3-col',
      blocks: [
        {
          id: 'daily-1',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/10e2d3',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 50, width: 30, height: 30, zoom: 4, targetX: 50, targetY: 85 },
          textOverlay: { text: 'Daily Registrering\nKlicka på "Sign up" längst ner.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'daily-2',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/e5acb9',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 45, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 75 },
          textOverlay: { text: 'Daily Skapa\nFyll i uppgifter och klicka Sign up.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'daily-3',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/fa744b',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 75, y: 50, width: 30, height: 30, zoom: 3, targetX: 45, targetY: 40 },
          textOverlay: { text: 'Daily Domän\nHitta på ett namn.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-9',
      layout: '3-col',
      blocks: [
        {
          id: 'daily-4',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/af933c',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 70, y: 50, width: 30, height: 30, zoom: 3, targetX: 40, targetY: 50 },
          textOverlay: { text: 'Daily Dashboard\nKlicka på Open dashboard.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'daily-5',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/21976a',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 35, y: 60, width: 30, height: 30, zoom: 3, targetX: 10, targetY: 60 },
          textOverlay: { text: 'Daily Developers\nKlicka på Developers.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'daily-6',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/e59b32',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 60, y: 60, width: 30, height: 30, zoom: 3, targetX: 90, targetY: 45 },
          textOverlay: { text: 'Daily Kopiera\nKopiera nyckeln.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-10',
      layout: '3-col',
      blocks: [
        {
          id: 'cf-1',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/b6a719',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 60, y: 50, width: 30, height: 30, zoom: 3, targetX: 30, targetY: 70 },
          textOverlay: { text: 'Cloudflare Start\nKlicka på Start for free.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'cf-2',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/dc6af2',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 75, y: 40, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 40 },
          textOverlay: { text: 'Cloudflare Konto\nFyll i Email/Password.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'cf-3',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/ba178e',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 40, y: 70, width: 30, height: 30, zoom: 3, targetX: 15, targetY: 75 },
          textOverlay: { text: 'Cloudflare Meny\nVälj Serverless SFU i menyn.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-11',
      layout: '2-col',
      blocks: [
        {
          id: 'cf-4',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/dc7f8c',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 30, y: 60, width: 30, height: 30, zoom: 3, targetX: 60, targetY: 60 },
          textOverlay: { text: 'Cloudflare Skapa 1\nKlicka på Create.', x: 10, y: 70, width: 80 }
        },
        {
          id: 'cf-5',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/adb32f',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 25, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'Cloudflare Skapa 2\nDöp till kyrka och Create.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-12',
      layout: '1-col',
      blocks: [
        {
          id: 'group-setup',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/6dc0f8',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'Group Setup\nSkapa en grupp för din församling.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-13',
      layout: '1-col',
      blocks: [
        {
          id: 'room-setup',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/ad039b',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'Room Setup\nSkapa ett rum för tolkningen.', x: 10, y: 70, width: 80 }
        }
      ]
    },
    {
      id: 'slide-14',
      layout: '1-col',
      blocks: [
        {
          id: 'final-check',
          type: 'image',
          imageId: 'https://github.com/user-attachments/assets/31da4c',
          crop: { x: 50, y: 50, zoom: 1 },
          magnifier: { x: 50, y: 50, width: 30, height: 30, zoom: 3, targetX: 50, targetY: 50 },
          textOverlay: { text: 'Redo att tolka!\nBra jobbat! Nycklarna är hämtade.', x: 10, y: 70, width: 80 }
        }
      ]
    }
  ]
};
