/*
  # إنشاء جدول المشرفين

  1. جداول جديدة
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `full_name` (text)
      - `email` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `admin_users`
    - إضافة سياسة للمشرفين المصرح لهم فقط
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text,
  email text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- إدراج مشرف افتراضي (username: admin, password: 1234)
INSERT INTO admin_users (username, password_hash, full_name, email) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'مدير النظام', 'admin@charcoals.com');

-- سياسة للسماح للمشرفين بالوصول لبياناتهم
CREATE POLICY "Admins can access their own data"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);