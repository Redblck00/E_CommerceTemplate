"usse client";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import Categories from "./Categories";
import ProductTabs from "./ProductTabs";
import BestSellers from "./BestSellers";
import { useState, useEffect } from "react";
import { useService } from "@/context/ServerContext";
import NewProducts from "./NewProducts";

export default function TrendProduct() {
    const [selectedCategory,setSelectedCategory] = useState(null);
   
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }
 
//     console.log("All product categories:", products.map(p => p.categories));
  console.log("selected category:",selectedCategory)
    return (
        <div className=" my-4 w-full max-w-screen h-auto bg-white rounded-lg p-2 sm:p-2 md:p-4 lg:p-8 xl:p-8 ">
           <h1 className="
           text-3xl font-bold font-serif text-center text-black">Хамгийн их эрэлттэй бүтээгдэхүүн</h1> 
        <div className="flex flex-col space-y-4 justify-center mt-8">     
                <Categories onCategoryClick={handleCategoryClick} className="mt-4 mx-4"/>
               <ProductTabs selectedCategory={selectedCategory}/>
      <h1 className="text-4xl font-bold font-serif text-center text-black">New Product</h1>
           
    {/* New product ssection */}
        <div className="mt-16">
            <NewProducts/>
        </div>
        <BestSellers/>
        </div>
        </div>
    );
}