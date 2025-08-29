export type ClothingCategory = 'dress' | 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessories' | 'underwear';

export type ClothingColor = 'black' | 'white' | 'red' | 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'brown' | 'gray' | 'navy' | 'beige';

export interface ClosetItem {
  id: string;
  image: string;
  category: ClothingCategory;
  color: ClothingColor;
  style: string;
  tags: string[];
  styleMatch: { [key: string]: number };
  purchaseDate?: string;
  price?: number;
  brand?: string;
}

export interface ClosetFilters {
  category?: ClothingCategory;
  color?: ClothingColor;
  style?: string;
  tags?: string[];
}

