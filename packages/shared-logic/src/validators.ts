import { z } from 'zod';
import type { BudgetData, StylePreferences, ClosetItem } from './types';

// Budget validators
export const budgetSchema = z.object({
  monthly: z.number().min(0, '예산은 0 이상이어야 합니다'),
  spent: z.number().min(0, '지출은 0 이상이어야 합니다'),
  remaining: z.number().min(0, '잔액은 0 이상이어야 합니다')
});

export const validateBudget = (data: BudgetData): boolean => {
  try {
    budgetSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

// Style validators
export const stylePreferencesSchema = z.object({
  primary: z.enum(['y2k', 'chic', 'girly', 'classy', 'edgy', 'minimalist', 'vintage', 'streetwear']),
  secondary: z.enum(['y2k', 'chic', 'girly', 'classy', 'edgy', 'minimalist', 'vintage', 'streetwear']),
  mix: z.object({
    y2k: z.number().min(0).max(100),
    chic: z.number().min(0).max(100),
    girly: z.number().min(0).max(100),
    classy: z.number().min(0).max(100),
    edgy: z.number().min(0).max(100),
    minimalist: z.number().min(0).max(100),
    vintage: z.number().min(0).max(100),
    streetwear: z.number().min(0).max(100)
  })
});

export const validateStylePreferences = (data: StylePreferences): boolean => {
  try {
    stylePreferencesSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

// Closet item validators
export const closetItemSchema = z.object({
  id: z.string().min(1, 'ID는 필수입니다'),
  image: z.string().min(1, '이미지는 필수입니다'),
  category: z.enum(['dress', 'top', 'bottom', 'outerwear', 'shoes', 'accessories', 'underwear']),
  color: z.enum(['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'brown', 'gray', 'navy', 'beige']),
  style: z.string().min(1, '스타일은 필수입니다'),
  tags: z.array(z.string()),
  styleMatch: z.record(z.string(), z.number().min(0).max(100)),
  purchaseDate: z.string().optional(),
  price: z.number().min(0).optional(),
  brand: z.string().optional()
});

export const validateClosetItem = (data: ClosetItem): boolean => {
  try {
    closetItemSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

// Utility validators
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePrice = (price: number): boolean => {
  return price >= 0 && price <= 1000000; // 100만원까지
};

