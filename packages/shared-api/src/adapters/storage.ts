export interface StorageUploadResult {
  url: string;
  path: string;
  size: number;
}

export interface StorageDeleteResult {
  success: boolean;
  path: string;
}

export interface StorageAdapter {
  uploadFile(
    file: File | string,
    path: string,
    options?: {
      contentType?: string;
      cacheControl?: string;
    }
  ): Promise<StorageUploadResult>;
  
  deleteFile(path: string): Promise<StorageDeleteResult>;
  
  getPublicUrl(path: string): string;
}

