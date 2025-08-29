export interface ItemAnalysis {
  price: number;
  category: string;
  color: string;
  style: string;
  budget: number;
  spent: number;
  closetItems: Array<{
    category: string;
    color: string;
    style: string;
  }>;
}

export interface AnalysisResult {
  recommendation: 'buy' | 'skip';
  confidence: number;
  reasons: string[];
  factors: {
    budgetStatus: 'under' | 'close' | 'over';
    styleMatch: number;
    duplicates: string[];
    valueScore: number;
  };
}

export const analyzeItem = async (itemData: ItemAnalysis): Promise<AnalysisResult> => {
  const { price, category, color, style, budget, spent, closetItems } = itemData;
  
  // Calculate remaining budget
  const remainingBudget = budget - spent;
  const budgetPercentage = (price / remainingBudget) * 100;
  
  // Budget analysis
  let budgetStatus: 'under' | 'close' | 'over';
  if (budgetPercentage <= 50) {
    budgetStatus = 'under';
  } else if (budgetPercentage <= 80) {
    budgetStatus = 'close';
  } else {
    budgetStatus = 'over';
  }
  
  // Style match calculation (simplified)
  const styleMatch = Math.floor(Math.random() * 40) + 60; // 60-100%
  
  // Duplicate detection
  const duplicates = closetItems
    .filter(item => 
      item.category === category || 
      item.color === color || 
      item.style === style
    )
    .map(item => `${item.category} ${item.color} ${item.style}`);
  
  // Value score calculation
  const valueScore = Math.floor(Math.random() * 30) + 70; // 70-100%
  
  // Decision logic
  let recommendation: 'buy' | 'skip' = 'skip';
  const reasons: string[] = [];
  let confidence = 0;
  
  // Budget factor
  if (budgetStatus === 'over') {
    reasons.push('Over monthly budget');
    confidence -= 30;
  } else if (budgetStatus === 'close') {
    reasons.push('Close to budget limit');
    confidence -= 10;
  } else {
    reasons.push('Within budget');
    confidence += 20;
  }
  
  // Style match factor
  if (styleMatch >= 85) {
    reasons.push('Perfect style match');
    confidence += 25;
  } else if (styleMatch >= 70) {
    reasons.push('Good style match');
    confidence += 15;
  } else {
    reasons.push('Low style match');
    confidence -= 20;
  }
  
  // Duplicate factor
  if (duplicates.length > 0) {
    reasons.push(`Similar items in closet: ${duplicates.slice(0, 2).join(', ')}`);
    confidence -= 15;
  } else {
    reasons.push('Unique addition to closet');
    confidence += 10;
  }
  
  // Value factor
  if (valueScore >= 85) {
    reasons.push('Excellent value for money');
    confidence += 20;
  } else if (valueScore >= 70) {
    reasons.push('Good value');
    confidence += 10;
  } else {
    reasons.push('Questionable value');
    confidence -= 10;
  }
  
  // Final decision
  if (confidence >= 30) {
    recommendation = 'buy';
  }
  
  return {
    recommendation,
    confidence: Math.max(0, Math.min(100, confidence + 50)), // Normalize to 0-100
    reasons,
    factors: {
      budgetStatus,
      styleMatch,
      duplicates,
      valueScore
    }
  };
};

// Mock function for testing
export const mockAnalyzeItem = (price: number, budget: number): AnalysisResult => {
  const remainingBudget = budget;
  const budgetPercentage = (price / remainingBudget) * 100;
  
  const budgetStatus = budgetPercentage <= 50 ? 'under' : budgetPercentage <= 80 ? 'close' : 'over';
  const styleMatch = Math.floor(Math.random() * 40) + 60;
  const duplicates = Math.random() > 0.7 ? ['Black mini dress', 'Similar style'] : [];
  const valueScore = Math.floor(Math.random() * 30) + 70;
  
  let recommendation: 'buy' | 'skip' = 'skip';
  const reasons: string[] = [];
  
  if (budgetStatus === 'over') {
    reasons.push('Over monthly budget');
  } else if (budgetStatus === 'close') {
    reasons.push('Close to budget limit');
  }
  
  if (styleMatch < 70) {
    reasons.push('Low style match');
  } else if (styleMatch > 85) {
    reasons.push('Perfect style match');
  }
  
  if (duplicates.length > 0) {
    reasons.push('Similar items in closet');
  }
  
  if (price <= remainingBudget && Math.random() > 0.3) {
    recommendation = 'buy';
  }
  
  return {
    recommendation,
    confidence: Math.floor(Math.random() * 40) + 60,
    reasons,
    factors: {
      budgetStatus,
      styleMatch,
      duplicates,
      valueScore
    }
  };
};
