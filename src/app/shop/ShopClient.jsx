"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { dummy, cate_gories } from "@/app/lib/mockData.js";
import { useService } from "@/context/ServerContext";
import ProductCard from "@/component/home/ProductCard";
import { 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiMinus, 
  FiPlus,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiFilter,
  FiChevronDown,
  FiDollarSign
} from "react-icons/fi";
import Image from "next/image";

export default function ShopClient() {
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const { products, loading, categories,sliders } = useService();
   console.log("product:",products);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get params from URL
  const categoryParam = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const minPriceParam = searchParams.get("minPrice") || "0";
  const maxPriceParam = searchParams.get("maxPrice") || "10000000";

  // State for search input - Initialize with URL params
  const [searchText, setSearchText] = useState(searchQuery);
  const [sort, setSort] = useState("");

  // Sort options
  const sortOptions = [
    { value: "", label: "Эрэмбэлэх" },
    { value: "low", label: "Үнэ: Багаас их рүү" },
    { value: "high", label: "Үнэ: Ихээс бага руу" }
  ];

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const debouncedUpdateUrl = useCallback(
    debounce((text) => {
      const params = new URLSearchParams(searchParams.toString());
      if (text) params.set("search", text);
      else params.delete("search");
      router.push(`/shop?${params.toString()}`);
    }, 500),
    [searchParams]
  );

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    debouncedUpdateUrl(text);
  };

  // Update state when URL params change
  useEffect(() => {
    setSearchText(searchQuery);
    setPriceRange([parseInt(minPriceParam), parseInt(maxPriceParam)]);
  }, [searchQuery, minPriceParam, maxPriceParam]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setIsPriceDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    router.push(`/shop?${params.toString()}`);
    setIsPriceDropdownOpen(false); // Close dropdown after applying filter
  };

  const resetFilters = () => {
    setSearchText("");
    setSort("");
    setPriceRange([0, 10000000]);
    router.push(`/shop`);
  };

  const handleCategoryClick = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("category") === id) {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    router.push(`/shop?${params.toString()}`);
    setIsCategoryDropdownOpen(false); // Close dropdown after selection
  };

  // Update URL params on sort change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    } 
    router.push(`/shop?${params.toString()}`);
  }, [sort]);


  let filteredProducts = products.filter((product) => {
    const productCategories = product?.categories || [];
    const productCategoryIds = productCategories.map(cat => 
      String(cat.category || cat._id || cat.id)
    );

    const matchCategory = categoryParam
      ? productCategoryIds.includes(String(categoryParam))
      : true;
    const matchSearch = searchText
      ? product?.name?.toLowerCase().includes(searchText.toLowerCase())
      : true;
    const price = parseInt(product.price) || 0;
    const matchPrice = price >= priceRange[0] && price <= priceRange[1];

    const isActiveProduct = product.isActive !== false;
    return matchCategory && matchSearch && matchPrice && isActiveProduct;
  });

  // Sorting
  if (sort === "low") {
    filteredProducts = filteredProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  } else if (sort === "high") {
    filteredProducts = filteredProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  }

  const handleSortSelect = (value) => {
    setSort(value);
    setIsDropdownOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === sort);
    return currentOption ? currentOption.label : sortOptions[0].label;
  };

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (!categoryParam) return "Бүх ангилал";
    const currentCategory = categories.find(cat => String(cat._id) === String(categoryParam));
    return currentCategory ? currentCategory.name : "Тодорхойгүй ангилал";
  };

  if (loading) return <div>Loading...</div>; 

  return (
    <div className="relative flex w-full h-screen overflow-hidden font-serif bg-gray-50">
      {/* Left Filter Section - Hidden on mobile */}
      <div className="hidden md:block w-80 bg-white  border-r border-gray-200 overflow-y-auto scrollbar-hide h-full shadow-sm">
        <div className="p-6 space-y-6">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
          <FiShoppingCart className="text-black w-6 h-6" />
            <button
              onClick={resetFilters}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
            <FiRefreshCw  className="w-4 h-4 text-gray-600"/>  
            </button>
          </div>
          
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Ангилал</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category._id || category.id || category.name}
                  onClick={() => handleCategoryClick(category._id)}
                  className={`flex items-center justify-between text-sm font-medium cursor-pointer transition-colors ${
                    categoryParam === String(category._id)
                      ? "text-blue-500"
                      : "text-gray-700 hover:text-blue-500"
                  }`}>
                  <span>{category.name}</span>
              
                </div>
              ))}
            </ul>
          </div>
          {/* Price Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Үнийн шүүлт
            </h3>
            <div className="space-y-4">
              {/* Dual Range Slider Container */}
              <div className="relative">
                <div className="relative h-2 bg-gray-200 rounded-lg">
                  <div 
                    className="absolute h-2 bg-blue-500 rounded-lg"
                    style={{
                      left: `${(priceRange[0] / 10000000) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 10000000) * 100}%`
                    }}
                  ></div>
                </div>
                {/* Min Range Input */}
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value <= priceRange[1]) {
                      setPriceRange([value, priceRange[1]]);
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                />
                {/* Max Range Input */}
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= priceRange[0]) {
                      setPriceRange([priceRange[0], value]);
                    }
                  }}
                  className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                />
              </div>
              
              {/* Price Display */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">
                    {Intl.NumberFormat("mn-MN").format(priceRange[0])}₮
                  </span>
                  <span className="mx-2">-</span>
                  <span className="font-medium">
                    {Intl.NumberFormat("mn-MN").format(priceRange[1])}₮
                  </span>
                </div>
              </div> 
              {/* Price Input Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Хамгийн бага</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (value <= priceRange[1]) {
                        setPriceRange([value, priceRange[1]]);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Хамгийн их</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (value >= priceRange[0]) {
                        setPriceRange([priceRange[0], value]);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10000000"
                  />
                </div>
              </div>
              
              {/* Apply Button */}
              <button
                onClick={handlePriceFilter}
                className="w-full bg-indigo-500 hover:bg-indigo-900 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Шүүлт хэрэглэх
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Product Section */}
      <div className="flex-grow h-full overflow-y-auto scrollbar-hide ml-0 md:ml-2 lg:ml-5 xl:ml-5">
        <div className="p-2 ">
          <div className="max-w-7xl mx-auto">
            {/* Title Banner */}/
            {sliders && sliders.map((item)=>
            <div key={item.id || item._id || index}  className="w-full h-32 md:h-56 bg-gradient-to-br from-slate-700 via-indigo-800 to-slate-700 rounded-xl flex items-center justify-center mb-6 md:mb-8 shadow-lg">
              <span className="text-lg md:text-3xl font-bold text-white text-center px-4">{item.description}</span>
            </div>
          )};
            
            {/* Mobile Category Filter & Search Bar */}
            <div className="mb-6 md:mb-8 space-y-4">
              {/* Mobile Filters Row - Only visible below 768px */}
              <div className="md:hidden flex gap-3">
                {/* Category Dropdown */}
                <div className="flex-1 relative" ref={categoryDropdownRef}>
                  <button
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-800 focus:border-transparent text-gray-700 cursor-pointer hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <FiFilter className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium text-sm truncate">{getCurrentCategoryName()}</span>
                    </div>
                    <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                      isCategoryDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`} />
                  </button>
                  
                  {/* Category Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-200 transform origin-top ${
                    isCategoryDropdownOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="py-2 max-h-60 overflow-y-auto">
                      {/* All Categories Option */}
                      <button
                        onClick={() => handleCategoryClick("")}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 ${
                          !categoryParam 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        Бүх ангилал
                      </button>
                      {categories.map((category, index) => (
                        <button
                          key={category._id || category.id || category.name ||index}
                          onClick={() => handleCategoryClick(category._id)}
                          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 ${
                            categoryParam === String(category._id) 
                              ? 'bg-blue-50 text-blue-600 font-medium' 
                              : 'text-gray-700 hover:text-blue-600'
                          } ${index !== categories.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Filter Dropdown */}
                <div className="flex-1 relative" ref={priceDropdownRef}>
                  <button
                    onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                    className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <FiDollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium text-sm truncate">
                        {priceRange[0] === 0 && priceRange[1] === 10000000 
                          ? "Үнэ" 
                          : `${Intl.NumberFormat("mn-MN", {notation: "compact"}).format(priceRange[0])}₮-${Intl.NumberFormat("mn-MN", {notation: "compact"}).format(priceRange[1])}₮`
                        }
                      </span>
                    </div>
                    <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                      isPriceDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`} />
                  </button>
                  
                  {/* Price Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-200 transform origin-top ${
                    isPriceDropdownOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="p-4 space-y-4">
                      {/* Dual Range Slider Container */}
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 rounded-lg">
                          <div 
                            className="absolute h-2 bg-blue-500 rounded-lg"
                            style={{
                              left: `${(priceRange[0] / 10000000) * 100}%`,
                              width: `${((priceRange[1] - priceRange[0]) / 10000000) * 100}%`
                            }}
                          ></div>
                        </div>
                        {/* Min Range Input */}
                        <input
                          type="range"
                          min="0"
                          max="10000000"
                          value={priceRange[0]}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value <= priceRange[1]) {
                              setPriceRange([value, priceRange[1]]);
                            }
                          }}
                          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                        {/* Max Range Input */}
                        <input
                          type="range"
                          min="0"
                          max="10000000"
                          value={priceRange[1]}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= priceRange[0]) {
                              setPriceRange([priceRange[0], value]);
                            }
                          }}
                          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                      </div>
                      
                      {/* Price Display */}
                      <div className="flex items-center justify-center">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">
                            {Intl.NumberFormat("mn-MN").format(priceRange[0])}₮
                          </span>
                          <span className="mx-2">-</span>
                          <span className="font-medium">
                            {Intl.NumberFormat("mn-MN").format(priceRange[1])}₮
                          </span>
                        </div>
                      </div> 
                      
                      {/* Price Input Fields */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Хамгийн бага</label>
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              if (value <= priceRange[1]) {
                                setPriceRange([value, priceRange[1]]);
                              }
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Хамгийн их</label>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              if (value >= priceRange[0]) {
                                setPriceRange([priceRange[0], value]);
                              }
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="10000000"
                          />
                        </div>
                      </div>
                      
                      {/* Apply Button */}
                      <button
                        onClick={handlePriceFilter}
                        className="w-full bg-indigo-500 hover:bg-indigo-900 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Шүүлт хэрэглэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Sort Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-white"
                    placeholder="Бүтээгдэхүүн хайх..."
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Sort Dropdown */}
                  <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg px-4 sm:px-6 py-3 pr-10 sm:pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 cursor-pointer hover:border-gray-400 transition-all duration-200 min-w-[150px] sm:min-w-[200px] text-left shadow-sm hover:shadow-md"
                    >
                      {getCurrentSortLabel()}
                    </button>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 sm:px-4 pointer-events-none">
                      <svg 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Sort Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-200 transform origin-top ${
                      isDropdownOpen 
                        ? 'opacity-100 scale-y-100 translate-y-0' 
                        : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                    }`}>
                      <div className="py-2">
                        {sortOptions.map((option, index) => (
                          <button
                          key={option.value || index}
                            onClick={() => handleSortSelect(option.value)}
                            className={`w-full text-left px-4 sm:px-6 py-3 hover:bg-blue-50 transition-colors duration-150 ${
                              sort === option.value 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'text-gray-700 hover:text-blue-600'
                            } ${index !== sortOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 rounded-md transition-colors ${
                        viewMode === "grid" 
                          ? "bg-white shadow-sm text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 rounded-md transition-colors ${
                        viewMode === "list" 
                          ? "bg-white shadow-sm text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count & Active Filters */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{filteredProducts.length}</span> бүтээгдэхүүн олдлоо
                {categoryParam && (
                  <span className="ml-2 text-blue-600">
                    ({getCurrentCategoryName()} ангилалд)
                  </span>
                )}
              </p>
            </div>
            
            {/* Product Grid */}
            <div className={`grid gap-4 sm:gap-2 lg:gap-4 auto-rows-fr items-center ${
              viewMode === "grid" 
                ? `grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4` 
                : "grid-cols-1"
            }`}>
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 ">Бүтээгдэхүүн олдсонгүй</h3>
                  <p className="text-gray-500 mb-4">Өөр шүүлт эсвэл хайлтын үг ашиглаж үзнэ үү</p>
                </div>
              ) : (
                filteredProducts.map((product, idx) => (
                  <div key={product.id || product._id || idx}  className={` w-full flex ${viewMode === "list" ? "flex-row" : "flex-col"} items-center md:items-center lg:items-stretch 5xl:items-stretch`}>
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}