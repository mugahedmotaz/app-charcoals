
import React, { useState } from 'react';
// صور افتراضية وروابط fallback مباشرة
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop';
const DEFAULT_PRODUCT_IMG = 'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1400&auto=format&fit=crop';
import { X, Plus, Minus, ShoppingCart, Star, Clock } from 'lucide-react';
import { BurgerItem, BurgerExtra } from '../types/database';
import { useCart } from '../contexts/CartContext';
import { useExtras } from '../hooks/useSupabase';
import MeatTypeSelector from './MeatTypeSelector';

interface BurgerDetailsProps {
  burger: BurgerItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const BurgerDetails: React.FC<BurgerDetailsProps> = ({ burger, isOpen, onClose }) => {
  const { addItem } = useCart();
  const { extras } = useExtras();
  const [quantity, setQuantity] = useState(1);
  // تحديد نوع الصنف
  const catName = burger?.category?.name;
  const isBurgerOrCombo = catName === 'برجر' || catName === 'كومبو';
  // فقط للبرجر والكومبو تظهر خيارات اللحم والفراخ والإضافات
  const [selectedMeatType, setSelectedMeatType] = useState<'beef' | 'chicken'>('beef');
  const [selectedExtras, setSelectedExtras] = useState<BurgerExtra[]>([]);

  if (!burger || !isOpen) return null;

  let basePrice = burger.beef_price;
  let extrasPrice = 0;
  let totalPrice = basePrice * quantity;

  if (isBurgerOrCombo) {
    basePrice = selectedMeatType === 'beef' ? burger.beef_price : burger.chicken_price;
    extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    totalPrice = (basePrice + extrasPrice) * quantity;
  }

  const handleExtraToggle = (extra: BurgerExtra) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleAddToCart = () => {
    if (isBurgerOrCombo) {
      addItem(burger, selectedMeatType, selectedExtras, quantity);
      setSelectedMeatType('beef');
      setSelectedExtras([]);
    } else {
      addItem(burger, 'beef', [], quantity);
    }
    onClose();
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="relative">
          <img 
            src={burger.image || DEFAULT_PRODUCT_IMG} 
            alt={burger.name}
            className="w-full h-64 object-cover rounded-t-3xl"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {burger.is_popular && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                الأكثر مبيعاً
              </span>
            )}
            {burger.is_new && (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                جديد
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Info */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{burger.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{burger.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 ml-1" />
                <span>15-20 دقيقة</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 ml-1 text-yellow-400" />
                <span>4.{Math.floor(Math.random() * 3) + 6}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            {isBurgerOrCombo ? (
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">لحم</div>
                  <div className="text-2xl font-bold text-red-600">{burger.beef_price} ج.س</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">فراخ</div>
                  <div className="text-2xl font-bold text-orange-600">{burger.chicken_price} ج.س</div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">السعر</div>
                <div className="text-2xl font-bold text-red-600">{burger.beef_price} ج.س</div>
              </div>
            )}
          </div>

          {/* Meat Type Selector */}
          {isBurgerOrCombo && (
            <MeatTypeSelector
              selectedType={selectedMeatType}
              onTypeChange={setSelectedMeatType}
              beefPrice={burger.beef_price}
              chickenPrice={burger.chicken_price}
            />
          )}

          {/* Extras */}
          {isBurgerOrCombo && extras.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الإضافات المتاحة</h3>
              <div className="space-y-3">
                {extras.map((extra) => (
                  <label 
                    key={extra.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-red-500 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedExtras.some(e => e.id === extra.id)}
                        onChange={() => handleExtraToggle(extra)}
                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 ml-3"
                      />
                      <span className="font-medium text-gray-800">{extra.name}</span>
                    </div>
                    <span className="font-bold text-red-600">+{extra.price} ج.س</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">الكمية</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold text-gray-800 px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-700">الإجمالي:</span>
              <span className="text-2xl font-bold text-red-600">{totalPrice} ج.س</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`w-full font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
                isBurgerOrCombo
                  ? selectedMeatType === 'beef' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              إضافة للسلة ({quantity})
              {isBurgerOrCombo && ` - ${selectedMeatType === 'beef' ? 'لحم' : 'فراخ'}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerDetails;
