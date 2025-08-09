import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import { useCategories, useProducts } from '../hooks/useSupabase';
import { BurgerItem } from '../types/database';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import Logo from '../components/logo.png';
import { Facebook, Instagram } from 'lucide-react';
import { 
  ShoppingCart, 
  Search, 
  Star, 
  Plus,
  Minus,
  X,
  Phone,
  MapPin,
  User,
  CreditCard,
  Check,
  ChefHat,
  Drumstick,
  Utensils,
  CheckCircle2,
  FileText,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Badge } from '../components/ui/badge';
// صور افتراضية وروابط fallback مباشرة
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop';
const DEFAULT_PRODUCT_IMG = 'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1400&auto=format&fit=crop';

// مكون بطاقة برجر مبسطة جداً
const SimpleBurgerCard: React.FC<{
  burger: BurgerItem;
  onAddToCart: (burger: BurgerItem, meatType: 'beef' | 'chicken', quantity: number) => void;
}> = ({ burger, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedMeat, setSelectedMeat] = useState<'beef' | 'chicken'>('beef');

  const handleAddToCart = () => {
    onAddToCart(burger, selectedMeat, quantity);
    setQuantity(1);
  };

  const currentPrice = selectedMeat === 'beef' ? burger.beef_price : burger.chicken_price;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 border border-gray-200 flex flex-col">
      <div className="relative">
        <img 
          src={burger.image || DEFAULT_PRODUCT_IMG} 
          alt={burger.name}
          className="w-full h-28 sm:h-32 object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
        />
        {burger.is_popular && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            الأكثر مبيعاً
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col h-full">
        <h3 className="font-display text-sm sm:text-base font-semibold tracking-tight text-gray-900 mb-1 text-center truncate">{burger.name}</h3>
        <p className="text-gray-600 mb-2 text-center leading-relaxed text-xs line-clamp-1 sm:line-clamp-2">
          {burger.description || 'برجر لذيذ ومحضر بعناية خاصة'}
        </p>
        
        {/* اختيار نوع اللحم */}
        <div className="mb-2.5">
          <h4 className="text-xs font-semibold text-gray-800 mb-2 text-center">اختر نوع اللحم:</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedMeat('beef')}
              className={`p-2.5 rounded-lg border transition-colors duration-200 ${
                selectedMeat === 'beef'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ChefHat className="w-4 h-4 mb-1" />
              <div className="font-semibold text-xs">لحم</div>
              <div className="text-sm font-extrabold text-red-600">{burger.beef_price} جنيه</div>
            </button>
            <button
              onClick={() => setSelectedMeat('chicken')}
              className={`p-2.5 rounded-lg border transition-colors duration-200 ${
                selectedMeat === 'chicken'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Drumstick className="w-4 h-4 mb-1" />
              <div className="font-semibold text-xs">دجاج</div>
              <div className="text-sm font-extrabold text-amber-600">{burger.chicken_price} جنيه</div>
            </button>
          </div>
        </div>
        
        {/* اختيار الكمية */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-800 mb-2 text-center">الكمية:</h4>
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-base font-bold bg-gray-50 px-3 py-1 rounded-full">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {/* السعر الإجمالي + زر أسفل البطاقة */}
        <div className="mt-auto">
          <div className="text-center mb-2">
            <div className="text-lg sm:text-xl font-extrabold text-red-600 tracking-tight">
              {currentPrice * quantity} جنيه
            </div>
            <div className="text-gray-500 text-xs">السعر الإجمالي</div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

// سلة التسوق المبسطة
const SimpleCart: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { items, removeItem, clearCart, totalPrice, addItem } = useCart();
  const { products: allProducts } = useProducts();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  // Accessibility: focus trap & Esc to close
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    const el = modalRef.current;
    if (!el) return;
    const focusables = el.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Load and persist customer info for better UX
  useEffect(() => {
    const saved = localStorage.getItem('charcoals_customer');
    if (saved) {
      try { setCustomerInfo(JSON.parse(saved)); } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('charcoals_customer', JSON.stringify(customerInfo));
  }, [customerInfo]);

  const validate = () => {
    const e: typeof errors = {};
    if (!customerInfo.name.trim()) e.name = 'الاسم مطلوب';
    const phoneOnly = customerInfo.phone.replace(/\D/g, '');
    if (phoneOnly.length < 9) e.phone = 'أدخل رقم هاتف صحيح (9 أرقام على الأقل)';
    if (!customerInfo.address.trim()) e.address = 'العنوان مطلوب';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;
    // Simulate order success UX
    setShowSuccess(true);
    clearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-sm sm:max-w-md h-full flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <h2 id="cart-title" className="text-lg font-extrabold">سلة التسوق</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col">
          {showSuccess ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">تم استلام طلبك بنجاح</h3>
              <p className="text-gray-600 mb-6">سنقوم بالتواصل معك لتأكيد التفاصيل خلال لحظات.</p>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
              >
                حسناً
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">السلة فارغة</h3>
              <p className="text-gray-600">أضف بعض العناصر لتبدأ طلبك</p>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="p-4 flex-1 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition">
                    <img 
                      src={item.product.image || DEFAULT_PRODUCT_IMG} 
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 tracking-tight">{item.product.name}</h4>
                      <div className="flex items-center gap-2 mt-1 mb-1">
                        {item.meat_type === 'beef' ? (
                          <Badge className="bg-red-100 text-red-700 border-red-200">لحم</Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">دجاج</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">السعر: {item.totalPrice} × {item.quantity} = <span className="text-gray-800 font-semibold">{item.totalPrice * item.quantity} جنيه</span></p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      aria-label="حذف العنصر"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Upsell suggestions */}
                {(() => {
                  const inCartIds = new Set(items.map(i => i.product.id));
                  const suggestions = (allProducts || [])
                    .filter((p: any) => p.is_popular && !inCartIds.has(p.id))
                    .slice(0, 3);
                  if (suggestions.length === 0) return null;
                  return (
                    <div className="mt-4">
                      <h4 className="font-display text-base font-extrabold text-gray-900 mb-2">يكملها مع…</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {suggestions.map((p: any) => (
                          <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <img
                              src={p.image || DEFAULT_PRODUCT_IMG}
                              alt={p.name}
                              className="w-12 h-12 object-cover rounded-lg"
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-gray-800 truncate">{p.name}</div>
                              <div className="text-xs text-gray-600 truncate">{p.description || 'طبق جانبي لذيذ'}</div>
                            </div>
                            <button
                              onClick={() => {
                                const meat: 'beef' | 'chicken' = typeof p.beef_price === 'number' ? 'beef' : 'chicken';
                                addItem(p, meat, [], 1);
                              }}
                              className="px-3 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-md"
                            >
                              إضافة
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Footer summary */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-xl border">
                  <span className="text-sm font-bold text-gray-700">الإجمالي:</span>
                  <span className="text-xl font-extrabold text-red-600">{totalPrice} جنيه</span>
                </div>

                {!showCheckout ? (
                  <div className="space-y-3">
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      إتمام الطلب
                    </button>
                    <button 
                      onClick={clearCart}
                      className="w-full bg-gray-200 text-gray-800 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      إفراغ السلة
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 text-center">بيانات التوصيل</h3>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-red-500" />
                        <span>الاسم الكامل</span>
                      </label>
                      <input 
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="أدخل اسمك الكامل"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-red-500" />
                        <span>رقم الهاتف</span>
                      </label>
                      <input 
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value.replace(/[^\d+\-\s]/g, '')})}
                        className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="مثال: 0123456789"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>عنوان التوصيل</span>
                      </label>
                      <textarea 
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm ${errors.address ? 'border-red-400' : 'border-gray-300'}`}
                        rows={3}
                        placeholder="أدخل عنوانك بالتفصيل"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address}
                      >
                        <Check className="w-5 h-5" />
                        تأكيد الطلب ({totalPrice} جنيه)
                      </button>
                      <button 
                        onClick={() => setShowCheckout(false)}
                        className="w-full bg-gray-200 text-gray-800 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        العودة للسلة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// المكون الرئيسي لصفحة الطلبات
const OrderContent: React.FC = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products: burgers, loading: productsLoading } = useProducts();
  const { addItem, items, totalPrice } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bump, setBump] = useState(false);

  const allCategories = [
    { id: 'all', name: 'جميع المنتجات', icon: '🍽️' },
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

  // Add a gentle bounce animation to the floating cart button when items change
  useEffect(() => {
    if (items.length > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 600);
      return () => clearTimeout(t);
    }
  }, [items.length]);

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-red-500 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-600 font-bold">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <Header />

      {/* البحث والفلاتر */}
      <section className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          {/* البحث */}
          <div className="relative mb-6">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن البرجر المفضل لديك..."
              className="w-full pr-12 pl-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base"
            />
          </div>

          {/* الفئات */}
          <div className="relative -mx-4">
            <div className="px-4 flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory" aria-label="تصنيفات">
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full md:rounded-xl whitespace-nowrap min-w-max font-bold text-sm md:text-base transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } snap-start`}
                >
                  <Utensils className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
            {/* Mobile fade edges to hint scroll */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-white to-transparent sm:hidden"></div>
            <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-white to-transparent sm:hidden"></div>
          </div>
        </div>
      </section>

      {/* المنتجات */}
      <main className="container mx-auto px-4 py-12">
        {filteredBurgers.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h3 className="font-display text-3xl font-extrabold text-gray-800 mb-4">لم نجد ما تبحث عنه</h3>
            <p className="text-gray-600 text-xl">جرب البحث بكلمات أخرى أو تصفح جميع المنتجات</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl font-extrabold text-gray-800">
                {activeCategory === 'all' ? 'جميع المنتجات' : allCategories.find(c => c.id === activeCategory)?.name}
                <span className="text-gray-500 text-xl mr-3">({filteredBurgers.length})</span>
              </h2>
              
              {items.length > 0 && (
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="bg-red-500 text-white px-8 py-4 rounded-2xl hover:bg-red-600 transition flex items-center gap-3 text-lg font-bold shadow-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  عرض السلة ({items.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 items-stretch">
              {filteredBurgers.map((burger) => (
                <SimpleBurgerCard
                  key={burger.id}
                  burger={burger}
                  onAddToCart={(burger, meatType, quantity) => {
                    for (let i = 0; i < quantity; i++) {
                      addItem(burger, meatType, [], 1);
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* سلة التسوق */}
      <SimpleCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* تمت إزالة الشريط السفلي الثابت بناءً على طلبك */}

      {/* زر سلة عائم ثابت أسفل الشاشة */}
      <button
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 ${bump ? 'animate-bounce' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2`}
        aria-label="فتح السلة"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
          {items.length > 0 && (
            <span className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[11px] sm:text-xs font-extrabold rounded-full w-6 h-6 sm:w-6 sm:h-6 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
      </button>

      <SiteFooter />
    </div>
  );
};

const Order: React.FC = () => {
  return (
    <CartProvider>
      <OrderContent />
    </CartProvider>
  );
};

export default Order;
