"use client";
import { useCart } from "@/context/CartContext";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiMinus, 
  FiPlus,
  FiTruck,
  FiShield,
  FiRefreshCw
} from "react-icons/fi";
import Image from "next/image";
import { api } from "@/data/api";
import { useService } from "@/context/ServerContext";
export default function cartSlider(){
    const { isCartOpen,
        toggleCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        totalAmount,}=useCart();
   const {products,isLoading,wishlist}=useService();
 console.log("buteedhuunii to hemjee ",cartItems);
 
    return(<div>
            {isCartOpen && (
        <div className="fixed inset-0 bg-white/30 z-40" onClick={toggleCart} />    
      )}
       {/* Sagsnii gulsuur */}
      <div className={`fixed top right-0 w-full  h-full max-w-[400px]  transform transition-transform duration-300 ease-in-out z-50 ${  isCartOpen ? "translate-x-0" : "translate-x-full "}`}>
        {/* tolgoi heseg */}
        <div className="flex items-center justify-between p-4 border-b ">
        <h2 className="text-xl font-semibold text-gray-700">
            Сагсанд байгаа бараа - {cartItems.length}
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Хаах"
          >
            <FaTimes className="text-gray-600 w-full" />
          </button>
       
        </div>
        <div className="flex flex-col  p-8 overflow-y-auto scrollbar-hide h-full">
          {/* product Cards */}
          {cartItems.length===0 ? (<div className="overflow-y-auto h-[calc(100vh-180px)] font-serif">
            <p className="text-gray-500 mb-4">Таны сагс хоосон байна</p>
              <button
                onClick={toggleCart}
                className="bg-indigo-300 text-white px-6 py-2 rounded-md hover:bg-indigo-400 transition-colors"
              >
                Худалдан авалтаа үргэлжлүүлэх
              </button>
          </div>):(
            <div className="space-y-4 mb-24"> 
            {cartItems.map((product,indx)=>(
          <div key={product.id || product._id} className=" mt-2 bg-white border w-full  max-w-[400px]  rounded-xl py-4 px-2 relative group hover:shadow-lg transition-shadow duration-300">
             
              <Link href={`/product/${product.id || product._id}`}>
                <div className="relative overflow-hidden rounded-lg ">
                  <img
                    src={`${api.file_url}${product.images?.[0]}`|| "/images/devices1.jpg"} 
                    // src={product.images?.[0] ? `${api.file_url}${product.images[0]}` : "/images/device2.jpg"}
                   alt="product"
                    className="w-full aspect-square object-fill rounded-lg transform group-hover:scale-105 transition-transform duration-300"/>
                </div>
              </Link>
                <div className="flex flex-row justify-between items-center mt-4">  
                <h3 className="mt-2 text-center font-medium text-gray-800 group-hover:text-blue-900 transition-colors ">
                  {product.name}
                </h3>
                {/* too shirheg */}
                <div className="ml-2 border border-gray-300 rounded-lg flex flex-row items-center mt-2 h-full gap-3  ">
                  <button className="py-2 px-4 text-gray-600 hover:text-blue-900 hover:bg-blue-50 transition-colors" onClick={()=>updateQuantity(product.id,product.quantity-1)}>
                 <FiMinus  className="w-4 h-4"/>
                  </button>
                  <span className="text-gray-900">{product.quantity}</span>
                  <button className="py-2 px-4 text-gray-600 hover:text-blue-900 hover:bg-blue-50 transition-colors" onClick={()=>updateQuantity(product.id,product.quantity+1)}>
                 <FiPlus  className="w-4 h-4"/>
                  </button>
                  </div>
                </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg text-gray-800 font-bold">
                  {Intl.NumberFormat("mn-MN").format(product.price)}₮
                </span>    
                <button
                  onClick={() => removeFromCart(product.id || product._id)}
                  className="w-full max-w-[130px] justify-center px-4  py-2 flex flex-row gap-2 items-center text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"  >Хасах
                   <FaTrash className="text-sm " />
                </button>
              </div>
              <p className="text-blue-900 font-medium mt-1">Нийт үнэ 
                      ₮{(product.price * product.quantity).toLocaleString()}
                    </p>
          </div>
        ))}
         
          </div>)}
          <div className=" bg-white w-full ">
          {cartItems.length>0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Нийт дүн:</span>
              <span className="text-sm font-bold text-gray-900 sm:text-sm md:text-lg lg:text-xl ">
                ₮{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={toggleCart}
                className="w-full px-4 border border-gray-300 rounded-md  hover:bg-gray-200 transition-colors text-sm text-gray-900 hover:text-white">
                Худалдан авалтаа үргэлжлүүлэх
              </button>
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="px-4 py-2 bg-blue-900 text-white hover:text-blue-900 rounded-md hover:bg-indigo-300 transition-colors flex justify-center items-center text-center text-sm">
                Захиалга хийх
              </Link>
            </div>
          </div>)}
      </div>
        </div>
      </div>
      {/* foot */}
    
    </div>)
}