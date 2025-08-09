import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Settings, Bell, User, PartyPopper,  MenuSquare, Phone,Home } from 'lucide-react';
import Logo from "../components/logo.png"

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className=" ml-2 w-12 h-12 bg-gradient-to-tr from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <img src={Logo} alt="Logo" className="w-12" />
              </div>
              {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div> */}
            </div>
            <div className="hidden md:block">
              <p className="font-display text-gray-800 font-extrabold tracking-tight text-lg">شاركلز - بورتسودان</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center  ">
            {[
              { name: 'الرئيسية', href: '/#home', active: true },
              { name: 'القائمة', href: '/#menu' },
              { name: 'العروض', href: '/#offers' },
              { name: 'اتصل بنا', href: '/#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2  mx-2 rounded-lg font-medium transition-all duration-300 ${
                  item.active
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
                {item.active && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-red-600 rounded-full"></div>
                )}
              </a>
            ))}
          </nav>

          {/* Search Bar removed for cleaner marketing header */}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">

            {/* Notifications */}
            {/* <button className="relative p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"> */}
              {/* <Bell className="w-6 h-6" /> */}
              {/* <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span> */}
            {/* </button> */}

            {/* Admin Panel */}
            {/* <button
              onClick={() => navigate('/admin')}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
            >
              <Settings className="w-5 h-5" />
              الإدارة
            </button> */}

            {/* Cart Button removed: using floating button on Order page */}
            

            {/* Profile */}
            {/* <button className="hidden md:flex items-center gap-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button> */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 "
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 " />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top-2 duration-300">
            {/* Mobile Search removed */}

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {[
                { name: 'الرئيسية', href: '/#home', icon: <Home   className='bg-gradient-to-tr from-red-500 to-orange-500 w-8 h-8  p-2 rounded-md text-white'/> },
                { name: 'القائمة', href: '/#menu', icon: <Menu  className='bg-gradient-to-tr from-red-500 to-orange-500 w-8 h-8  p-2 rounded-md text-white'/>  },
                { name: 'العروض', href: '/#offers', icon: <MenuSquare  className='bg-gradient-to-tr from-red-500 to-orange-500 w-8 h-8 p-2 rounded-md text-white' /> },
                { name: 'اتصل بنا', href: '/#contact', icon: <Phone   className='bg-gradient-to-tr from-red-500 to-orange-500 w-8 h-8 p-2 rounded-md text-white'/> }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </a>
              ))}
              {/* <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium w-full text-right"
              >
                <Settings className="w-5 h-5" />
                الإدارة
              </button> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;