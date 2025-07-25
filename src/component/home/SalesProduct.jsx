"use client"
import{useService} from "@/context/ServerContext";
import {api} from "@/data/api";
import Link from "next/link";
import {useCart} from "@/context/CartContext";
import { Swiper ,SwiperSlide} from "swiper/react";
import "swiper/css";
import 'swiper/css/autoplay';
import { Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";
import {  dummy } from "@/app/lib/mockData.js";
import { useState,useEffect } from "react";
export default function SalesProduct(){
    const {products,isLoading}=useService();
    const [slides, setSlides] = useState(0);
    const { addToCart } = useCart();
    const {isMobile ,SetMobile}=useState(false);
    const salesProducts=products.filter((product)=>product.isSales===true);
    console.log("products",products);
    const setSlidePerview=()=>{
        setSlides(  window.innerWidth <= 550
            ? 2
            : window.innerWidth <= 720
            ? 3
            : window.innerWidth > 720
            ? 4
            : 5);
        }
    useEffect(()=>{
        setSlidePerview();
        window.addEventListener("resize",setSlidePerview);
        return()=>{
            window.removeEventListener("resize",setSlidePerview);
        };

    },[slides]);
    return(
        <div className="w-full py-6">
            <Swiper    modules={[Autoplay]}
        spaceBetween={8}
        slidesPerView={slides
        }
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={2000} // Зөөлөн гулгах хурд
        grabCursor={true}
        freeMode={true} >

               {salesProducts.map((item)=>(
                <SwiperSlide key={item._id}>
                    {/* <ProductCard product={item}/> */}
                 <div className="max-w-[420px] bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                 <div className="relative h-40 sm:h-44 md:h-48">
              <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm">
                -{item.discount}% OFF
              </div>
              <div className="relative w-full h-full">
                <img
                //   src={`${api.file_url}${item.images[0]}`}
                src="/images/device2.jpg"
                  alt={item.name}
                  // fill
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="p-3 md:p-4 font-serif">
              <Link href={`/product/${item._id}`}>
                <h3 className="text-slate-900 text-sm md:text-base font-medium mb-1 md:mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="text-red-800 font-bold text-sm md:text-base">
                    {Intl.NumberFormat("mn-MN").format(item.originalPrice||item.salePrice)}₮
                  </span>
                  <span className="text-gray-400 line-through text-xs md:text-sm">
                    {Intl.NumberFormat("mn-MN").format(item.price)}₮
                  </span>
                </div>
              </Link>
           
            </div>
                 </div>
                </SwiperSlide>
               ))}
            </Swiper>
        </div>
    )
    
}