"use client";
import { useState } from "react";
import {  dummy } from "@/app/lib/mockData.js";
import ProductCard from "./ProductCard.jsx";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useService } from "@/context/ServerContext";
import HorizontalProductScroll from "./HorizontalProductScroll.jsx";
export default function ProductTabs({ selectedCategory}) {
  const [activeTab, setActiveTab] = useState(selectedCategory);

   const { products } = useService();

  const filterproducts=products.filter((product)=>product.categories.some((cat)=>cat.category===selectedCategory));
   

  return (
    <div className="w-full mx-auto px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-16 py-4 md:py-8 ">
      {/* Tabs */}
      <div className="max-w-7xl mx-auto">
       <HorizontalProductScroll products={filterproducts} title="Products"/>
      </div>

    
    </div>
  );
}
