import React from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/theme/tokens';

interface DonutChartProps {
  percentage: number; // 0-100
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
  showPercentage?: boolean;
  className?: string;
}

export default function DonutChart({
  percentage,
  size = 120,
  strokeWidth = 12,
  primaryColor = '#FF529B',
  secondaryColor = '#E5E7EB',
  showPercentage = true,
  className,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-block', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {showPercentage && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <span className={cn(typography.h2, 'font-bold text-gray-900')}>
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
}

