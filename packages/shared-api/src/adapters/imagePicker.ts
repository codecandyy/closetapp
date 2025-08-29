export interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
}

export interface ImagePickerOptions {
  mediaType?: 'photo' | 'video' | 'all';
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface ImagePickerAdapter {
  pickImage(options?: ImagePickerOptions): Promise<ImagePickerResult | null>;
  pickMultipleImages(options?: ImagePickerOptions): Promise<ImagePickerResult[]>;
  takePhoto(options?: ImagePickerOptions): Promise<ImagePickerResult | null>;
}

