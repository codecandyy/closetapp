import React from 'react';
import { cn } from '@/lib/utils';

interface StatPillProps {
  label: string;
  value: string;
  variant?: 'neutral' | 'danger' | 'success';
  className?: string;
}

export default function StatPill({ label, value, variant = 'neutral', className }: StatPillProps) {
  return (
    <div className={cn(
      'flex flex-col items-center py-3 px-4 rounded-2xl',
      'backdrop-blur-md border transition-all duration-200',
      variant === 'neutral' && 'bg-gray-50/80 border-gray-200/50 text-gray-900',
      variant === 'danger' && 'bg-red-50/80 border-red-200/50 text-red-700',
      variant === 'success' && 'bg-green-50/80 border-green-200/50 text-green-700',
      className
    )}>
      <span className="text-xs font-medium text-gray-600 mb-1">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}
