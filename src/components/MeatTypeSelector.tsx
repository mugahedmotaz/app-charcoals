import React from 'react';
import { Beef, ChefHat } from 'lucide-react';

interface MeatTypeSelectorProps {
  selectedType: 'beef' | 'chicken';
  onTypeChange: (type: 'beef' | 'chicken') => void;
  beefPrice: number;
  chickenPrice: number;
}

const MeatTypeSelector: React.FC<MeatTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  beefPrice,
  chickenPrice
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">اختر نوع اللحم</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onTypeChange('beef')}
          className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
            selectedType === 'beef'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
          }`}
        >
          <div className={`p-2 rounded-xl ${
            selectedType === 'beef' ? 'bg-red-500' : 'bg-gray-400'
          }`}>
            <Beef className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">لحم</div>
            <div className="text-sm opacity-75">{beefPrice} ج.س</div>
          </div>
        </button>

        <button
          onClick={() => onTypeChange('chicken')}
          className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
            selectedType === 'chicken'
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50'
          }`}
        >
          <div className={`p-2 rounded-xl ${
            selectedType === 'chicken' ? 'bg-orange-500' : 'bg-gray-400'
          }`}>
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">فراخ</div>
            <div className="text-sm opacity-75">{chickenPrice} ج.س</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MeatTypeSelector;