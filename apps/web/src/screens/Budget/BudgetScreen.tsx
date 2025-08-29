import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { typography } from '@/theme/tokens';
import { Plus, Edit3, Scale, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import DonutChart from '@/components/DonutChart';
import GlassCard from '@/components/GlassCard';
import StatPill from '@/components/StatPill';
import QuickActionTile from '@/components/QuickActionTile';
import TransactionCard from '@/components/TransactionCard';
import CategoryChips from '@/components/CategoryChips';
import ExpenseAddSheet from '@/components/BottomSheets/ExpenseAddSheet';
import BudgetEditSheet from '@/components/BottomSheets/BudgetEditSheet';
import useBudget from '@/hooks/useBudget';
import { Expense } from '../../../../packages/shared-logic/src/types/budget';

type Category = 'all' | 'clothing' | 'beauty' | 'cafe' | 'etc';

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function BudgetScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    budgetCents,
    expenses,
    spentCents,
    leftCents,
    editBudget,
    addExpense,
    removeExpense
  } = useBudget();

  const [showExpenseSheet, setShowExpenseSheet] = useState(false);
  const [showBudgetSheet, setShowBudgetSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const percentage = budgetCents > 0 ? Math.round((spentCents / budgetCents) * 100) : 0;
  
  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const handleAddExpense = (expense: Expense) => {
    addExpense(expense);
    
    // Success animation effect (color pulse instead of haptic)
    setTimeout(() => {
      toast({
        title: "Expense Added! 💸",
        description: `${formatCurrency(expense.cents)} added to your expenses`,
      });
    }, 100);
  };

  const handleEditBudget = (newBudgetCents: number) => {
    editBudget(newBudgetCents);
    
    toast({
      title: "Budget Updated! 💖",
      description: `New budget: ${formatCurrency(newBudgetCents)}`,
    });
  };

  const handleBuySkip = () => {
    navigate('/buy-skip');
  };

  const handleImportReceipt = () => {
    toast({
      title: "Coming Soon! 📄",
      description: "Receipt import feature will be available soon",
    });
  };

  const handleExpenseLongPress = (expense: Expense) => {
    // Simple confirmation for demo - in real app would show proper dialog
    if (window.confirm(`Delete expense: ${formatCurrency(expense.cents)}?`)) {
      removeExpense(expense.id);
      toast({
        title: "Expense Deleted",
        description: "Transaction removed from your budget",
      });
    }
  };

  const getSmartTip = () => {
    const percentage = budgetCents > 0 ? (spentCents / budgetCents) * 100 : 0;
    
    if (percentage < 30) return "On track 💖";
    if (percentage < 70) return "Doing great! Keep it up ✨";
    if (percentage < 90) return "Move $15 from Café to Clothing?";
    if (percentage < 100) return "Almost at your limit! 🚨";
    return "Over budget! Time to review 📊";
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        
        {/* Header with Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className={cn(typography.h1, 'text-gray-900 mb-2')}>Budget</h1>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setCurrentMonth(prev => (prev - 1 + 12) % 12)}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                ‹
              </button>
              <span className="text-lg font-semibold text-gray-700 min-w-[60px]">
                {months[currentMonth]}
              </span>
              <button 
                onClick={() => setCurrentMonth(prev => (prev + 1) % 12)}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Glass Progress Card */}
        <div className="mb-6">
          <GlassCard className="!bg-white/80 !border-white/40">
            <div className="text-center py-6">
              <DonutChart 
                percentage={percentage}
                size={160}
                strokeWidth={16}
                primaryColor="#FF5DA2"
                secondaryColor="#E5E7EB"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="relative">
                <StatPill
                  label="Budget"
                  value={formatCurrency(budgetCents)}
                  variant="neutral"
                />
                {/* Quick Edit Budget Button directly on Budget pill */}
                <button
                  onClick={() => setShowBudgetSheet(true)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
                  title="빠른 예산 수정"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <div className="relative">
                <StatPill
                  label="Spent"
                  value={formatCurrency(spentCents)}
                  variant="danger"
                />
                {/* Quick Add Button directly on Spent pill */}
                <button
                  onClick={() => setShowExpenseSheet(true)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
                  title="빠른 지출 추가"
                >
                  <Plus size={16} />
                </button>
              </div>
              <StatPill
                label="Left"
                value={formatCurrency(leftCents)}
                variant={leftCents >= 0 ? "success" : "danger"}
              />
            </div>
          </GlassCard>
        </div>

        {/* Smart Tips */}
        <div className="mb-6">
          <GlassCard className="!bg-gradient-to-r from-yellow-50/80 to-orange-50/80 !border-yellow-200/50">
            <div className="text-center py-4">
              <div className="text-sm font-medium text-amber-700">💡 Smart Tip</div>
              <p className="text-xs text-amber-600 mt-1">{getSmartTip()}</p>
            </div>
          </GlassCard>
        </div>

        {/* Simplified Quick Actions - Only Essential */}
        <div className="mb-6">
          <div className="flex gap-3">
            <QuickActionTile
              icon={<Edit3 size={20} />}
              label="Edit Budget"
              onPress={() => setShowBudgetSheet(true)}
              className="flex-1"
            />
            <QuickActionTile
              icon={<Scale size={20} />}
              label="Buy or Skip"
              onPress={handleBuySkip}
              className="flex-1"
            />
          </div>
          
          {/* Secondary Actions - Smaller */}
          <div className="mt-3 flex justify-center">
            <button
              onClick={handleImportReceipt}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/20 text-sm text-gray-600 hover:bg-white/80 transition-colors"
            >
              <Receipt size={16} />
              Import Receipt
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <CategoryChips
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredExpenses.length === 0 ? (
            <GlassCard className="!bg-white/60">
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🛍️</div>
                <p>No expenses yet</p>
                <p className="text-sm">Tap "Add expense" to get started!</p>
              </div>
            </GlassCard>
          ) : (
            filteredExpenses
              .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
              .map((expense) => (
                <TransactionCard
                  key={expense.id}
                  expense={expense}
                  onLongPress={() => handleExpenseLongPress(expense)}
                />
              ))
          )}
        </div>
      </div>

      {/* Simplified FAB - Only for quick access when scrolling */}
      <button
        onClick={() => setShowExpenseSheet(true)}
        className={cn(
          'fixed bottom-28 right-6 w-12 h-12 rounded-full',
          'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl',
          'flex items-center justify-center',
          'transition-all duration-200',
          'hover:shadow-2xl hover:scale-105 active:scale-95',
          'z-40 opacity-80 hover:opacity-100'
        )}
        title="지출 추가"
      >
        <Plus size={20} />
      </button>

      {/* Bottom Sheets */}
      <ExpenseAddSheet
        isOpen={showExpenseSheet}
        onClose={() => setShowExpenseSheet(false)}
        onSave={handleAddExpense}
      />
      
      <BudgetEditSheet
        isOpen={showBudgetSheet}
        onClose={() => setShowBudgetSheet(false)}
        currentBudgetCents={budgetCents}
        onSave={handleEditBudget}
      />
    </div>
  );
}