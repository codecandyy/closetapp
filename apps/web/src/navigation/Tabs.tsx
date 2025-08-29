import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { colors } from '@/theme/tokens';
import { FEATURE_BLUR_EFFECTS } from '@/constants/FeatureFlags';

// Icons (using Lucide React)
import { Home, Shirt, Scale, Wallet, Medal } from 'lucide-react';

const tabs = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Closet', icon: Shirt, path: '/closet' },
  { name: 'Buy/Skip', icon: Scale, path: '/buy-skip' },
  { name: 'Budget', icon: Wallet, path: '/budget' },
  { name: 'Rewards', icon: Medal, path: '/rewards' },
];

export default function TabsNavigator() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className={cn(
          'mx-4 mb-4 rounded-[18px] overflow-hidden',
          FEATURE_BLUR_EFFECTS 
            ? 'backdrop-blur-md bg-white/60 border border-white/20'
            : 'bg-white/80 border border-gray-200'
        )}
        style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }}
      >
        <nav className="flex justify-around items-center h-18">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            
            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 py-3 px-2',
                  'transition-all duration-200',
                  isActive 
                    ? 'text-pink-500' 
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <Icon 
                  size={24} 
                  className={cn(
                    'mb-1 transition-all duration-200',
                    isActive && 'scale-110'
                  )}
                />
                <span className="text-xs font-semibold">{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
