import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { colors, spacing } from '@/theme/tokens';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onFlip?: () => void;
  className?: string;
}

export default function FlipCard({ 
  frontContent, 
  backContent, 
  onFlip,
  className 
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <div className={cn('w-80 h-52 perspective-1000', className)}>
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer',
          isFlipped && 'rotate-y-180'
        )}
        onClick={handleFlip}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex items-center justify-center bg-pink-500 text-white">
          {frontContent}
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 flex items-center justify-center bg-yellow-400 text-gray-900 rotate-y-180">
          {backContent}
        </div>
      </div>
    </div>
  );
}

