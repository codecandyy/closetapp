import React from 'react';
import { cn } from '@/lib/utils';

type Category = 'all' | 'clothing' | 'beauty' | 'cafe' | 'etc';

interface CategoryChipsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  className?: string;
}

const categories = [
  { key: 'all' as const, label: 'All', icon: '🌟' },
  { key: 'clothing' as const, label: 'Clothing', icon: '👗' },
  { key: 'beauty' as const, label: 'Beauty', icon: '💄' },
  { key: 'cafe' as const, label: 'Café', icon: '☕️' },
  { key: 'etc' as const, label: 'Etc', icon: '📦' },
];

export default function CategoryChips({ 
  selectedCategory, 
  onCategoryChange, 
  className 
}: CategoryChipsProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2', className)}>
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => onCategoryChange(category.key)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full',
            'whitespace-nowrap transition-all duration-200',
            'border backdrop-blur-md',
            selectedCategory === category.key 
              ? 'bg-pink-500 text-white border-pink-500 shadow-lg' 
              : 'bg-white/60 text-gray-700 border-white/20 hover:bg-white/80'
          )}
        >
          <span>{category.icon}</span>
          <span className="text-sm font-medium">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
