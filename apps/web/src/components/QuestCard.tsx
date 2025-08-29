import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';
import ButtonGame from './ButtonGame';
import { colors, typography, spacing } from '@/theme/tokens';

interface QuestCardProps {
  title: string;
  subtitle?: string;
  cta: string;
  onPress: () => void;
  progress?: number; // 0-100 또는 아이템 개수
  showItemCount?: boolean; // 아이템 개수 표시 여부
}

export default function QuestCard({ 
  title, 
  subtitle, 
  cta, 
  onPress, 
  progress,
  showItemCount = false
}: QuestCardProps) {
  return (
    <GlassCard>
      <h3 className={cn(typography.h3, 'text-gray-900 mb-1')}>{title}</h3>
      {subtitle && (
        <p className={cn(typography.caption, 'text-gray-600 mb-4')}>{subtitle}</p>
      )}
      
      {showItemCount && progress !== undefined ? (
        <div className="mb-4 text-center">
          <div className="inline-block bg-pink-500 text-white px-4 py-2 rounded-full mb-2">
            <span className="text-sm font-bold text-base">{progress}개</span>
          </div>
          <p className={cn(typography.caption, 'text-gray-600')}>
            아이템 저장됨
          </p>
        </div>
      ) : progress !== undefined ? (
        <div className="mb-4">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
            <div 
              className="h-full bg-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className={cn(typography.caption, 'text-gray-600 text-center')}>
            {progress}% 완료
          </p>
        </div>
      ) : null}
      
      <div className="mt-2">
        <ButtonGame title={cta} onPress={onPress} />
      </div>
    </GlassCard>
  );
}
