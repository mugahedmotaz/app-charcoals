import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AdminContextType, BurgerItem, Category, BurgerExtra } from '../types/database';
import { useState, useEffect } from 'react';
import { localCategories, localProducts, localExtras } from '../data/local';

const useLocal = (import.meta as any).env?.VITE_USE_LOCAL_DATA !== 'false';

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
      if (useLocal) {
        // Local mode: populate from local data
        setProducts(localProducts);
        setCategories(localCategories);
        setExtras(localExtras);
        return;
      }
      // If not local mode, this context expects a Supabase backend. For now, keep empty.
      setProducts([]);
      setCategories([]);
      setExtras([]);
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
      if (useLocal) {
        const newItem: BurgerItem = { id: Date.now().toString(), ...productData } as BurgerItem;
        setProducts(prev => [...prev, newItem]);
        return;
      }
      // Non-local: no-op placeholder
      return;
    } catch (err) {
      console.error('Error adding product:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في إضافة المنتج');
    }
  };

  const updateProduct = async (id: string, productData: Partial<BurgerItem>) => {
    try {
      setError(null);
      if (useLocal) {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } as BurgerItem : p));
        return;
      }
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في تحديث المنتج');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setError(null);
      if (useLocal) {
        setProducts(prev => prev.filter(p => p.id !== id));
        return;
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في حذف المنتج');
    }
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    try {
      setError(null);
      if (useLocal) {
        const newCategory: Category = { id: Date.now().toString(), sort_order: 0, is_active: true, ...categoryData } as Category;
        setCategories(prev => [...prev, newCategory]);
        return;
      }
      return;
    } catch (err) {
      console.error('Error adding category:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في إضافة الصنف');
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      setError(null);
      if (useLocal) {
        setCategories(prev => prev.map(c => c.id === id ? { ...c, ...categoryData } as Category : c));
        return;
      }
    } catch (err) {
      console.error('Error updating category:', err);
      throw new Error(err instanceof Error ? err.message : 'حدث خطأ في تحديث الصنف');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setError(null);
      if (useLocal) {
        setCategories(prev => prev.filter(c => c.id !== id));
        return;
      }
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