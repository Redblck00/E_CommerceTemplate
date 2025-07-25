"use client";
import { useService } from "@/context/ServerContext";
import Slider from "@/component/home/Slider";
import TrendProduct from "@/component/home/TrendProduct";
import SalesProduct from "@/component/home/SalesProduct";
export default function Home() {
  const { sliders, categories, products, isLoading } = useService();

  if (isLoading) return <p>Уншиж байна...</p>;

  return (
    <div className="w-full bg-white  ">
  
      <Slider slides={sliders} />
      <TrendProduct /> 
     <SalesProduct/>
    </div>
  );
}
