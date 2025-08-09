import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set up your .env file with:');
  console.error('VITE_SUPABASE_URL=your_supabase_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables - متوافقة مع قاعدة البيانات الحالية
export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  beef_price: number;
  chicken_price: number;
  original_beef_price?: number;
  original_chicken_price?: number;
  image?: string;
  category_id: string;
  is_popular: boolean;
  is_new: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  meat_type: 'beef' | 'chicken';
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  product?: Product;
  order_item_extras?: OrderItemExtra[];
}

export interface OrderItemExtra {
  id: string;
  order_item_id: string;
  extra_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  extra?: Extra;
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  full_name?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  timezone?: string;
  language?: string;
  theme?: string;
  subscription_type?: string;
  subscription_expires_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper functions for database operations
export const dbHelpers = {
  // جلب جميع المنتجات مع الأصناف
  async getProductsWithCategories() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .order('sort_order');
    
    if (error) throw error;
    return data;
  },

  // جلب منتج واحد مع تفاصيله
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  // جلب الأصناف النشطة
  async getActiveCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (error) throw error;
    return data;
  },

  // جلب الإضافات النشطة
  async getActiveExtras() {
    const { data, error } = await supabase
      .from('extras')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (error) throw error;
    return data;
  },

  // إنشاء طلب جديد
  async createOrder(orderData: {
    customer_name: string;
    customer_phone?: string;
    customer_address?: string;
    total_amount: number;
    notes?: string;
  }) {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // إضافة عنصر للطلب
  async addOrderItem(itemData: {
    order_id: string;
    product_id: string;
    meat_type: 'beef' | 'chicken';
    quantity: number;
    unit_price: number;
    total_price: number;
  }) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(itemData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // إضافة إضافة لعنصر الطلب
  async addOrderItemExtra(extraData: {
    order_item_id: string;
    extra_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }) {
    const { data, error } = await supabase
      .from('order_item_extras')
      .insert(extraData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};