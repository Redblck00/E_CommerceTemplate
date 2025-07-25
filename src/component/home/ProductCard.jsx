"use client"
import Image from "next/image";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; 
import { useService } from "@/context/ServerContext";
import { useState } from "react";

export default function ProductCard({ product, viewMode = "grid" }) {
  const { addToCart } = useCart();
  const {wishlist,addToWishlist, removeFromWishlist }=useService();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const inWishlist = wishlist.includes(product._id || product.id);
  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    // addToCart(product);
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.price || 3888900,
      image: product.images || "/placeholder.jpg",
    });
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md hover:border-transparent transition-all duration-300 group ${
      viewMode === "list" ? "flex flex-row items-center h-[190px] w-full p-4" : "flex flex-col items-center w-60 h-80 mr-5 font-serif"
    }`}>
      {viewMode === "list" ? (
        // List View Layout
        <>
          {/* Product Image */}
          <div className="relative w-40 h-40 flex-shrink-0 mr-6 py-2 rounded-xl overflow-hidden ">
            <img
              src={product.images || "/images/device1.jpg"}
              alt={product.name}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/product/${product._id}`} className="text-base font-medium text-gray-900 line-clamp-1 mb-1 hover:text-blue-600 transition-colors">
              {product.name}
            </Link>
            
            {/* Rating and Category */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">{product.rating || 4.0}</span>
              </div>
              
            </div>
            {/* Action Icons */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <button 
                  onClick={()=>{
                    if (inWishlist) removeFromWishlist(product._id || product.id);
                    else addToWishlist(product._id || product.id);
                  }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Хүслийн жагсаалтад нэмэх">
                <svg 
                  className={`w-5 h-5 transition-colors ${
                    inWishlist ? 'text-red-500 fill-current' : 'text-gray-700 hover:text-red-500'
                  }`} 
                  fill={inWishlist ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              {/* View/Eye Icon */}
              <Link href={`/product/${product._id}`}>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors" title="View product">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Side - Price and Badge */}
          <div className="flex flex-col items-end gap-8 ml-4 py-2">
            {/* Sale Badge */}
            {product.isSales && (
              <div className="bg-red-500 text-white text-xs font-medium px-4 py-2 rounded-full">
                Sale
              </div>
            )}
            
            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-900">
                {(product.price  || 3888900).toLocaleString("mn-MN")}₮
              </div>
              {product.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toLocaleString("mn-MN")}₮
                </div>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={showAddedMessage}
              className={`w-10 h-10 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                showAddedMessage 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              title={showAddedMessage ? "Нэмэгдлээ!" : "Сагсанд нэмэх"}
            >
              {showAddedMessage ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </button>
          </div>
        </>
      ) : (
        // Grid View Layout (Original)
        <>
          {/* Product Image Container */}
          <div className="relative w-64 h-56">            
            {/* Sale Badge */}
            {product.isSales && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                  Sale
                </div>
              </div>
            )}
            
            {/* Product Image */}
            <img
              src={product.images || "/placeholder.jpg"}
              alt={product.name}
              className="object-contain w-full h-full p-4"
            />
            
            {/* Add to Cart Button - appears on hover */}
            <div className="absolute bottom-3 left-3 right-3 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <button 
                onClick={handleAddToCart}
                disabled={showAddedMessage}
                className="w-full bg-indigo-300 hover:bg-indigo-400 text-white font-serif font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
              >
              {showAddedMessage  ? (<>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 27 27">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Нэмэгдлээ!
              </>)
              : (<> <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>Сагсанд нэмэх</>)
              }
              </button>
            </div>
            
            {/* Wishlist Button - appears on hover */}
            <div className="absolute top-3 left-3 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <button 
                 onClick={() => {
                  if (inWishlist) 
                    removeFromWishlist(product._id || product.id);
                   
                  else addToWishlist(product._id || product.id);
                }}
                className="w-8 h-8 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 transform hover:scale-105"
                title="Add to wishlist"
              >
                <svg 
                  className={`w-5 h-5 transition-colors ${
                    inWishlist ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
                  }`} 
                  fill={inWishlist ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 26 26"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              
              </button>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="px-4 pb-4 flex flex-col justify-between h-24 font-serif">
            <Link href={`/product/${product._id || product.id}`} className="hover:text-blue-600 transition-colors">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed">
                {product.name}
              </h3>
            </Link>
            
            {/* Price and Rating Section */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  {(product.price || 3888900).toLocaleString("mn-MN")}₮
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice.toLocaleString("mn-MN")}₮
                  </span>
                )}
              </div>
       
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-3 h-3 ${i < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-600 ml-1 font-medium">{product.rating || 4.0}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}