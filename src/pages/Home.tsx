import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { useProducts } from '../hooks/useSupabase';
import Header from '../components/Header';
import SiteFooter from '../components/SiteFooter';
import Logo from '../components/logo.png';
import { Facebook, Instagram, Drumstick, Flame, FlaskConical, Zap, Star, Lock, Leaf, Truck } from 'lucide-react';

// صورة بديلة عامة عند فشل التحميل من رابط مباشر ثابت
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop';
// صورة افتراضية مباشرة لمنتجات البرجر إذا لم تتوفر صورة من البيانات
const DEFAULT_PRODUCT_IMG = 'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1400&auto=format&fit=crop';

// Read-only showcase card (no actions/links)
const ShowcaseCard: React.FC<{ item: any }> = ({ item }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
    <div className="relative">
      <img
        src={item.image || DEFAULT_PRODUCT_IMG}
        alt={item.name}
        className="w-full h-56 object-cover"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
      />
      {item.is_popular && (
        <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          الأكثر مبيعاً
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
      {item.description && (
        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
      )}
      {typeof item.price !== 'undefined' && (
        <div className="mt-3 text-red-600 font-extrabold">{item.price} ج.س</div>
      )}
    </div>
  </div>
);

const Home: React.FC = () => {
  const { products: burgers, loading } = useProducts();

  // عرض أفضل 3 منتجات
  const featuredBurgers = burgers?.filter(burger => burger.is_popular).slice(0, 3) || [];
  // اقتراح الأفضل: أولوية للأكثر شعبية ثم الأعلى تقييماً ثم الأعلى سعراً (إن توفرت الحقول)
  const recommendedBurgers = (
    ((burgers as any[]) || []).slice().sort((a, b) => {
      const popDiff = (b?.is_popular ? 1 : 0) - (a?.is_popular ? 1 : 0);
      if (popDiff !== 0) return popDiff;
      const ratingDiff = (b?.rating ?? 0) - (a?.rating ?? 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (b?.price ?? 0) - (a?.price ?? 0);
    })
  ).slice(0, 6);

  // صور بانرات دعائية كبيرة (برجر فقط)
  const promoImages = [
    'https://images.unsplash.com/photo-1550547660-9c3f1a7c4b1a?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1400&auto=format&fit=crop'
  ];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src !== FALLBACK_IMG) {
      img.src = FALLBACK_IMG;
    }
  };

  // شعارات ثقة / صحافة
  const trustLogos = [
    // { name: 'Tastemade', src: 'https://cdn.simpleicons.org/tastemade/6B7280' },
    { name: 'Uber Eats', src: 'https://cdn.simpleicons.org/ubereats/6B7280' },
    // { name: 'Deliveroo', src: 'https://cdn.simpleicons.org/deliveroo/6B7280' },
    // { name: 'Food Network', src: 'https://cdn.simpleicons.org/foodnetwork/6B7280' },
    // { name: 'BBC', src: 'https://cdn.simpleicons.org/bbc/6B7280' },
    { name: 'Yelp', src: 'https://cdn.simpleicons.org/yelp/6B7280' },
  ];

  // آراء العملاء (Testimonials)
  const testimonials = [
    { name: 'أحمد', role: 'عميل دائم', rating: 5, text: 'أفضل برجر ذقته! النكهة متوازنة واللحم طازج جدًا.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { name: 'سارة', role: 'Food blogger', rating: 5, text: 'التجربة رائعة من البداية للنهاية. عرض وتغليف ممتاز.', avatar: 'https://images.unsplash.com/photo-1544005314-0a7f8eaaae1d?q=80&w=300&auto=format&fit=crop' },
    { name: 'محمد', role: 'زبون جديد', rating: 4, text: 'السعر مناسب والجودة ممتازة. سأكرر الطلب بالتأكيد.', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&auto=format&fit=crop' },
  ];

  // صور معرض الموقع (روابط مباشرة ثابتة)
  const galleryImages = [
    'https://images.unsplash.com/photo-1550547660-9c3f1a7c4b1a?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1615719413546-198b25453f85?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551615593-ef5fe247e8f3?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606756790138-261e3d1f42b4?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1400&auto=format&fit=crop',
  ];

  return (
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Promo Banners (Scroll-Snap Carousel) */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto snap-x snap-mandatory no-scrollbar">
            <div className="flex gap-4 min-w-full">
              {promoImages.map((src, idx) => (
                <div key={idx} className="snap-center shrink-0 w-full">
                  <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                    <img src={src} alt={`بانر برجر رقم ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={handleImgError} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">الأسئلة الشائعة</h2>
            <p className="text-gray-600 dark:text-gray-300">إجابات سريعة على أكثر الأسئلة تكرارًا</p>
          </div>
          <div className="space-y-4">
            <details className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5">
              <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-between">
                ما هي مناطق التوصيل وسعره؟
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">نوصل لعدة أحياء محددة برسوم رمزية، ويمكن الاستلام من الفرع مجانًا.</div>
            </details>
            <details className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5">
              <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-between">
                ما هي طرق الدفع المتاحة؟
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">نقبل الدفع النقدي، البطاقات البنكية، والتحويل البنكي حيثما توفر.</div>
            </details>
            <details className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5">
              <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-between">
                هل توجد خيارات خاصة بالحساسية أو النباتيين؟
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">نوفر تخصيصات أساسية حسب الطلب. يُرجى إبلاغنا بالحساسية عند الطلب.</div>
            </details>
          </div>
        </div>
      </section>

      {/* Delivery & Payment Partners */}
      <section className="py-12 bg-white/70 backdrop-blur-sm dark:bg-zinc-950/70 border-y border-gray-100 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">شركاء التوصيل</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-orange-50 text-orange-700 border border-orange-200">توصيل داخلي سريع</span>
                <span className="px-4 py-2 rounded-full bg-gray-50 text-gray-700 border border-gray-200">استلام من الفرع</span>
                <span className="px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">مناطق محددة</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">طرق الدفع</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-green-50 text-white border bg-red-400 border-red-200">بنـكك</span>
                <span className="px-4 py-2 rounded-full bg-blue-50 text-white border bg-purple-800 border-purple-200">فوري</span>
                <span className="px-4 py-2 rounded-full bg-green-600 text-white border border-green-200">او كاش </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-16 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900"></div>

      {/* Metrics Strip (Social Proof) */}
      <section className="py-6 bg-white/70 backdrop-blur-sm dark:bg-zinc-950/70 border-y border-gray-100 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
              <Star className="w-5 h-5 text-yellow-400" />
              <div className="text-sm text-gray-700 dark:text-gray-300">تقييم 4.9/5</div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
              <Leaf className="w-5 h-5 text-green-600" />
              <div className="text-sm text-gray-700 dark:text-gray-300">مكونات طازجة يومياً</div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
              <Truck className="w-5 h-5 text-red-500" />
              <div className="text-sm text-gray-700 dark:text-gray-300">توصيل سريع</div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
              <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <div className="text-sm text-gray-700 dark:text-gray-300">دفع آمن</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Press Strip (Enhanced) */}
      <section className="py-12 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">موثوق به من قِبل</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">شركاؤنا ووسائل الإعلام</h3>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
              {trustLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  className="h-8 w-auto object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                />
              ))}
            </div>
          </div>

          {/* Rating + Badges */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {[0,1,2,3,4].map(i => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-400">4.9/5 بناءً على 1,200 مراجعة</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-zinc-900 dark:text-gray-300 border border-gray-200 dark:border-zinc-800 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> دفع آمن</span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-zinc-900 dark:text-gray-300 border border-gray-200 dark:border-zinc-800 flex items-center gap-1"><Leaf className="w-3.5 h-3.5" /> مكونات طازجة</span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-zinc-900 dark:text-gray-300 border border-gray-200 dark:border-zinc-800 flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> توصيل سريع</span>
            </div>
          </div>
        </div>
      </section>

      {/* Read-only Showcase Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">أفضل اختياراتنا</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">عرض تعريفي لأبرز الأصناف لدينا بدون طلب، فقط للتعرف على منتجاتنا</p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBurgers.map((burger) => (
                <div key={burger.id} className="transform hover:scale-[1.01] transition-transform duration-300">
                  <ShowcaseCard item={burger} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">قالوا عنا</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">آراء حقيقية من عملائنا</p>
          </div>
          <div className="overflow-x-auto snap-x snap-mandatory no-scrollbar">
            <div className="flex gap-6 min-w-full px-1">
              {testimonials.map((t, i) => (
                <div key={i} className="snap-center shrink-0 w-80 md:w-[28rem]">
                  <div className="h-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }}
                      />
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white">{t.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3" aria-label={`تقييم ${t.rating} من 5`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${s < t.rating ? '' : 'opacity-30'}`}>
                          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended section removed as requested */}

      {/* Photo Gallery (Masonry) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">معرض الصور</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">صور احترافية تعكس جودة منتجاتنا وأجواء مطعمنا</p>
          </div>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">{/* Masonry columns to reduce vertical gaps */}
            {galleryImages.map((src, i) => (
              <div key={i} className="break-inside-avoid mb-3 group overflow-hidden transition">
                <img
                  src={src}
                  alt={`صورة برجر ومعروضات ${i + 1}`}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={handleImgError}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - لماذا شاركلز؟ (محسّنة) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              لماذا <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">شاركلز</span>؟
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
              جودة لا تُضاهى، وصفات حصرية، وتجربة تليق بعلامة عالمية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white p-7 rounded-2xl shadow hover:shadow-lg transition relative overflow-hidden border border-gray-100">
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-red-50 rounded-full group-hover:scale-110 transition"></div>
                <div className="relative mb-4 text-red-500"><Drumstick className="w-10 h-10" strokeWidth={2.2} /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">لحم طازج 100%</h3>
                <p className="text-gray-600 text-sm">لحم مختار بدقة يومياً لضمان الطراوة والنكهة الغنية.</p>
              </div>
              <div className="group bg-white p-7 rounded-2xl shadow hover:shadow-lg transition relative overflow-hidden border border-gray-100">
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-110 transition"></div>
                <div className="relative mb-4 text-orange-500"><Flame className="w-10 h-10" strokeWidth={2.2} /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">شواء على نار مثالية</h3>
                <p className="text-gray-600 text-sm">توازن مثالي بين العصارة والقرمشة مع كل قضمة.</p>
              </div>
              <div className="group bg-white p-7 rounded-2xl shadow hover:shadow-lg transition relative overflow-hidden border border-gray-100">
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-50 rounded-full group-hover:scale-110 transition"></div>
                <div className="relative mb-4 text-yellow-500"><FlaskConical className="w-10 h-10" strokeWidth={2.2} /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">صلصات توقيع</h3>
                <p className="text-gray-600 text-sm">وصفات سرية تمنحك نكهات مميزة لا تُنسى.</p>
              </div>
              <div className="group bg-white p-7 rounded-2xl shadow hover:shadow-lg transition relative overflow-hidden border border-gray-100">
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-green-50 rounded-full group-hover:scale-110 transition"></div>
                <div className="relative mb-4 text-green-600"><Zap className="w-10 h-10" strokeWidth={2.2} /></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">تجربة سريعة وسلسة</h3>
                <p className="text-gray-600 text-sm">تحضير وتقديم بكفاءة عالية للحفاظ على سخونة وجودة البرجر.</p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-2xl p-6 shadow border">
                <div className="text-3xl font-extrabold text-gray-900">+10k</div>
                <div className="text-xs text-gray-500 mt-1">عميل سعيد</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow border">
                <div className="text-3xl font-extrabold text-gray-900">4.9★</div>
                <div className="text-xs text-gray-500 mt-1">متوسط التقييم</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow border">
                <div className="text-3xl font-extrabold text-gray-900">+20</div>
                <div className="text-xs text-gray-500 mt-1">وصفة خاصة</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow border">
                <div className="text-3xl font-extrabold text-gray-900">≤ 5 د</div>
                <div className="text-xs text-gray-500 mt-1">متوسط التحضير</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              موقعنا
            </h2>
            <p className="text-gray-600 text-lg">
              تعال وزرنا في مطعمنا أو اطلب التوصيل
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <iframe 
                className="w-full h-96" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019287758065!2d144.9630579153168!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b6e6e1e0e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614311234567!5m2!1sen!2sau" 
                loading="lazy"
                title="موقع المطعم"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      {/* Bottom Sticky CTA */}
      <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:px-0">
        <div className="mx-auto max-w-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4">
          <div className="text-sm md:text-base text-gray-800 dark:text-gray-100 font-semibold">جائع الآن؟ اطلب برجر طازج وساخن!</div>
          <Link to="/order" className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow hover:shadow-md transition">
            اطلب الآن
          </Link>
        </div>
      </div>
      </div>
  );
};

export default Home;
