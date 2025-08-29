export type StyleType = 'y2k' | 'chic' | 'girly' | 'classy' | 'edgy' | 'minimalist' | 'vintage' | 'streetwear';

export interface StyleMix {
  y2k: number;
  chic: number;
  girly: number;
  classy: number;
  edgy: number;
  minimalist: number;
  vintage: number;
  streetwear: number;
}

export interface StylePreferences {
  primary: StyleType;
  secondary: StyleType;
  mix: StyleMix;
}

export interface StyleAssessment {
  currentMix: StyleMix;
  goalMix: StyleMix;
  progress: number;
}

