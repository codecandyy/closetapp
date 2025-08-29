import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Expense } from '../../../../packages/shared-logic/src/types/budget';

interface ExpenseAddSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
}

const categoryOptions = [
  { key: 'clothing' as const, label: 'Clothing', icon: '👗' },
  { key: 'beauty' as const, label: 'Beauty', icon: '💄' },
  { key: 'cafe' as const, label: 'Café', icon: '☕️' },
  { key: 'etc' as const, label: 'Other', icon: '📦' },
];

export default function ExpenseAddSheet({ isOpen, onClose, onSave }: ExpenseAddSheetProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('etc');
  const [note, setNote] = useState('');

  const handleSave = () => {
    const cents = Math.round(parseFloat(amount || '0') * 100);
    if (cents <= 0) return;

    const expense: Expense = {
      id: Date.now().toString(),
      cents,
      category,
      note: note.trim() || undefined,
      dateISO: new Date().toISOString(),
    };

    onSave(expense);
    
    // Reset form
    setAmount('');
    setCategory('etc');
    setNote('');
    onClose();
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and one decimal point
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setAmount(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="w-full bg-white rounded-t-3xl p-6 pb-32 transform transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Expense</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount ($)
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full text-2xl font-bold p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            autoFocus
          />
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categoryOptions.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200',
                  category === cat.key
                    ? 'bg-pink-50 border-pink-500 text-pink-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                )}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note (optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you buy?"
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Save Button - Fixed positioning to avoid tab overlap */}
        <div className="fixed bottom-28 left-4 right-4 z-10">
          <button
            onClick={handleSave}
            disabled={!amount || parseFloat(amount) <= 0}
            className={cn(
              'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg',
              parseFloat(amount) > 0
                ? 'bg-pink-500 text-white hover:bg-pink-600 active:scale-[0.98]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
}
