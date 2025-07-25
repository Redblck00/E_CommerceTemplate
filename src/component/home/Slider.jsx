"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useService } from "@/context/ServerContext";
import { api } from "@/data/api";
import Image from "next/image";

const MainSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const {sliders ,isloading,products}=useService();
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
   
  const slides = sliders
  .filter((slider) => slider.type === "header")
  .map((slider) => ({
    id: slider.id,
    image: `${api.file_url}${slider.image}`,
    title: slider.title,
    subtitle: slider.subtitle,
    description: slider.description,
  }));

 
  return (
    <div className="w-full max-w-7xl mx-auto h-full font-serif">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet w-3 h-3 mx-1.5 transition-all duration-300 bg-gray-400 opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active bg-gray-800 opacity-100 scale-110'
        }}
        navigation={!isMobile}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className={`overflow-hidden ${isMobile ? 'h-[600px]' : 'h-[450px]'} [&_.swiper-pagination]:bottom-6 [&_.swiper-button-prev]:after:text-base [&_.swiper-button-next]:after:text-base [&_.swiper-button-prev]:after:font-bold [&_.swiper-button-next]:after:font-bold`}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {isMobile ? (
              // Mobile Layout: Image on top, text at bottom
              <div className="flex flex-col h-full bg-white">
                {/* Image Section - Top */}
                <div className="flex-1 flex items-center justify-center p-4 ">
                  <div className="relative w-full max-h-[350px] h-full max-w-lg">
                    <img
                      // src={slide.image}
                      src="/images/card1.jpg"
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
                
                {/* Text Content at Bottom */}
                <div className="px-6 pb-16 pt-4 bg-white flex flex-col items-center">
                  <div className="space-y-4">
                    {slide.subtitle && (
                      <span className="text-center inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
                        {slide.subtitle}
                      </span>
                    )}
                    
                    <h1 className="text-center text-2xl font-bold text-gray-900 leading-tight">
                      {slide.title}
                    </h1>
                    
                    {slide.description && (
                      <p className="text-center text-gray-700 text-base leading-relaxed">
                        {slide.description}
                      </p>
                    )}
                    
                    <button className="items-center justify-center bg-indigo-900 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Desktop Layout: Side by side
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left: Text Content */}
                <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-20">
                  <div className="max-w-lg space-y-6">
                    {slide.subtitle && (
                      <span className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
                        {slide.subtitle}
                      </span>
                    )}
                    
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {slide.title}
                    </h1>
                    
                    {slide.description && (
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                        {slide.description}
                      </p>
                    )}
                    
                    <button className=" bg-indigo-900 hover:bg-indigo-800 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105" >
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Right: Image */}
                <div className="flex-1 flex items-center justify-center p-4 lg:p-8 ">
                  <div className="relative w-full max-w-lg">
                    <img
                      src={slide.image ? slide.images :"/images/device1.jpg" }
                      // src="/images/device3.jpg"
                      alt={slide.title}
                     
                      className="w-full h-[350px] object-fill rounded-xl transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        {!isMobile && (
          <>
               <div className="swiper-button-prev text-gray-600 text-2xl hover:text-gray-900 transition-colors w-11 h-11 -mt-5.5 bg-white bg-opacity-90 rounded-full"></div>
            <div className="swiper-button-next text-gray-600 text-2xl hover:text-gray-900 transition-colors w-11 h-11 -mt-5.5 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 hover:scale-110"></div>

          </>
        )}
      </Swiper>
    </div>
  );
};

export default MainSlider;