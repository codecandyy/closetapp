import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import { typography } from '@/theme/tokens';
import { FEATURE_LOTTIE_ANIMATIONS } from '@/constants/FeatureFlags';
import { Rewards } from '@/screens/Rewards';

export default function RewardsScreen() {
  return (
    <div className="min-h-screen bg-[#FFF9FD] pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className={cn(typography.h1, 'text-gray-900')}>Rewards</h1>
        </div>
        
        {/* Game UI Version */}
        <div className="mb-8">
          <GlassCard>
            <div className="text-center">
              <h3 className={cn(typography.h3, 'text-gray-900 mb-2')}>
                🏆 Badge: It-girl Closet 🎀
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You've added 10 items to your closet!
              </p>
              
              {FEATURE_LOTTIE_ANIMATIONS && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 italic">
                    🎉 Confetti animation would play here!
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Legacy Rewards Component */}
        <div className="mt-8">
          <Rewards />
        </div>
      </div>
    </div>
  );
}
