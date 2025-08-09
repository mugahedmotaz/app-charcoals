import { useState, useEffect } from 'react';
import { Category, BurgerItem, BurgerExtra, Order } from '../types/database';
import { localCategories, localProducts, localExtras } from '../data/local';

// Use local data by default unless explicitly disabled with VITE_USE_LOCAL_DATA="false"
const useLocal = (import.meta as any).env?.VITE_USE_LOCAL_DATA !== 'false';

// Hook للحصول على الأصناف
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      if (useLocal) {
        // Local mock
        setCategories(localCategories.filter(c => c.is_active !== false));
        return;
      }
      // Supabase disabled: fallback to empty list to avoid runtime errors when not using local
      setCategories([]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب الأصناف');
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
};

// Hook للحصول على المنتجات
export const useProducts = (categoryId?: string) => {
  const [products, setProducts] = useState<BurgerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      if (useLocal) {
        // Local mock with filtering
        let data = localProducts.filter(p => p.is_active !== false);
        if (categoryId && categoryId !== 'all') {
          data = data.filter(p => p.category_id === categoryId);
        }
        setProducts(data);
        return;
      }
      // Supabase disabled: fallback to empty list to avoid runtime errors when not using local
      setProducts([]);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب المنتجات');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

// Hook للحصول على الإضافات
export const useExtras = () => {
  const [extras, setExtras] = useState<BurgerExtra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      setLoading(true);
      setError(null);
      if (useLocal) {
        setExtras(localExtras.filter(e => e.is_active !== false));
        return;
      }
      // Supabase disabled: fallback to empty list to avoid runtime errors when not using local
      setExtras([]);
    } catch (err) {
      console.error('Error fetching extras:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب الإضافات');
    } finally {
      setLoading(false);
    }
  };

  return { extras, loading, error, refetch: fetchExtras };
};

// Hook للحصول على الطلبات (للمشرفين)
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      // Supabase disabled: return empty orders list
      setOrders([]);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في جلب الطلبات');
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: fetchOrders };
};

// Hook لإنشاء طلب جديد
export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: {
    customer_name: string;
    customer_phone?: string;
    customer_address?: string;
    items: {
      product_id: string;
      meat_type: 'beef' | 'chicken';
      quantity: number;
      unit_price: number;
      extras: {
        extra_id: string;
        quantity: number;
        unit_price: number;
      }[];
    }[];
  }) => {
    try {
      setLoading(true);
      setError(null);

      // حساب المبلغ الإجمالي
      const totalAmount = orderData.items.reduce((total, item) => {
        const itemTotal = item.unit_price * item.quantity;
        const extrasTotal = item.extras.reduce((extrasSum, extra) => 
          extrasSum + (extra.unit_price * extra.quantity), 0
        );
        return total + itemTotal + extrasTotal;
      }, 0);

      // Supabase disabled: simulate order creation locally
      const mockOrder = {
        id: Date.now().toString(),
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        total_amount: totalAmount,
        status: 'pending',
        created_at: new Date().toISOString(),
      } as unknown as Order;
      // Simulate async delay
      await new Promise((res) => setTimeout(res, 400));
      return mockOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في إنشاء الطلب';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
};