import React, { useState, useMemo } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BurgerCard from '../components/BurgerCard';
import BurgerDetails from '../components/BurgerDetails';
import CartSidebar from '../components/CartSidebar';
import CategoryFilter from '../components/CategoryFilter';
import { useCategories, useProducts } from '../hooks/useSupabase';
import { BurgerItem } from '../types/database';
import Logo from "../components/logo.png"
import { Facebook, Instagram } from 'lucide-react';

const IndexContent: React.FC = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { products: burgers, loading: productsLoading, error: productsError } = useProducts();
  const [selectedBurger, setSelectedBurger] = useState<BurgerItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const allCategories = [
    { id: 'all', name: 'الكل', icon: '🍽️' },
    ...categories
  ];

  const filteredBurgers = useMemo(() => {
    if (!burgers) return [];
    
    return burgers.filter(burger => {
      const matchesSearch = burger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (burger.description && burger.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || burger.category_id === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, burgers]);

  const popularBurgers = useMemo(() => {
    if (!burgers) return [];
    return burgers.filter(burger => burger.is_popular).slice(0, 3);
  }, [burgers]);

  // عرض حالة التحميل
  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  // عرض رسالة الخطأ
  // if (categoriesError || productsError) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center bg-white p-8 rounded-lg shadow-lg">
  //         <div className="text-red-500 text-6xl mb-4">⚠️</div>
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">خطأ في تحميل البيانات</h2>
  //         <p className="text-gray-600 mb-4">
  //           {categoriesError || productsError}
  //         </p>
  //         <button 
  //           onClick={() => window.location.reload()}
  //           className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
  //         >
  //           إعادة المحاولة
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Popular Items Section */}
        {popularBurgers.length > 0 && (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                الأكثر مبيعاً 🔥
              </h2>
              <p className="text-gray-600 text-lg">
                البرجر المفضل لدى عملائنا
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularBurgers.map((burger) => (
                <BurgerCard
                  key={burger.id}
                  burger={burger}
                  onDetailsClick={setSelectedBurger}
                />
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        {allCategories.length > 1 && (
          <CategoryFilter
            categories={allCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Menu Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              قائمة الطعام الكاملة
            </h2>
            <p className="text-gray-600 text-lg">
              اكتشف جميع خياراتنا اللذيذة
            </p>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              عرض {filteredBurgers.length} منتج
              {searchQuery && ` من البحث عن "${searchQuery}"`}
            </p>
          </div>

          {/* Burgers Grid */}
          {filteredBurgers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBurgers.map((burger) => (
                <BurgerCard
                  key={burger.id}
                  burger={burger}
                  onDetailsClick={setSelectedBurger}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? 'جرب البحث بكلمات مختلفة أو تصفح الفئات الأخرى'
                  : 'لا توجد منتجات متاحة حالياً'
                }
              </p>
            </div>
          )}
        </section>
      </main>

 <div className="text-center my-8">
<div className="bg-white rounded-lg py-10  p-8 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-14">
                موقعنا
            </h2>
                <iframe className='rounded-lg' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019287758065!2d144.9630579153168!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b6e6e1e0e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614311234567!5m2!1sen!2sau" width="100%" height="450"  loading="lazy"></iframe>
          </div>
            </div>


      {/* Footer */}
      <footer className="bg-white text-gray-800 py-10 border-t">
        <div className="container mx-auto px-4 text-center">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 justify-center mb-12">
            <div className="relative">
              <div className=" ml-2 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <img src={Logo} alt="Logo" className="w-12" />
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                شاركلز
              </h1>
              <p className="text-sm text-gray-500 font-medium">بورتسودان</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-3 my-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-8 h-8 text-white bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-md hover:bg-yellow-600 transition" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-8 h-8 text-white bg-gradient-to-r from-red-500 to-orange-500 p-1 rounded-md hover:bg-yellow-600 transition" />
            </a>
          </div>

          {/* Description */}
          <p className="text-gray-600 my-6">
            أفضل برجر في <span className="relative">
                      <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                         بورتسـودان
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                    </span>  طعم لا يُنسى مع كل قضمة
          </p>

          {/* Footer Links */}
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 mb-6">
            <a href="#" className="hover:text-red-500 transition">من نحن</a>
            <a href="#" className="hover:text-red-500 transition">اتصل بنا</a>
            <a href="#" className="hover:text-red-500 transition">سياسة الخصوصية</a>
            <a href="#" className="hover:text-red-500 transition">الشروط والأحكام</a>
          </div>

          {/* Bottom Note */}
          <p className="text-xs text-gray-500">
            © 2024 Charcoal's. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Development by <a className="text-red-600 font-bold" href='#'>Mugahed Motaz</a>
          </p>
        </div>
      </footer>

      {/* Modals */}
      <BurgerDetails
        burger={selectedBurger}
        isOpen={!!selectedBurger}
        onClose={() => setSelectedBurger(null)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;