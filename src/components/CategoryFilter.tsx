import React from 'react';
import { Filter, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  categories: { id: string; name: string; icon: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-12 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">تصفية القائمة</h3>
            <p className="text-sm text-gray-600">اختر الصنف المفضل لديك</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Sparkles className="w-4 h-4" />
          <span>تصفية ذكية</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {category.icon}
            </span>
            <span className="font-semibold">{category.name}</span>
            
            {/* Active indicator */}
            {activeCategory === category.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
      
      {/* Active category info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700">
            عرض منتجات: <span className="font-semibold text-red-600">
              {categories.find(c => c.id === activeCategory)?.name || 'الكل'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;