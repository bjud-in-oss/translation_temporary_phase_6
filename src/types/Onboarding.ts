export interface CropSettings { x: number; y: number; zoom: number; }
export interface MagnifierSettings { x: number; y: number; width: number; height: number; zoom: number; }
export interface TextOverlay { text: string; theme?: 'dark' | 'light'; }

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
