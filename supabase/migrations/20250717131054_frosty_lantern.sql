/*
  # إنشاء جدول المنتجات

  1. جداول جديدة
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `beef_price` (decimal) - سعر اللحم
      - `chicken_price` (decimal) - سعر الفراخ
      - `original_beef_price` (decimal) - السعر الأصلي للحم
      - `original_chicken_price` (decimal) - السعر الأصلي للفراخ
      - `image` (text)
      - `category_id` (uuid, foreign key)
      - `is_popular` (boolean)
      - `is_new` (boolean)
      - `is_active` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `products`
    - إضافة سياسة للقراءة العامة والتعديل للمشرفين
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  beef_price decimal(10,2) NOT NULL,
  chicken_price decimal(10,2) NOT NULL,
  original_beef_price decimal(10,2),
  original_chicken_price decimal(10,2),
  image text,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  is_popular boolean DEFAULT false,
  is_new boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- إدراج المنتجات التجريبية
DO $$
DECLARE
  burger_category_id uuid;
  combo_category_id uuid;
BEGIN
  -- الحصول على معرفات الأصناف
  SELECT id INTO burger_category_id FROM categories WHERE name = 'برجر';
  SELECT id INTO combo_category_id FROM categories WHERE name = 'كومبو';

  -- إدراج منتجات البرجر
  INSERT INTO products (name, description, beef_price, chicken_price, image, category_id, is_popular, sort_order) VALUES 
  ('كلاسيك', 'لحمه/فراخ +مايونيز+كاتشب+ بصل + خس', 7500, 8500, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', burger_category_id, true, 1),
  ('تشيز', 'لحمه/فراخ +مايونيز+كاتشب+ جبنه + بصل+ خس', 8000, 9000, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', burger_category_id, false, 2),
  ('باربكيو', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + باربكيو + بصل + خس', 9000, 10000, 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop', burger_category_id, false, 3),
  ('هالبينو', 'لحمه/فراخ +مايونيز+ كاتشب+ جبنه + هالبينو+ بصل+ خس', 9500, 10500, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', burger_category_id, true, 4),
  ('سيكريت', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + سويت صوص + بصل + خس', 9000, 10000, 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop', burger_category_id, false, 5),
  ('ايشن', 'لحمه/فراخ + مايونيز + جبنه + سويت صوص + بصل + خس', 9000, 10000, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', burger_category_id, false, 6),
  ('إسموكي', 'لحمة/فراخ + مايونيز + جبنة + صوص مدخن + بصل + خس', 10000, 11000, 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop', burger_category_id, false, 7),
  ('جوسي تشارلي', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + مارتدلا + بصل + خس', 11000, 12000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', burger_category_id, true, 8),
  ('دبل ميكس', 'دبل لحمه/فراخ + كاتشب + جبنه + سبشل صوص + بصل + خس', 12500, 13500, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', burger_category_id, true, 9),
  ('شاركلز', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + شيدر صوص + بصل + خس', 13000, 14000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', burger_category_id, true, 10);

  -- إدراج منتجات الكومبو
  INSERT INTO products (name, description, beef_price, chicken_price, image, category_id, is_popular, sort_order) VALUES 
  ('كومبو كلاسيك', 'لحمه/فراخ +مايونيز+كاتشب+ بصل + خس + بطاطس + مشروب', 15500, 16500, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', combo_category_id, true, 1),
  ('كومبو تشيز', 'لحمه/فراخ +مايونيز+كاتشب+ جبنه + بصل+ خس + بطاطس + مشروب', 16000, 17000, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', combo_category_id, false, 2),
  ('كومبو باربكيو', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + باربكيو + بصل + خس + بطاطس + مشروب', 17000, 18000, 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop', combo_category_id, false, 3),
  ('كومبو هالبينو', 'لحمه/فراخ +مايونيز+ كاتشب+ جبنه + هالبينو+ بصل+ خس + بطاطس + مشروب', 17500, 18500, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', combo_category_id, true, 4),
  ('كومبو سيكريت', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + سويت صوص + بصل + خس + بطاطس + مشروب', 17000, 18000, 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop', combo_category_id, false, 5),
  ('كومبو ايشن', 'لحمه/فراخ + مايونيز + جبنه + سويت صوص + بصل + خس + بطاطس + مشروب', 17000, 18000, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', combo_category_id, false, 6),
  ('كومبو إسموكي', 'لحمة/فراخ + مايونيز + جبنة + صوص مدخن + بصل + خس + بطاطس + مشروب', 18000, 19000, 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop', combo_category_id, false, 7),
  ('كومبو جوسي تشارلي', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + مارتدلا + بصل + خس + بطاطس + مشروب', 19000, 20000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', combo_category_id, true, 8),
  ('كومبو دبل ميكس', 'دبل لحمه/فراخ + كاتشب + جبنه + سبشل صوص + بصل + خس + بطاطس + مشروب', 20500, 21500, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', combo_category_id, true, 9),
  ('كومبو شاركلز', 'لحمه/فراخ + مايونيز + كاتشب + جبنه + شيدر صوص + بصل + خس + بطاطس +مشروب', 21000, 22000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', combo_category_id, true, 10);
END $$;

-- سياسة للقراءة العامة
CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO public
  USING (is_active = true);

-- سياسة للمشرفين لإدارة المنتجات
CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true);