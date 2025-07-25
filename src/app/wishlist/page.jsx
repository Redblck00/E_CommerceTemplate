"use client"

import {useEffect,useState} from "react";
import Link from "next/link";
import { useService } from "@/context/ServerContext";
import {api} from "@/data/api";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

export default function Page(){
    const { products, wishlist, removeFromWishlist, wishlistLoading } =
    useService();
    console.log("wishlist", wishlist);
console.log("product ids", products);

    if (wishlistLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        );
    }
    
    const wishlistProducts = products.filter((p) =>
        wishlist.includes(p.id || p._id)
    );
   
    if(!wishlistProducts.length){
        return(
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center space-y-8 p-8 sm:p-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg max-w-2xl w-full border border-gray-200">
                    {/* Animated Heart Icon */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <FaHeart className="mx-auto text-5xl sm:text-6xl text-red-400 relative z-10" />
                    </div>
    
                    {/* Title with gradient */}
                    <div className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Таны хадгалсан бараа хоосон байна
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
                            Та дуртай бараагаа энд хадгалж, хожим нь худалдан авч болно
                        </p>
                    </div>
    
                    {/* Beautiful CTA Button */}
                    <div className="pt-4">
                        <Link
                            href="/shop"
                            className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-red-500 text-white text-base sm:text-lg font-semibold rounded-full hover:from-indigo-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <FaShoppingBag className="mr-3 group-hover:animate-bounce" />
                            Дэлгүүрлэж эхлэх
                            <svg 
                                className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    
    return(
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-serif">
                {/* Header Section */}
                <div className="mb-8 sm:mb-10">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <FaHeart className="text-red-500 text-xl sm:text-2xl" />
                            <h1 className="text-xl sm:text-lg md:text-xl lg:text-3xl font-bold text-gray-900">
                                Миний хадгалсан бараа
                            </h1>
                        </div>
                        <div className="bg-indigo-100 px-3 py-1 rounded-full">
                            <p className="text-sm sm:text-base text-indigo-300 font-medium">
                                {wishlistProducts.length} бараа
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {wishlistProducts.map((product) => (
                        <div
                            key={product.id || product._id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
                        >
                            <Link href={`/product/${product.id || product._id}`}>
                                <div className="relative overflow-hidden">
                                    <img
                                        src={`${api.file_url}${product.images?.[0]}`}
                                        alt={product.name}
                                        className="w-full h-48 sm:h-56 lg:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                                </div>
                                
                                <div className="p-4 sm:p-5">
                                    <h3 className="font-medium text-gray-800 group-hover:text-indigo-300 transition-colors line-clamp-2 text-sm sm:text-base mb-3">
                                        {product.name}
                                    </h3>
                                </div>
                            </Link>
                            
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg sm:text-xl font-bold text-indigo-300">
                                        {Intl.NumberFormat("mn-MN").format(product.price)}₮
                                    </span>
                                    <button
                                        onClick={() => removeFromWishlist(product.id || product._id)}
                                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-red-600 border border-red-300 rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                                    >
                                        Устгах
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};