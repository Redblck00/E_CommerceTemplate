"use client"
import { useService } from "@/context/ServerContext";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const BestSellers = () => {
    const { products, isLoading } = useService();
    const [activeTab, setActiveTab] = useState("new-arrivals");
    const [isTabsExpanded, setIsTabsExpanded] = useState(false);
    
    console.log("products:", products);
    
    const tabs = [
        { id: "isNew", label: "Hot New Arrival" },
        { id: "isSpecial", label: "Special" },
        { id: "isBestSeller", label: "Best Seller" },
        { id: "isTop", label: "Top" },
        { id: "new-arrivals", label: "New Arrivals", highlight: true },
        { id: "isTopRating", label: "Top rating" },
    ];

    const getFilterProduct = () => {
        if (!products || products.length === 0) return [];
        switch (activeTab) {
            case "isNew":
                return products.filter(product => product.isNew === true);
            case "isSpecial":
                return products.filter(product => product.isSpecial === true);
            case "isBestSeller":
                return products.filter(product => product.isBestSeller === true);
            case "isTop":
                return products.filter(product => product.isTop === true);
            case "isTopRating":
                return products.filter(product => product.isTopRating === true);
            case "new-arrivals":
            default:
                return products.filter(product => 
                    product.isNewArrival === true || 
                    new Date(product.createdDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                );
        }
    };

    const filteredProducts = getFilterProduct();
    const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label || "New Arrivals";

    return (
        <div className="mx-auto container px-2 sm:px-4 md:px-4 my-4 md:my-8 py-12 border border-indigo-200 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 mb-4 md:mb-6 font-serif">
                
                {/* Mobile Dropdown */}
                <div className="md:hidden mb-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsTabsExpanded(!isTabsExpanded)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <span className="text-sm font-medium text-gray-700">
                                {activeTabLabel}
                            </span>
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                    isTabsExpanded ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isTabsExpanded && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 ${
                                            activeTab === tab.id 
                                                ? 'bg-indigo-50 text-indigo-700 font-medium' 
                                                : 'text-gray-700'
                                        } ${tab.highlight ? 'border-l-4 border-indigo-500' : ''}`}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setIsTabsExpanded(false);
                                        }}
                                    >
                                        <div className="flex items-center">
                                            {tab.id === "isNew" && (
                                                <span className="text-indigo-500 mr-2 text-xs">Санал болгох</span>
                                            )}
                                            {tab.label}
                                            {activeTab === tab.id && (
                                                <svg className="w-4 h-4 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Horizontal Scroll (Alternative approach) */}
                <div className="md:hidden mb-4 hidden">
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                } ${tab.highlight ? 'ring-2 ring-indigo-200' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.id === "isNew" && (
                                    <span className="text-indigo-300 mr-1 text-xs">Санал</span>
                                )}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop tabs */}
                <div className="hidden md:flex space-x-4 lg:space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`text-sm font-medium transition-colors duration-200 ${
                                activeTab === tab.id ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
                            } ${
                                tab.highlight 
                                    ? "bg-indigo-100 text-indigo-700 px-3 lg:px-4 py-2 rounded-lg" 
                                    : "py-2"
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.id === "isNew" && (
                                <span className="text-indigo-500 mr-2">Санал болгох</span>
                            )}
                            {tab.label}
                            {activeTab === tab.id && !tab.highlight && (
                                <div className="mt-1 h-0.5 bg-indigo-600 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className=" grid grid-cols-1  justify-items-center sm:grid-cols-2 lg:grid-cols-3   xl:grid-cols-4 gap-2  lg:gap-4 mx-4 sm:mx-2 md:mx-10  4xl:mx-12 ">
                {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="animate-pulse bg-gray-200 h-64 rounded"></div>
                    ))
                ) : filteredProducts.length > 0 ? (
                
                    filteredProducts.map((product) => (
                     

                        <ProductCard key={product.id} product={product} />
                        
                    ))
                
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500 font-serif">
                        Одоогоор бүтээгдхүүн нэмэгдээгүй байна 
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestSellers;