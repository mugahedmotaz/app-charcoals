import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../components/logo.png";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Settings,
  BarChart3,
  DollarSign,
  Eye,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AdminProvider, useAdmin } from '../contexts/AdminContext';
import { useOrders } from '../hooks/useSupabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from '../components/ui/sonner';

const AdminContent: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { 
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
    refetch 
  } = useAdmin();
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useOrders();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    beef_price: '',
    chicken_price: '',
    original_beef_price: '',
    original_chicken_price: '',
    image: '',
    category_id: '',
    is_popular: false,
    is_new: false,
    is_active: true,
    sort_order: 0
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '🍔',
    description: '',
    sort_order: 0,
    is_active: true
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      beef_price: '',
      chicken_price: '',
      original_beef_price: '',
      original_chicken_price: '',
      image: '',
      category_id: '',
      is_popular: false,
      is_new: false,
      is_active: true,
      sort_order: 0
    });
    setEditingProduct(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      icon: '🍔',
      description: '',
      sort_order: 0,
      is_active: true
    });
    setEditingCategory(null);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // تحديد نوع الصنف المختار
      const selectedCatObj = categories.find(cat => cat.id === productForm.category_id);
      const isBurgerOrCombo = selectedCatObj && (selectedCatObj.name === 'برجر' || selectedCatObj.name === 'كومبو');
      const productData = {
        ...productForm,
        beef_price: parseFloat(productForm.beef_price),
        chicken_price: isBurgerOrCombo ? parseFloat(productForm.chicken_price) : null,
        original_beef_price: productForm.original_beef_price ? parseFloat(productForm.original_beef_price) : null,
        original_chicken_price: isBurgerOrCombo && productForm.original_chicken_price ? parseFloat(productForm.original_chicken_price) : null,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success('تم تحديث المنتج بنجاح');
      } else {
        await addProduct(productData);
        toast.success('تم إضافة المنتج بنجاح');
      }

      setIsProductDialogOpen(false);
      resetProductForm();
    } catch (error) {
      toast.error('حدث خطأ: ' + error.message);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryForm);
        toast.success('تم تحديث الصنف بنجاح');
      } else {
        await addCategory(categoryForm);
        toast.success('تم إضافة الصنف بنجاح');
      }

      setIsCategoryDialogOpen(false);
      resetCategoryForm();
    } catch (error) {
      toast.error('حدث خطأ: ' + error.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || '',
      beef_price: product.beef_price.toString(),
      chicken_price: product.chicken_price.toString(),
      original_beef_price: product.original_beef_price?.toString() || '',
      original_chicken_price: product.original_chicken_price?.toString() || '',
      image: product.image || '',
      category_id: product.category_id || '',
      is_popular: product.is_popular || false,
      is_new: product.is_new || false,
      is_active: product.is_active !== false,
      sort_order: product.sort_order || 0
    });
    setIsProductDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      icon: category.icon || '🍔',
      description: category.description || '',
      sort_order: category.sort_order || 0,
      is_active: category.is_active !== false
    });
    setIsCategoryDialogOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id);
        toast.success('تم حذف المنتج بنجاح');
      } catch (error) {
        toast.error('حدث خطأ في حذف المنتج');
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
      try {
        await deleteCategory(id);
        toast.success('تم حذف الصنف بنجاح');
      } catch (error) {
        toast.error('حدث خطأ في حذف الصنف');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-lg text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <Alert className="max-w-md">
  //         <AlertDescription>
  //           خطأ في تحميل البيانات: {error}
  //           <Button onClick={refetch} className="mt-2 w-full">
  //             إعادة المحاولة
  //           </Button>
  //         </AlertDescription>
  //       </Alert>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16 py-2 md:py-0 gap-2 md:gap-0">
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="relative">
                  <div className="ml-2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <img src={Logo} alt="Logo" className="w-10 md:w-12" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl text-gray-500">لوحة الإدارة</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-gradient-to-tr from-red-500 to-orange-500 text-white hover:text-white text-xs md:text-base px-2 md:px-4"
              >
                <Eye className="w-4 h-4" />
                عرض الموقع
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-xs md:text-base px-2 md:px-4"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-base">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="categories">الأصناف</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProducts}</div>
                  <p className="text-xs text-muted-foreground">منتج متاح</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground  text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">طلب إجمالي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground  text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} ج.س</div>
                  <p className="text-xs text-muted-foreground">إجمالي الإيرادات</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الطلبات المعلقة</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground  text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">في انتظار المعالجة</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>الطلبات الأخيرة</CardTitle>
                <CardDescription>آخر 5 طلبات تم استلامها</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-4">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                    <p>جاري تحميل الطلبات...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">لا توجد طلبات حتى الآن</p>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold">{order.total_amount} ج.س</p>
                          <Badge variant={
                            order.status === 'pending' ? 'secondary' :
                            order.status === 'confirmed' ? 'default' :
                            order.status === 'delivered' ? 'default' : 'secondary'
                          }>
                            {order.status === 'pending' ? 'معلق' :
                             order.status === 'confirmed' ? 'مؤكد' :
                             order.status === 'delivered' ? 'تم التسليم' : order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="البحث في المنتجات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="اختر الصنف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأصناف</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetProductForm} className="flex items-center gap-2 bg-gradient-to-tr from-red-500 to-orange-500">
                    <Plus className="w-4 h-4" />
                    إضافة منتج جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProduct ? 'قم بتعديل بيانات المنتج' : 'أدخل بيانات المنتج الجديد'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">اسم المنتج *</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">الصنف *</Label>
                        <Select 
                          value={productForm.category_id} 
                          onValueChange={(value) => setProductForm({...productForm, category_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الصنف" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.icon} {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">الوصف</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>

                    {/* إظهار حقول الأسعار حسب نوع الصنف */}
                    {(() => {
                      const selectedCatObj = categories.find(cat => cat.id === productForm.category_id);
                      if (selectedCatObj && (selectedCatObj.name === 'برجر' || selectedCatObj.name === 'كومبو')) {
                        return (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="beef_price">سعر اللحم *</Label>
                              <Input
                                id="beef_price"
                                type="number"
                                step="0.01"
                                value={productForm.beef_price}
                                onChange={(e) => setProductForm({...productForm, beef_price: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="chicken_price">سعر الفراخ *</Label>
                              <Input
                                id="chicken_price"
                                type="number"
                                step="0.01"
                                value={productForm.chicken_price}
                                onChange={(e) => setProductForm({...productForm, chicken_price: e.target.value})}
                                required
                              />
                            </div>
                          </div>
                        );
                      } else if (selectedCatObj) {
                        return (
                          <div>
                            <Label htmlFor="beef_price">سعر المنتج *</Label>
                            <Input
                              id="beef_price"
                              type="number"
                              step="0.01"
                              value={productForm.beef_price}
                              onChange={(e) => setProductForm({...productForm, beef_price: e.target.value})}
                              required
                            />
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* إظهار حقول الأسعار الأصلية حسب نوع الصنف */}
                    {(() => {
                      const selectedCatObj = categories.find(cat => cat.id === productForm.category_id);
                      if (selectedCatObj && (selectedCatObj.name === 'برجر' || selectedCatObj.name === 'كومبو')) {
                        return (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="original_beef_price">السعر الأصلي للحم (اختياري)</Label>
                              <Input
                                id="original_beef_price"
                                type="number"
                                step="0.01"
                                value={productForm.original_beef_price}
                                onChange={(e) => setProductForm({...productForm, original_beef_price: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="original_chicken_price">السعر الأصلي للفراخ (اختياري)</Label>
                              <Input
                                id="original_chicken_price"
                                type="number"
                                step="0.01"
                                value={productForm.original_chicken_price}
                                onChange={(e) => setProductForm({...productForm, original_chicken_price: e.target.value})}
                              />
                            </div>
                          </div>
                        );
                      } else if (selectedCatObj) {
                        return null;
                      }
                      return null;
                    })()}

                    <div>
                      <Label htmlFor="image">رابط الصورة</Label>
                      <Input
                        id="image"
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_popular"
                          checked={productForm.is_popular}
                          onCheckedChange={(checked) => setProductForm({...productForm, is_popular: checked})}
                        />
                        <Label htmlFor="is_popular">الأكثر مبيعاً</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_new"
                          checked={productForm.is_new}
                          onCheckedChange={(checked) => setProductForm({...productForm, is_new: checked})}
                        />
                        <Label htmlFor="is_new">جديد</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_active"
                          checked={productForm.is_active}
                          onCheckedChange={(checked) => setProductForm({...productForm, is_active: checked})}
                        />
                        <Label htmlFor="is_active">نشط</Label>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button type="submit" className='bg-gradient-to-tr from-red-500 to-orange-500'>
                        {editingProduct ? 'تحديث' : 'إضافة'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table className="min-w-[600px] text-xs sm:text-base">
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead>الصنف</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => {
                        const catName = product.category?.name;
                        let priceDisplay = '';
                        if (catName === 'برجر' || catName === 'كومبو') {
                          priceDisplay = `لحم: ${product.beef_price} ج.س`;
                          if (product.chicken_price) priceDisplay += ` | فراخ: ${product.chicken_price} ج.س`;
                        } else {
                          priceDisplay = `${product.beef_price} ج.س`;
                        }
                        return (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-2 sm:gap-3">
                                {product.image && (
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-xs sm:text-base">{product.name}</p>
                                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {product.category ? (
                                <span className="flex items-center gap-1">
                                  {product.category.icon} {product.category.name}
                                </span>
                              ) : (
                                <span className="text-gray-400">غير محدد</span>
                              )}
                            </TableCell>
                            <TableCell>{priceDisplay}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {product.is_popular && <Badge variant="secondary">مشهور</Badge>}
                                {product.is_new && <Badge variant="default">جديد</Badge>}
                                <Badge variant={product.is_active ? "default" : "secondary"}>
                                  {product.is_active ? 'نشط' : 'غير نشط'}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 sm:gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">إدارة الأصناف</h2>
              
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetCategoryForm} className="flex items-center gap-2 bg-gradient-to-tr from-red-500 to-orange-500">
                    <Plus className="w-4 h-4" />
                    إضافة صنف جديد
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? 'تعديل الصنف' : 'إضافة صنف جديد'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cat_name">اسم الصنف *</Label>
                      <Input
                        id="cat_name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="icon">الأيقونة</Label>
                      <Input
                        id="icon"
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                        placeholder="🍔"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cat_description">الوصف</Label>
                      <Textarea
                        id="cat_description"
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                      className=''
                        id="cat_is_active"
                        checked={categoryForm.is_active}
                        onCheckedChange={(checked) => setCategoryForm({...categoryForm, is_active: checked})}
                      />
                      <Label htmlFor="cat_is_active">نشط</Label>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)} className=''>
                        إلغاء
                      </Button>
                      <Button type="submit" className='bg-gradient-to-tr from-red-500 to-orange-500'>
                        {editingCategory ? 'تحديث' : 'إضافة'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={category.is_active ? "default" : "secondary"}>
                        {category.is_active ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {products.filter(p => p.category_id === category.id).length} منتج
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
              <Button onClick={refetchOrders} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-orange-500" />
                تحديث
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p>جاري تحميل الطلبات...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                    <p className="text-lg text-gray-600">لا توجد طلبات حتى الآن</p>
                    <p className="text-sm text-gray-500">ستظهر الطلبات هنا عند استلامها</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">
                            #{order.id.slice(-8)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer_name}</p>
                              {order.customer_phone && (
                                <p className="text-sm text-gray-500">{order.customer_phone}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">
                            {order.total_amount.toLocaleString()} ج.س
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              order.status === 'pending' ? 'secondary' :
                              order.status === 'confirmed' ? 'default' :
                              order.status === 'delivered' ? 'default' : 'secondary'
                            }>
                              {order.status === 'pending' ? 'معلق' :
                               order.status === 'confirmed' ? 'مؤكد' :
                               order.status === 'preparing' ? 'قيد التحضير' :
                               order.status === 'ready' ? 'جاهز' :
                               order.status === 'delivered' ? 'تم التسليم' :
                               order.status === 'cancelled' ? 'ملغي' : order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString('ar-SA')}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    
  );
};

const Admin: React.FC = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

export default Admin;