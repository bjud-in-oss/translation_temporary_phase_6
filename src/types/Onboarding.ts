export interface CropSettings { x: number; y: number; zoom: number; }
export interface MagnifierSettings { 
  x: number; 
  y: number; 
  width: number; 
  height: number; 
  zoom: number; 
  targetX: number; // Målpunktens X
  targetY: number; // Målpunktens Y
}
export interface TextOverlay { 
  text: string; 
  theme?: 'dark' | 'light'; 
  x?: number; // Position X i procent av blocket (default: 50 for center, or based on width)
  y?: number; // Position Y i procent av blocket (default: bottom-aligned)
  width?: number; // Bredd i procent av blocket (default: 80)
  height?: number; // Höjd i procent av blocket (automatisk radbrytning, men kan begränsas)
  fontSize?: number; // Storlek i procent relativt containern (default: t.ex. 4cqw, men vi använder % för nu)
}

export interface StoryBlock {
  id: string;
  type: 'image' | 'text';
  imageId?: string; // URL
  crop?: CropSettings;
  magnifier?: MagnifierSettings;
  textOverlay?: TextOverlay;
  textContent?: string; // För rena textblock
}

export interface StorySlide {
  id: string;
  layout: '1-col' | '2-col' | '3-col';
  blocks: StoryBlock[];
}

export interface OnboardingGuide {
  id: string;
  slides: StorySlide[];
}
