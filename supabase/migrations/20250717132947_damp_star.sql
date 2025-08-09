/*
  # إضافة بيانات تجريبية للتطبيق

  1. إضافة أصناف أساسية
  2. إضافة منتجات تجريبية
  3. إضافة إضافات متنوعة
  
  هذا الملف يحتوي على بيانات تجريبية لاختبار التطبيق
*/

-- إدراج الأصناف الأساسية
INSERT INTO categories (name, icon, description, sort_order, is_active) VALUES
('برجر', '🍔', 'برجر لذيذ بأنواع مختلفة', 1, true),
('كومبو', '🍟', 'وجبات كاملة مع البطاطس والمشروب', 2, true),
('إضافات', '🧀', 'إضافات متنوعة لتحسين الطعم', 3, true),
('مشروبات', '🥤', 'مشروبات باردة ومنعشة', 4, true)
ON CONFLICT (name) DO NOTHING;

-- الحصول على معرفات الأصناف
DO $$
DECLARE
    burger_category_id uuid;
    combo_category_id uuid;
    sides_category_id uuid;
    drinks_category_id uuid;
BEGIN
    SELECT id INTO burger_category_id FROM categories WHERE name = 'برجر';
    SELECT id INTO combo_category_id FROM categories WHERE name = 'كومبو';
    SELECT id INTO sides_category_id FROM categories WHERE name = 'إضافات';
    SELECT id INTO drinks_category_id FROM categories WHERE name = 'مشروبات';

    -- إدراج المنتجات
    INSERT INTO products (name, description, beef_price, chicken_price, image, category_id, is_popular, is_new, sort_order) VALUES
    -- برجر عادي
    ('كلاسيك برجر', 'لحمة/فراخ + مايونيز + كاتشب + بصل + خس', 7500, 8500, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', burger_category_id, true, false, 1),
    ('تشيز برجر', 'لحمة/فراخ + مايونيز + كاتشب + جبنة + بصل + خس', 8000, 9000, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', burger_category_id, false, false, 2),
    ('باربكيو برجر', 'لحمة/فراخ + مايونيز + كاتشب + جبنة + باربكيو + بصل + خس', 9000, 10000, 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop', burger_category_id, false, false, 3),
    ('هالبينو برجر', 'لحمة/فراخ + مايونيز + كاتشب + جبنة + هالبينو + بصل + خس', 9500, 10500, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', burger_category_id, true, false, 4),
    ('سيكريت برجر', 'لحمة/فراخ + مايونيز + كاتشب + جبنة + سويت صوص + بصل + خس', 9000, 10000, 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop', burger_category_id, false, true, 5),
    ('ايشن برجر', 'لحمة/فراخ + مايونيز + جبنة + سويت صوص + بصل + خس', 9000, 10000, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', burger_category_id, false, false, 6),
    ('إسموكي برجر', 'لحمة/فراخ + مايونيز + جبنة + صوص مدخن + بصل + خس', 10000, 11000, 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop', burger_category_id, false, false, 7),
    ('جوسي تشارلي', 'لحمة/فراخ + مايونيز + كاتشب + جبنة + مارتديلا + بصل + خس', 11000, 12000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', burger_category_id, true, false, 8),
    ('دبل ميكس', 'دبل لحمة/فراخ + كاتشب + جبنة + سبشل صوص + بصل + خس', 12500, 13500, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', burger_category_id, true, false, 9),
    ('شاركلز سبشل', 'لحمة/فراخ + مايونيز + كاتشب + جبنة + شيدر صوص + بصل + خس', 13000, 14000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', burger_category_id, true, true, 10),

    -- كومبو
    ('كومبو كلاسيك', 'برجر كلاسيك + بطاطس + مشروب', 15500, 16500, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', combo_category_id, true, false, 11),
    ('كومبو تشيز', 'تشيز برجر + بطاطس + مشروب', 16000, 17000, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', combo_category_id, false, false, 12),
    ('كومبو باربكيو', 'باربكيو برجر + بطاطس + مشروب', 17000, 18000, 'https://images.unsplash.com/photo-1606755962773-d324e2d5314f?w=400&h=300&fit=crop', combo_category_id, false, false, 13),
    ('كومبو هالبينو', 'هالبينو برجر + بطاطس + مشروب', 17500, 18500, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', combo_category_id, true, false, 14),
    ('كومبو سيكريت', 'سيكريت برجر + بطاطس + مشروب', 17000, 18000, 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop', combo_category_id, false, false, 15),
    ('كومبو شاركلز', 'شاركلز سبشل + بطاطس + مشروب', 21000, 22000, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop', combo_category_id, true, true, 16)
    ON CONFLICT (name) DO NOTHING;
END $$;

-- إدراج الإضافات
INSERT INTO extras (name, price, sort_order, is_active) VALUES
('قطعة لحم إضافية', 4000, 1, true),
('قطعة فراخ إضافية', 4500, 2, true),
('قطعة مارتديلا', 2000, 3, true),
('صوص سويت شيلي', 1000, 4, true),
('صوص مايونيز إضافي', 1000, 5, true),
('شرائح هالبينو', 1000, 6, true),
('جبنة شرائح إضافية', 1000, 7, true),
('جبنة صوص شيدر', 1000, 8, true),
('صوص باربكيو إضافي', 1000, 9, true),
('بصل مقلي', 500, 10, true),
('خس إضافي', 500, 11, true),
('طماطم', 500, 12, true)
ON CONFLICT (name) DO NOTHING;