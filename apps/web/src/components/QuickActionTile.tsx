import React from 'react';
import { cn } from '@/lib/utils';

interface QuickActionTileProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  className?: string;
}

export default function QuickActionTile({ icon, label, onPress, className }: QuickActionTileProps) {
  return (
    <div
      onClick={onPress}
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-2xl',
        'backdrop-blur-md bg-white/60 border border-white/20',
        'cursor-pointer transition-all duration-200',
        'hover:bg-white/80 hover:scale-105 active:scale-95',
        'shadow-lg hover:shadow-xl',
        className
      )}
    >
      <div className="mb-2 text-pink-500">
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-700 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
