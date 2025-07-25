"use client"
import Link from "next/link";
import { useState,useEffect } from "react";
import { useService } from "@/context/ServerContext";
import {cate_gories} from "@/app/lib/mockData.js";
export default function Categories({onCategoryClick,className}) {
  const { categories } = useService();
  //  console.log("categories:",categories);
  const [selectedCategoryIndex,setSelectedCategoryIndex] = useState(1);
  useEffect(()=>{
    if(categories.length>0){
      const firstCtgry=categories[0];
      setSelectedCategoryIndex(firstCtgry);
      onCategoryClick(firstCtgry._id);
    }
  },[categories]);
 
const handleCategoryClick = (category,idx) => {
    setSelectedCategoryIndex(idx);
    onCategoryClick(category);
 
}
  return (
    <div className={` w-full  container  font-serif ${className}`}>
  
       
      <ul className="flex flex-row items-center justify-center md:justify-around sm:justify-center lg:justify-between xl:justify-around 3x:justify-center gap-2 py-1 px-4 sm:px-8 md:px-12 lg:px-14 4xl:px-16
                     max-[620px]:flex-wrap max-[620px]:justify-center max-[620px]:gap-x-4 max-[620px]:gap-y-2">
        {categories.slice(0, 7).map((category, idx) => (
          <li key={category._id} onClick={()=>handleCategoryClick(category._id,idx)} >
              <span className={` text-base ${idx === selectedCategoryIndex ? " font-semibold text-indigo-900 " : "font-normal text-gray-600 hover:text-gray-400 "}`}>{category.name}</span>
          </li>
        ))}
      </ul>
    
    </div>
  );
}
