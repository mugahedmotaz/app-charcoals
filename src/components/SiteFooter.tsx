import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';
import { Facebook, Instagram } from 'lucide-react';

const SiteFooter: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo and Description */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <img src={Logo} alt="Charcoal's Logo" className="w-8 h-8 object-contain" loading="lazy" decoding="async" draggable={false} />
            </div>
            <div className="mr-1">
              <h1 className="text-2xl font-extrabold text-white">شاركلز</h1>
              <p className="text-sm text-gray-400">بورتسودان</p>
            </div>
          </div>
          <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
            أفضل برجر في بورتسودان. طعم لا يُنسى مع كل قضمة. نقدم تجربة طعام استثنائية بأجود المكونات وأفضل الخدمات.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-lg ring-1 ring-white/10 hover:ring-white/20 bg-white/5 hover:bg-white/10 transition" aria-label="Facebook">
              <Facebook className="w-4.5 h-4.5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-lg ring-1 ring-white/10 hover:ring-white/20 bg-white/5 hover:bg-white/10 transition" aria-label="Instagram">
              <Instagram className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="روابط سريعة">
          <h3 className="text-sm font-semibold text-white mb-4 tracking-wider">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-white transition">الرئيسية</Link></li>
            <li><Link to="/order" className="text-gray-400 hover:text-white transition">اطلب الآن</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition">من نحن</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition">اتصل بنا</Link></li>
          </ul>
        </nav>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 tracking-wider">تواصل معنا</h3>
          <address className="not-italic space-y-2 text-sm text-gray-400">
            <p>📍 بورتسودان، السودان</p>
            <p>📞 +249 123 456 789</p>
            <p>✉️ info@charcoals.sd</p>
            <p>🕒 9:00 ص - 12:00 م</p>
          </address>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 tracking-wider">انضم إلى نشرتنا</h3>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-gray-600"
              required
            />
            <button type="submit" className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold hover:from-red-600 hover:to-orange-600 transition">
              اشتراك
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">نرسل لك أحدث العروض والأخبار.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-8 text-sm">
        {/* Payments strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          {[
            { name: 'Visa', src: 'https://cdn.simpleicons.org/visa/9CA3AF' },
            { name: 'Mastercard', src: 'https://cdn.simpleicons.org/mastercard/9CA3AF' },
            { name: 'Apple Pay', src: 'https://cdn.simpleicons.org/applepay/9CA3AF' },
            { name: 'Google Pay', src: 'https://cdn.simpleicons.org/googlepay/9CA3AF' },
          ].map((p) => (
            <img
              key={p.name}
              src={p.src}
              alt={p.name}
              title={p.name}
              className="h-5 w-auto object-contain opacity-80 hover:opacity-100 transition"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
            />
          ))}
        </div>

        <div className="text-center text-gray-500">
          <p>© 2024 Charcoal's. جميع الحقوق محفوظة.</p>
          <p className="mt-2">Development by <span className="text-gray-300 font-semibold">Mugahed Motaz</span></p>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
