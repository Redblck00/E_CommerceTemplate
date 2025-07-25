
"use client"; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function VerticalSwiper() {
  return (
    <div className="w-60 h-12 overflow-hidden text-white">
      <Swiper
        direction="vertical"
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {["Free Shipping", "50% OFF", "New Arrivals", "Summer Sale"].map((text, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-center text-lg font-serif  py-4">
              {text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
