import React from 'react';
import { cn } from '@/lib/utils';
import { radius, shadow, colors } from '@/theme/tokens';
import { FEATURE_BLUR_EFFECTS } from '@/constants/FeatureFlags';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function GlassCard({ 
  children, 
  className,
  intensity = 20 
}: GlassCardProps) {
  const glassStyles = FEATURE_BLUR_EFFECTS 
    ? {
        backdropFilter: `blur(${intensity}px)`,
        backgroundColor: colors.glass,
      }
    : {
        backgroundColor: colors.glass,
        border: `1px solid ${colors.border}`,
      };

  return (
    <div 
      className={cn(
        'rounded-[22px] overflow-hidden mb-3',
        className
      )}
      style={{
        ...glassStyles,
        boxShadow: shadow.soft,
      }}
    >
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
