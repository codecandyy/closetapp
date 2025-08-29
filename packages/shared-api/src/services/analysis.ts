import { uploadCandidate } from './candidateUpload';
import { buyOrSkipV2, BuySkipResult } from '@closetapp/shared-logic';

export type AnalyzeParams = {
  imageUri: string;
  priceCents: number;
  userStyle: { primary?: string; secondary?: string };
  closet: { category?: string; color?: string; styleKey?: string }[];
  budgetLeftCents: number;
  candidateHint?: { category?: string; color?: string; styleKey?: string };
};

export interface AnalyzeResult {
  imageUrl: string;
  candidate: { category?: string; color?: string; styleKey?: string };
  scores: BuySkipResult;
  reasons: string[];
}

export async function analyzeCandidate(p: AnalyzeParams): Promise<AnalyzeResult> {
  // Step 1: Upload image
  const imageUrl = await uploadCandidate(p.imageUri);
  
  // Step 2: Use candidate hint (MVP approach)
  const candidate = p.candidateHint ?? {};
  
  // Step 3: Run scoring algorithm
  const scores = buyOrSkipV2({
    priceCents: p.priceCents,
    budgetLeftCents: p.budgetLeftCents,
    closetItems: p.closet,
    candidate,
    userStyle: p.userStyle,
  });

  // Step 4: Generate human-readable reasons
  const reasons: string[] = [];
  
  // Budget reasons
  if (scores.budget >= 15) {
    reasons.push('💚 Great price within your budget');
  } else if (scores.budget >= -10) {
    reasons.push('⚠️ Getting close to budget limit');  
  } else {
    reasons.push('🚨 This would put you over budget');
  }

  // Style reasons  
  if (scores.style >= 25) {
    reasons.push('✨ Perfect match for your style vibe');
  } else if (scores.style >= 15) {
    reasons.push('👍 Good fit for your aesthetic');
  } else {
    reasons.push('🤔 Doesn\'t quite match your usual style');
  }

  // Closet reasons
  if (scores.closet >= 5) {
    reasons.push('🎯 Fills a gap in your wardrobe');
  } else if (scores.closet >= -10) {
    reasons.push('📦 You have similar items already');
  } else {
    reasons.push('👀 Very similar to what you own');
  }

  return { imageUrl, candidate, scores, reasons };
}