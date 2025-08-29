import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import { typography } from '@/theme/tokens';
import { useCloset } from '@/context/ClosetContext';

export default function ClosetGridScreen() {
  const { items, removeItem } = useCloset();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF9FD] pb-24">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className={cn(typography.h1, 'text-gray-900')}>My Closet</h1>
          </div>
          
          <div className="flex items-center justify-center min-h-[400px]">
            <GlassCard>
              <div className="text-center">
                <h3 className={cn(typography.h3, 'text-gray-900 mb-2')}>
                  🎀 Your closet items will appear here
                </h3>
                <p className="text-sm text-gray-600">
                  Add items from the Home tab to get started!
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9FD] pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className={cn(typography.h1, 'text-gray-900')}>My Closet</h1>
          <p className={cn(typography.caption, 'text-gray-600 mt-2')}>
            {items.length}개의 아이템
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md relative">
              <img 
                src={item.url} 
                alt={item.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <h3 className={cn(typography.caption, 'text-gray-900 font-semibold mb-1')}>
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
