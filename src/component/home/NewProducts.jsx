"use client"
import { useEffect, useState } from "react";
import { useService } from "@/context/ServerContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function NewProducts() {
  const { products, sliders, isLoading } = useService();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // API ажиллахгүй байгаагийн улмаас орлуулах static зургууд
  const slides = [
    {
      id: 1,
      image: "/images/device1.jpg",
      title: "Шинэ бүтээгдэхүүн 1",
      subtitle: "Сонирхолтой сонголт",
      description: "Манай хамгийн сүүлийн үеийн бүтээгдэхүүнтэй танилцаарай."
    },
    {
      id: 2,
      image: "/images/device2.jpg",
      title: "Шинэ бүтээгдэхүүн 2",
      subtitle: "Зөвхөн танд",
      description: "Энэхүү бүтээгдэхүүн таны хэрэгцээнд төгс тохирно."
    },
    {
      id: 3,
      image: "/images/device3.jpg",
      title: "Шинэ бүтээгдэхүүн 3",
      subtitle: "Боловсронгуй дизайн",
      description: "Дизайн болон чанарыг хослуулсан шийдэл."
    }
  ];

  return (
    <div className="container mx-auto px-2  my-4 md:my-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={!isMobile}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center font-serif text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col justify-center items-center  text-center p-4">
                <h3 className="text-sm md:text-xl mb-1 md:mb-2">
                  {slide.subtitle}
                </h3>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg mb-4 md:mb-6 max-w-md">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


// "use client"
// import { useEffect, useState } from "react";
// import {useService} from  "@/context/ServerContext";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import {api} from "@/data/api";
// import { Button } from 'antd';

// export default function NewProducts(){
//      const {products, sliders, isLoading}=useService();
//      const [isMobile, setIsMobile]=useState(false);
       
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => {
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, []);

//   const slides = Array.isArray(sliders) 
//     ? sliders.filter((slider) => slider.type === "middle").map((slider) => ({
//         id: slider.id,
//         image: `${api.file_url}${slider.image}`,
//         title: slider.title,
//         subtitle: slider.subtitle,
//         description: slider.description,
//       }))
//     : [];
//     // const [selectedCategory,setSelectedCategory]=useState("all");
//       // console.log("products:",products);
// // console.log("newLastProduct:",newLastProduct);
//     return(
//       <div className="container mx-auto px-2 md:px-4 my-4 md:my-8">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={0}
//         slidesPerView={1}
//         navigation={!isMobile}
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         className="h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div
//               className="relative w-full h-full bg-cover bg-center"
//               style={{ backgroundImage: `url(${slide.image})` }}>
//               <div className="absolute inset-0 bg-black/50" />
//               <div className="absolute inset-0 flex flex-col justify-center items-center text-[var(--secondary-color)] text-center p-4">
//                 <h3 className="text-sm md:text-xl mb-1 md:mb-2">
//                   {slide.subtitle}
//                 </h3>
//                 <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
//                   {slide.title}
//                 </h2>
//                 <p className="text-sm md:text-lg mb-4 md:mb-6 max-w-md">
//                   {slide.description}
//                 </p>
//                 {/* <button className="bg-white text-black px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-gray-100 transition-colors text-sm md:text-base">
//                   Дэлгэрэнгүй үзэх
//                 </button> */}
           
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//     );
// }