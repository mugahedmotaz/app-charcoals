import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminContextType, BurgerItem, Category, BurgerExtra } from '../types/database';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<BurgerItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [extras, setExtras] = useState<BurgerExtra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // جلب المنتجات
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*)
        `)
        .order('sort_order');

      if (productsError) throw productsError;

      // جلب الأصناف
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');

      if (categoriesError) throw categoriesError;

      // جلب الإضافات
      const { data: extrasData, error: extrasError } = await supabase
        .from('extras')
        .select('*')
        .order('sort_order');

      if (extrasError) throw extrasError;

      setProducts(productsData || []);
      setCategories(categoriesData || []);
      setExtras(extrasData || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProduct = async (productData: Omit<BurgerItem, 'id'>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;
      await fetchData();
      return data;
    } catch (err) {
      console.error('Error adding product:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في إضافة المنتج');
    }
  };

  const updateProduct = async (id: string, productData: Partial<BurgerItem>) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في تحديث المنتج');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في حذف المنتج');
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      await fetchData();
      return data;
    } catch (err) {
      console.error('Error adding category:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في إضافة الصنف');
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error('Error updating category:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في تحديث الصنف');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('categories')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error('Error deleting category:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في حذف الصنف');
    }
  };

  return (
    <AdminContext.Provider value={{
      products,
      categories,
      extras,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      refetch: fetchData
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};