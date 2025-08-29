type Item = { category?: string; color?: string; styleKey?: string };

type BuySkipInput = {
  priceCents: number;
  budgetLeftCents: number;
  closetItems: Item[];
  candidate: Item;
  userStyle: { primary?: string; secondary?: string };
};

export interface BuySkipResult {
  total: number;
  style: number;
  closet: number;
  budget: number;
  decision: 'BUY' | 'SKIP';
}

export function buyOrSkipV2(x: BuySkipInput): BuySkipResult {
  let style = 0, closet = 0, budget = 0;

  // Style Score (0~40)
  if (x.userStyle.primary && x.candidate.styleKey) {
    if (x.userStyle.primary === x.candidate.styleKey) style += 30;
    else if (x.userStyle.secondary === x.candidate.styleKey) style += 20;
    else style += 5;
  } else {
    style += 15; // Default for no style data
  }

  // Closet Score (-30~+10) — duplicate penalty
  const exactMatch = x.closetItems.some(i =>
    i.category === x.candidate.category && 
    i.color === x.candidate.color
  );
  
  const categoryMatch = x.closetItems.some(i => 
    i.category === x.candidate.category
  );
  
  if (exactMatch) {
    closet -= 20; // Strong penalty for exact duplicates
  } else if (categoryMatch) {
    closet -= 5; // Light penalty for category overlap
  } else {
    closet += 10; // Bonus for filling gaps
  }

  // Budget Score (-40~+40)
  if (x.priceCents > x.budgetLeftCents) {
    budget -= 40; // Over budget
  } else if (x.priceCents > 0.9 * x.budgetLeftCents) {
    budget -= 10; // Close to limit
  } else if (x.priceCents <= 0.5 * x.budgetLeftCents) {
    budget += 20; // Very affordable
  } else {
    budget += 10; // Reasonable price
  }

  const total = Math.max(0, Math.min(100, style + closet + budget));
  const decision = total >= 60 ? 'BUY' : 'SKIP';
  
  return { total, style, closet, budget, decision };
}