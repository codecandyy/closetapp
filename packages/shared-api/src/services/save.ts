import { supabase } from '../supabaseClient';
import { AnalyzeResult } from './analysis';

export interface BuySkipTrial {
  id?: string;
  user_id?: string;
  image_url: string;
  price_cents: number;
  decision: 'BUY' | 'SKIP';
  confidence_score: number;
  style_score: number;
  closet_score: number;
  budget_score: number;
  reasons: string[];
  hints?: {
    style?: string;
    category?: string;
    color?: string;
  };
  created_at?: string;
}

export async function saveTrial(data: {
  result: AnalyzeResult;
  priceCents: number;
  hints?: { style?: string; category?: string; color?: string };
}): Promise<boolean> {
  try {
    const trial: BuySkipTrial = {
      image_url: data.result.imageUrl,
      price_cents: data.priceCents,
      decision: data.result.scores.decision,
      confidence_score: data.result.scores.total,
      style_score: data.result.scores.style,
      closet_score: data.result.scores.closet,
      budget_score: data.result.scores.budget,
      reasons: data.result.reasons,
      hints: data.hints,
    };

    const { error } = await supabase
      .from('buy_skip_trials')
      .insert(trial);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.warn('Failed to save to Supabase, using local fallback:', error);
    // TODO: Implement local storage fallback
    return false;
  }
}