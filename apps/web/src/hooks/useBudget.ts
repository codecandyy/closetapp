import { useState, useCallback } from 'react';
import { Expense } from '../../../packages/shared-logic/src/types/budget';

interface BudgetState {
  budgetCents: number;
  expenses: Expense[];
}

export function useBudget(initialBudget: number = 40000) { // $400 in cents
  const [state, setState] = useState<BudgetState>({
    budgetCents: initialBudget,
    expenses: []
  });

  const spentCents = state.expenses.reduce((sum, expense) => sum + expense.cents, 0);
  const leftCents = state.budgetCents - spentCents;

  const editBudget = useCallback((cents: number) => {
    setState(prev => ({
      ...prev,
      budgetCents: cents
    }));
  }, []);

  const addExpense = useCallback((expense: Expense) => {
    setState(prev => ({
      ...prev,
      expenses: [...prev.expenses, expense]
    }));
  }, []);

  const removeExpense = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      expenses: prev.expenses.filter(e => e.id !== id)
    }));
  }, []);

  return {
    budgetCents: state.budgetCents,
    expenses: state.expenses,
    spentCents,
    leftCents,
    editBudget,
    addExpense,
    removeExpense
  };
}

export default useBudget;
