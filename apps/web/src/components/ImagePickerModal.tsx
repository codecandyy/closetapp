import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Image, X } from 'lucide-react';
import { typography } from '@/theme/tokens';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (file: File) => void;
}

export default function ImagePickerModal({ 
  visible, 
  onClose, 
  onImageSelected 
}: ImagePickerModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    // 웹에서는 카메라 접근이 제한적이므로 파일 선택으로 대체
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
      onClose();
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[22px] p-6 w-85 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className={cn(typography.h2, 'text-gray-900')}>사진 추가</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleCameraClick}
            className="w-full flex items-center p-4 bg-gray-50 rounded-[14px] border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500 bg-opacity-20 flex items-center justify-center mr-4">
              <Camera size={32} className="text-pink-500" />
            </div>
            <div className="text-left">
              <h3 className={cn(typography.h3, 'text-gray-900 mb-1')}>카메라로 촬영</h3>
              <p className="text-sm text-gray-600">새로운 사진을 촬영하세요</p>
            </div>
          </button>

          <button 
            onClick={handleGalleryClick}
            className="w-full flex items-center p-4 bg-gray-50 rounded-[14px] border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500 bg-opacity-20 flex items-center justify-center mr-4">
              <Image size={32} className="text-pink-500" />
            </div>
            <div className="text-left">
              <h3 className={cn(typography.h3, 'text-gray-900 mb-1')}>갤러리에서 선택</h3>
              <p className="text-sm text-gray-600">기존 사진을 선택하세요</p>
            </div>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
