/*
  # إنشاء جدول الإضافات

  1. جداول جديدة
    - `extras`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `is_active` (boolean)
      - `sort_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `extras`
    - إضافة سياسة للقراءة العامة والتعديل للمشرفين
*/

CREATE TABLE IF NOT EXISTS extras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE extras ENABLE ROW LEVEL SECURITY;

-- إدراج الإضافات التجريبية
INSERT INTO extras (name, price, sort_order) VALUES 
('قطعة لحم', 4000, 1),
('قطعة فراخ', 4500, 2),
('قطعة مارتديلا', 2000, 3),
('صوص سويت شيلي', 1000, 4),
('صوص مايونيز', 1000, 5),
('شرائح هالبينو', 1000, 6),
('جبنة شرائح', 1000, 7),
('جبنة صوص شيدر', 1000, 8),
('صوص باربكيو', 1000, 9);

-- سياسة للقراءة العامة
CREATE POLICY "Extras are publicly readable"
  ON extras
  FOR SELECT
  TO public
  USING (is_active = true);

-- سياسة للمشرفين لإدارة الإضافات
CREATE POLICY "Admins can manage extras"
  ON extras
  FOR ALL
  TO authenticated
  USING (true);