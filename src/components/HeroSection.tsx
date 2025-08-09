import React, { useEffect, useRef, useState } from 'react';
import { Clock, Star, Truck, Play, Pause, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const attempt = v.play();
    if (attempt && typeof (attempt as Promise<void>).then === 'function') {
      (attempt as Promise<void>).then(() => setIsPlaying(!v.paused)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(!v.paused);
    }
  }, []);

  const handleToggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className="text-center lg:text-right space-y-8">
            {/* Badge */}
            <div className=" m-1 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg my-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">الطلب غير متاح الآن</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700"> الموقع تحت التشيـد</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  أطعم
                </span>
                <br />
                <span className="text-gray-800">برجر</span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    في بورتسـودان
                  </span>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                </span>
              </h1>
              <p className="text-xl mt-4 lg:text-2xl text-gray-600 leading-relaxed max-w-2xl pt-4">
                اكتشف طعم البرجر الأصيل مع وصفاتنا السرية والمكونات الطازجة المختارة بعناية
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              {[
                { icon: '⭐', value: '4.9', label: 'تقييم العملاء' },
                { icon: '🍔', value: '400+', label: 'برجر يومياً' },
                { icon: '⚡', value: '30', label: 'دقيقة تحضير' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/order" className="group inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                <span className="flex items-center gap-3">
                  <span>اطلب الآن</span>
                  <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <button onClick={handleToggleVideo} className="group flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                {isPlaying ? (
                  <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
                ) : (
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                <span>{isPlaying ? 'أوقف الفيديو' : 'شغّل الفيديو'}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-500" />
                <span>توصيل مجاني</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>تحضير سريع</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>جودة مضمونة</span>
              </div>
            </div>
          </div>

          {/* Hero Media (Video) */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Video */}
              <div className="relative group">
                <video
                  ref={videoRef}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  poster="/images/hero-poster.svg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="فيديو برجر في الهيرو"
                >
                  <source src="/videos/hero.webm" type="video/webm" />
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">25%</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">خصم خاص</div>
                      <div className="text-sm text-gray-600">للطلبات الجديدة</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float animation-delay-2000">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full border-2 border-white"></div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-800">4.9</span>
                      </div>
                      <div className="text-sm text-gray-600">1,234 تقييم</div>
                    </div>
                  </div>
                </div>

                {/* Video auto-plays; no overlay button needed */}
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl transform rotate-6 -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-3xl transform -rotate-3 -z-20"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
        </svg>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;