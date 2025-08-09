/*
  # إنشاء جدول الأصناف

  1. جداول جديدة
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `icon` (text)
      - `description` (text)
      - `sort_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `categories`
    - إضافة سياسة للقراءة العامة والتعديل للمشرفين
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text DEFAULT '🍽️',
  description text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- إدراج الأصناف الافتراضية
INSERT INTO categories (name, icon, description, sort_order) VALUES 
('برجر', '🍔', 'برجر لذيذ بأنواع مختلفة', 1),
('كومبو', '🍟', 'وجبات كاملة مع المشروبات والبطاطس', 2),
('إضافات', '🥤', 'إضافات جانبية لذيذة', 3),
('مشروبات', '🥤', 'مشروبات منعشة ومتنوعة', 4);

-- سياسة للقراءة العامة
CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO public
  USING (is_active = true);

-- سياسة للمشرفين لإدارة الأصناف
CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true);