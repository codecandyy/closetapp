import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import './slider-styles.css';

interface BudgetEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentBudgetCents: number;
  onSave: (budgetCents: number) => void;
}

const presetAmounts = [20000, 40000, 60000, 80000]; // In cents ($200, $400, $600, $800)

export default function BudgetEditSheet({ 
  isOpen, 
  onClose, 
  currentBudgetCents,
  onSave 
}: BudgetEditSheetProps) {
  const [budgetAmount, setBudgetAmount] = useState('');

  useEffect(() => {
    if (isOpen) {
      setBudgetAmount((currentBudgetCents / 100).toString());
    }
  }, [isOpen, currentBudgetCents]);

  const handleSave = () => {
    const cents = Math.round(parseFloat(budgetAmount || '0') * 100);
    if (cents <= 0) return;
    
    onSave(cents);
    onClose();
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-white rounded-t-3xl p-6 pb-32 transform transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Budget</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Budget Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Monthly Budget
          </label>
          
          {/* Current Amount Display */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-pink-600">${parseFloat(budgetAmount || '0').toFixed(2)}</div>
            <div className="text-sm text-gray-500 mt-1">Slide to adjust your budget</div>
          </div>
          
          {/* Custom Slider */}
          <div className="relative mb-6">
            <input
              type="range"
              min="100"
              max="1500"
              step="10"
              value={parseFloat(budgetAmount || '400')}
              onChange={(e) => setBudgetAmount(e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
              style={{
                background: `linear-gradient(to right, #FF529B 0%, #FF529B ${((parseFloat(budgetAmount || '400') - 100) / (1500 - 100)) * 100}%, #E5E7EB ${((parseFloat(budgetAmount || '400') - 100) / (1500 - 100)) * 100}%, #E5E7EB 100%)`,
                WebkitAppearance: 'none',
              }}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                const value = parseFloat(target.value);
                const progress = ((value - 100) / (1500 - 100)) * 100;
                target.style.background = `linear-gradient(to right, #FF529B 0%, #FF529B ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`;
              }}
            />
            
            {/* Slider Labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$100</span>
              <span>$800</span>
              <span>$1,500</span>
            </div>
          </div>
        </div>

        {/* Quick Preset Buttons */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Select
          </label>
          <div className="grid grid-cols-2 gap-3">
            {presetAmounts.map((cents) => (
              <button
                key={cents}
                onClick={() => setBudgetAmount((cents / 100).toString())}
                className={cn(
                  'p-3 rounded-2xl border transition-all duration-200 font-medium',
                  parseFloat(budgetAmount) === cents / 100
                    ? 'bg-pink-50 border-pink-500 text-pink-700 scale-105'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:scale-102'
                )}
              >
${(cents / 100)}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button - Fixed positioning to avoid tab overlap */}
        <div className="fixed bottom-28 left-4 right-4 z-10">
          <button
            onClick={handleSave}
            disabled={!budgetAmount || parseFloat(budgetAmount) <= 0}
            className={cn(
              'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg',
              parseFloat(budgetAmount) > 0
                ? 'bg-pink-500 text-white hover:bg-pink-600 active:scale-[0.98]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            Save Budget
          </button>
        </div>
      </div>
    </div>
  );
}
