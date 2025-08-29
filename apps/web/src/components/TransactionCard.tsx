import React from 'react';
import { cn } from '@/lib/utils';
import { Expense } from '../../../packages/shared-logic/src/types/budget';

interface TransactionCardProps {
  expense: Expense;
  onLongPress?: () => void;
  onPress?: () => void;
  className?: string;
}

const categoryIcons = {
  clothing: '👗',
  beauty: '💄', 
  cafe: '☕️',
  etc: '📦'
};

const categoryLabels = {
  clothing: 'Clothing',
  beauty: 'Beauty',
  cafe: 'Café',
  etc: 'Other'
};

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function TransactionCard({ 
  expense, 
  onLongPress, 
  onPress,
  className 
}: TransactionCardProps) {
  const handleClick = () => {
    onPress?.();
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      className={cn(
        'flex items-center justify-between p-4 rounded-2xl',
        'backdrop-blur-md bg-white/60 border border-white/20',
        'cursor-pointer transition-all duration-200',
        'hover:bg-white/80',
        'shadow-md',
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
          <span className="text-lg">{categoryIcons[expense.category]}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">
            {categoryLabels[expense.category]}
          </h4>
          {expense.note && (
            <p className="text-sm text-gray-600">{expense.note}</p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(expense.dateISO).toLocaleDateString('ko-KR')}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <span className="font-bold text-red-600">
          -{formatCurrency(expense.cents)}
        </span>
      </div>
    </div>
  );
}
