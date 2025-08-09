
export interface BurgerItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'burger' | 'combo' | 'sides' | 'drinks';
  popular?: boolean;
  new?: boolean;
  extras: BurgerExtra[];
}

export interface BurgerExtra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  burger: BurgerItem;
  quantity: number;
  selectedExtras: BurgerExtra[];
  totalPrice: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (burger: BurgerItem, extras: BurgerExtra[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface AdminContextType {
  burgers: BurgerItem[];
  categories: Category[];
  addBurger: (burger: Omit<BurgerItem, 'id'>) => void;
  updateBurger: (id: string, burger: Partial<BurgerItem>) => void;
  deleteBurger: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}