import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      closet_items: {
        Row: {
          id: string;
          user_id: string;
          image_url: string;
          category: string;
          color: string;
          style: string;
          tags: string[];
          style_match: Record<string, number>;
          purchase_date?: string;
          price?: number;
          brand?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          image_url: string;
          category: string;
          color: string;
          style: string;
          tags?: string[];
          style_match?: Record<string, number>;
          purchase_date?: string;
          price?: number;
          brand?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          image_url?: string;
          category?: string;
          color?: string;
          style?: string;
          tags?: string[];
          style_match?: Record<string, number>;
          purchase_date?: string;
          price?: number;
          brand?: string;
          created_at?: string;
        };
      };
      budget_settings: {
        Row: {
          id: string;
          user_id: string;
          monthly_budget: number;
          alerts: Record<string, boolean>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          monthly_budget: number;
          alerts?: Record<string, boolean>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          monthly_budget?: number;
          alerts?: Record<string, boolean>;
          created_at?: string;
          updated_at?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          category: string;
          description: string;
          date: string;
          item_id?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          category: string;
          description: string;
          date: string;
          item_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          category?: string;
          description?: string;
          date?: string;
          item_id?: string;
          created_at?: string;
        };
      };
    };
  };
}

