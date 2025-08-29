import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import FlipCard from '@/components/FlipCard';
import { typography } from '@/theme/tokens';
import { FEATURE_HAPTIC_FEEDBACK } from '@/constants/FeatureFlags';
import { BuyOrSkip } from '@/components/BuyOrSkip';

export default function BuySkipScreen() {
  const [showResult, setShowResult] = useState(false);

  const handleFlip = () => {
    // Haptic feedback simulation for web
    if (FEATURE_HAPTIC_FEEDBACK && 'vibrate' in navigator) {
      try {
        navigator.vibrate(100);
      } catch (error) {
        console.log('Vibration not supported');
      }
    }
  };

  const frontContent = (
    <div className="text-center">
      <h3 className={cn(typography.h3, 'text-white mb-2')}>🤖 AI Style Advisor</h3>
      <p className="text-sm text-white/90">
        Click to get personalized advice on your fashion purchases!
      </p>
    </div>
  );

  const backContent = (
    <div className="text-center">
      <h3 className={cn(typography.h3, 'text-gray-900 mb-2')}>✅ BUY!</h3>
      <p className="text-sm text-gray-700">
        This item matches your style perfectly!
      </p>
      <p className="text-sm font-bold text-gray-900 mt-2">
        Confidence: 85%
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9FD] pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className={cn(typography.h1, 'text-gray-900')}>Buy or Skip</h1>
        </div>
        
        {/* Game UI Version */}
        <div className="flex items-center justify-center min-h-[400px] mb-8">
          {showResult ? (
            <FlipCard
              frontContent={frontContent}
              backContent={backContent}
              onFlip={handleFlip}
            />
          ) : (
            <GlassCard>
              <div className="text-center">
                <h3 className={cn(typography.h3, 'text-gray-900 mb-2')}>
                  🤖 AI Style Advisor
                </h3>
                <p className="text-sm text-gray-600">
                  Get personalized advice on your fashion purchases!
                </p>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Legacy BuyOrSkip Component */}
        <div className="mt-8">
          <BuyOrSkip />
        </div>
      </div>
    </div>
  );
}
