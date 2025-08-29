import React from 'react';
import { cn } from '@/lib/utils';
import { colors, radius, typography, spacing, motion } from '@/theme/tokens';
import { FEATURE_HAPTIC_FEEDBACK } from '@/constants/FeatureFlags';

interface ButtonGameProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export default function ButtonGame({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className 
}: ButtonGameProps) {
  const handleClick = () => {
    if (disabled) return;
    
    // Haptic feedback simulation for web
    if (FEATURE_HAPTIC_FEEDBACK && 'vibrate' in navigator) {
      try {
        navigator.vibrate(50);
      } catch (error) {
        console.log('Vibration not supported');
      }
    }
    
    onPress();
  };

  const baseClasses = cn(
    'rounded-[14px] text-center font-semibold transition-all duration-200',
    'hover:scale-[0.97] active:scale-[0.95]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  );

  const variantClasses = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
    outline: 'bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-50',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-4 text-base',
    large: 'px-8 py-6 text-lg',
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size]
      )}
    >
      {title}
    </button>
  );
}

