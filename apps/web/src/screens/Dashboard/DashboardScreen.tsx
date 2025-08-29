import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/GlassCard';
import QuestCard from '@/components/QuestCard';
import DonutChart from '@/components/DonutChart';
import ImagePickerModal from '@/components/ImagePickerModal';
import { typography } from '@/theme/tokens';
import { useCloset } from '@/context/ClosetContext';
import { Plus, Edit3, X } from 'lucide-react';
import ButtonGame from '@/components/ButtonGame';

export default function DashboardScreen() {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [expenseInput, setExpenseInput] = useState('');
  const { addItem, getItemCount } = useCloset();
  const itemCount = getItemCount();

  // Budget data
  const [monthlyBudget, setMonthlyBudget] = useState(400);
  const [spent, setSpent] = useState(245);
  const remaining = monthlyBudget - spent;
  const percentageUsed = Math.round((spent / monthlyBudget) * 100);

  const handleAddItem = () => {
    setShowImagePicker(true);
  };

  const handleImageSelected = (file: File) => {
    addItem(file);
  };

  const handleBuySkip = () => {
    console.log('Buy/Skip pressed');
    // TODO: Navigate to buy/skip screen
  };

  const handleEditBudget = () => {
    setBudgetInput(monthlyBudget.toString());
    setShowBudgetModal(true);
  };

  const handleAddExpense = () => {
    setExpenseInput('');
    setShowExpenseModal(true);
  };

  const saveBudget = () => {
    const newBudget = parseFloat(budgetInput.replace(/,/g, ''));
    if (newBudget > 0) {
      setMonthlyBudget(newBudget);
      setShowBudgetModal(false);
    } else {
      alert('Please enter a valid amount.');
    }
  };

  const addExpense = () => {
    const expense = parseFloat(expenseInput.replace(/,/g, ''));
    if (expense > 0) {
      setSpent(prev => prev + expense);
      setShowExpenseModal(false);
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FD] pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={cn(typography.h1, 'text-gray-900 mb-4')}>Your Vibe</h1>
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-pink-500 border-4 border-pink-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">70%</span>
            </div>
          </div>
        </div>

        {/* Today's Quests */}
        <div className="mb-8">
          <h2 className={cn(typography.h2, 'text-gray-900 mb-4')}>Today's Quests</h2>
          
          <QuestCard
            title="Add New Item"
            subtitle={`현재 ${itemCount}개의 아이템이 옷장에 저장되어 있어요`}
            cta="Add Item"
            onPress={handleAddItem}
            progress={itemCount}
            showItemCount={true}
          />
          
          <QuestCard
            title="Buy or Skip Decision"
            subtitle="Get AI advice on a purchase"
            cta="Get Advice"
            onPress={handleBuySkip}
            progress={0}
          />
        </div>

        {/* Budget Summary - Simplified for Home */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={cn(typography.h2, 'text-gray-900')}>Budget</h2>
            <button 
              onClick={() => window.location.href = '/budget'}
              className="text-sm text-pink-500 hover:text-pink-600 font-medium"
            >
              View All →
            </button>
          </div>
          
          <GlassCard className="!bg-white/80 !border-white/40">
            <div className="py-6 space-y-6">
              {/* Donut Chart - Centered at Top */}
              <div className="text-center">
                <DonutChart 
                  percentage={percentageUsed}
                  size={120}
                  strokeWidth={12}
                  primaryColor="#FF529B"
                  secondaryColor="#E5E7EB"
                />
              </div>
              
              {/* Stats Boxes - Well Spaced */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50/80 rounded-2xl py-4 px-3 text-center">
                  <p className="text-xs text-gray-600 mb-2">Budget</p>
                  <p className="text-base font-bold text-gray-900">${monthlyBudget}</p>
                </div>
                
                <div className="bg-red-50/80 rounded-2xl py-4 px-3 text-center relative">
                  <p className="text-xs text-gray-600 mb-2">Spent</p>
                  <p className="text-base font-bold text-red-600">${spent}</p>
                  {/* Quick Add Button next to Spent */}
                  <button
                    onClick={handleAddExpense}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 shadow-lg hover:scale-110"
                    title="지출 추가"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <div className={cn(
                  "rounded-2xl py-4 px-3 text-center",
                  remaining >= 0 ? "bg-green-50/80" : "bg-red-50/80"
                )}>
                  <p className="text-xs text-gray-600 mb-2">Left</p>
                  <p className={cn(
                    "text-base font-bold",
                    remaining >= 0 ? "text-green-600" : "text-red-600"
                  )}>
${remaining}
                  </p>
                </div>
              </div>
              
              {/* Smart Tip */}
              <div className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 rounded-2xl p-4 border border-yellow-200/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm">💡</span>
                  <p className="text-sm text-amber-700 font-medium">
                                        {percentageUsed < 30 ? "On track with your budget! 💖" :
                     percentageUsed < 70 ? "Doing great! Keep it up! ✨" :
                     percentageUsed < 90 ? "Almost at your limit! ⚠️" :
                     "Over budget! Time to review 📊"}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Rewards */}
        <div className="mb-8">
          <h2 className={cn(typography.h2, 'text-gray-900 mb-4')}>Recent Rewards</h2>
          
          <GlassCard>
            <div className="text-center">
              <h3 className={cn(typography.h3, 'text-gray-900 mb-2')}>🎀 It-girl Closet</h3>
              <p className="text-sm text-gray-600">
                You've added {itemCount} items to your closet!
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Image Picker Modal */}
      <ImagePickerModal
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onImageSelected={handleImageSelected}
      />

      {/* Budget Edit Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[22px] p-6 w-85 max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className={cn(typography.h2, 'text-gray-900')}>예산 수정</h2>
              <button 
                onClick={() => setShowBudgetModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            <input
              type="text"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              placeholder="예산 금액을 입력하세요"
              className="w-full border border-gray-300 rounded-[14px] p-4 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
            />
            
            <div className="flex gap-4">
              <ButtonGame
                title="취소"
                onPress={() => setShowBudgetModal(false)}
                variant="outline"
                size="medium"
                className="flex-1"
              />
              <ButtonGame
                title="저장"
                onPress={saveBudget}
                variant="primary"
                size="medium"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* Expense Add Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[22px] p-6 w-85 max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className={cn(typography.h2, 'text-gray-900')}>지출 추가</h2>
              <button 
                onClick={() => setShowExpenseModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            
            <input
              type="text"
              value={expenseInput}
              onChange={(e) => setExpenseInput(e.target.value)}
              placeholder="지출 금액을 입력하세요"
              className="w-full border border-gray-300 rounded-[14px] p-4 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
            />
            
            <div className="flex gap-4">
              <ButtonGame
                title="취소"
                onPress={() => setShowExpenseModal(false)}
                variant="outline"
                size="medium"
                className="flex-1"
              />
              <ButtonGame
                title="추가"
                onPress={addExpense}
                variant="primary"
                size="medium"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
