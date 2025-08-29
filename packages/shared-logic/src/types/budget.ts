export interface BudgetData {
  monthly: number;
  spent: number;
  remaining: number;
}

export interface BudgetSettings {
  monthlyBudget: number;
  alerts: {
    budgetAlerts: boolean;
    styleTips: boolean;
    newFeatures: boolean;
    weeklyReport: boolean;
  };
}

export interface Expense {
  id: string;
  cents: number;
  category: 'clothing' | 'beauty' | 'cafe' | 'etc';
  note?: string;
  dateISO: string;
}

export interface LegacyExpense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  itemId?: string;
}

