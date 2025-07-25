import React, { useState } from "react";
import VerticalSwiper from "@/component/layout/Swiper";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <div className="absolute top-0 right-0 w-12 h-12 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

      {/* Mobile Header */}
      <div className="md:hidden">
        {/* Mobile Top Row - Logo and Menu */}
        <div className="grid grid-cols-2 items-center justify-between px-4  text-white font-serif">
          <Link 
            href="/" 
            className="hover:transition-scale-200 font-bold text-lg text-white font-serif hover:text-red-100 transition-colors duration-300"
          >
            <span className="font-semibold text-red-200 transform rotate-12 inline-block">D</span>
            ukunu's Shop
          </Link>
          
        {/* Mobile Swiper Row */}
        <div className="flex justify-center px-4 pb-2 ">
          <VerticalSwiper />
        </div>
        </div>


      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 text-white font-serif">
        {/* Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link 
            href="/" 
            className="hover:transition-scale-200 font-bold text-xl text-white font-serif hover:text-red-100 transition-colors duration-300"
          >
            <span className="font-semibold text-red-200 transform rotate-12 inline-block">D</span>
            ukunu's Online Shop
          </Link>
        </div>

        {/* Center: Swiper */}
        <div className="flex-1 flex justify-center min-w-0">
          <VerticalSwiper />
        </div>

        {/* Right section: Hours */}
        <div className="text-white text-sm flex-shrink-0 text-right">
          <div>Mon-Fri: 09:00-18:00</div>
          <div>Sat-Sun: 09:00-15:00</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;