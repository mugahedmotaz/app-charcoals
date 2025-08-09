import React, { useState } from 'react';
import { Plus, Star, Clock, Flame, Heart, Eye } from 'lucide-react';
import { BurgerItem } from '../types/database';
import { useCart } from '../contexts/CartContext';

// صور افتراضية وروابط fallback مباشرة
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop';
const DEFAULT_PRODUCT_IMG = 'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1400&auto=format&fit=crop';

interface BurgerCardProps {
  burger: BurgerItem;
  onDetailsClick: (burger: BurgerItem) => void;
}

const BurgerCard: React.FC<BurgerCardProps> = ({ burger, onDetailsClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // استخدم اسم الصنف للمقارنة
  const catName = burger.category?.name;
  const isBurgerOrCombo = catName === 'برجر' || catName === 'كومبو';
  return (
    <div 
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onDetailsClick(burger)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img 
          src={burger.image || DEFAULT_PRODUCT_IMG} 
          alt={burger.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
        />
        {/* ...existing code... */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* إذا كان المنتج مشهور أو جديد استخدم حقول is_popular و is_new */}
          {burger.is_popular && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-lg animate-pulse">
              <Flame className="w-3 h-3 ml-1" />
              الأكثر مبيعاً
            </div>
          )}
          {burger.is_new && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              جديد
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleLike}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            } ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(burger);
            }}
            className={`p-2.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-blue-500 
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick(burger);
          }}
          className={`absolute bottom-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
          {burger.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 h-12">
          {burger.description}
        </p>
        <div className="flex items-center justify-between mb-4 text-xs">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center">
              <Clock className="w-3 h-3 ml-1" />
              <span>15-20 دقيقة</span>
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 ml-1 text-yellow-400 fill-current" />
              <span>4.{Math.floor(Math.random() * 3) + 6}</span>
            </div>
          </div>
          <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {catName === 'برجر' ? 'برجر' : 
             catName === 'كومبو' ? 'كومبو' : 
             catName === 'إضافات' ? 'إضافات' : 'مشروبات'}
          </div>
        </div>
        {/* Price and Add Button: فقط للبرجر والكومبو تظهر أسعار اللحم والفراخ */}
        {isBurgerOrCombo ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-red-600">
                    {burger.beef_price}
                  </span>
                  <span className="text-xs text-gray-500">لحم</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-600">
                    {burger.chicken_price}
                  </span>
                  <span className="text-xs text-gray-500">فراخ</span>
                </div>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDetailsClick(burger);
              }}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              اختيار
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-red-600">{burger.beef_price}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDetailsClick(burger);
              }}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              اختيار
            </button>
          </div>
        )}
      </div>
      {/* ...existing code... */}
    </div>
  );
};

export default BurgerCard;