"use client";
import { useState } from "react";
import {  dummy } from "@/app/lib/mockData.js";
import ProductCard from "./ProductCard.jsx";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useService } from "@/context/ServerContext";
import HorizontalProductScroll from "./HorizontalProductScroll.jsx";
export default function ProductTabs({ selectedCategory}) {
  const [activeTab, setActiveTab] = useState(selectedCategory);

  // const [isTabsExpanded, setIsTabsExpanded] = useState(false);

   const { products } = useService();
   console.log("product",products);
  const filterproducts=products.filter((product)=>product.categories.some((cat)=>cat.category===selectedCategory));
   
  // const filteredProducts=dummy.filter((product)=>product.categories.some((cat)=>cat.id===selectedCategory));
  
  console.log("filtered ",filterproducts);
  return (
    <div className="w-full mx-auto px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-16 py-4 md:py-8 ">
      {/* Tabs */}
      <div className="max-w-7xl mx-auto">
      {/* Desktop Tabs */}
        {/*
        <div className="bg-pink-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4 ">
            {products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))}
        </div> */}
        {/* Desktop Tabs */}
        {/* <div className="bg-pink-200 w-full  max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-8 md:gap-2">
            { filteredProducts.map((product)=>(
              <ProductCard key={product.id} product={product}/>
            ))}
        </div> */}

       <HorizontalProductScroll products={filterproducts} title="Products"/>
      </div>

    
    </div>
  );
}
