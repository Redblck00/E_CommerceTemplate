"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import CartSlider from "../cart/cartSlider";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaLaptop,
  FaCamera,
  FaHome,
  FaTv,
  FaPrint,
  FaGamepad,
  FaTimes,
  FaUserCircle,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useService } from "@/context/ServerContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const { cartItems, toggleCart, isCartOpen } = useCart();
  const { categories, isLoading, user, logout, products } = useService();
  const [cartItem, setCartItems] = useState([]);
  
  const menuItems = categories.map((cat) => ({
    icon: FaLaptop,
    text: cat.name,
    _id: cat._id,
  }));

  // Determine how many categories to show based on screen size
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Search dropdown click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSearchBar && !e.target.closest(".search-dropdown")) {
        setShowSearchBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchBar]);

  // Responsive categories handler
  useEffect(() => {
    const updateVisibleCategories = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleCategories(7);
      } else if (width >= 1024) {
        setVisibleCategories(6);
      } else if (width >= 768) {
        setVisibleCategories(4);
      } else {
        setVisibleCategories(0); // Mobile - all hidden in main nav
      }
      setShowDropdown(menuItems.length > visibleCategories);
    };

    updateVisibleCategories();
    window.addEventListener('resize', updateVisibleCategories);
    return () => window.removeEventListener('resize', updateVisibleCategories);
  }, [menuItems.length, visibleCategories]);

  // Close mobile menu and categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
      if (isCategoriesDropdownOpen && !e.target.closest(".categories-dropdown")) {
        setIsCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isCategoriesDropdownOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const displayedCategories = menuItems.slice(0, visibleCategories);
  const hiddenCategories = menuItems.slice(visibleCategories);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-serif">
      <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-4 lg:pt-2">
        <div className="flex justify-between items-center h-20">
          {/* Left Side - Logo/Brand */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">Shop</span>
          </Link>

          {/* Center - Categories (Desktop) */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-1 justify-center max-w-4xl mx-4">
            {displayedCategories.map((cate, index) => (
              <Link
                key={index}
                href={"/shop?category=" + cate._id}
                className="text-gray-900 hover:text-black text-sm font-medium transition-colors duration-200 py-4 hover:border-b-2 hover:border-red-900 whitespace-nowrap"
              >
                {cate.text}
              </Link>
            ))}
            
            {/* More Categories Dropdown */}
            {hiddenCategories.length > 0 && (
              <div className="relative categories-dropdown">
                <button
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  className="flex items-center text-gray-900 hover:text-black text-sm font-medium transition-colors duration-200 py-4 hover:border-b-2 hover:border-red-900"
                >
                  More
                  <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-2">
                      {hiddenCategories.map((cate, index) => (
                        <Link
                          key={index}
                          href={"/shop?category=" + cate._id}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                        >
                          {cate.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setShowSearchBar((prev) => !prev)}>
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link 
              href="/wishlist" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiHeart className="w-5 h-5" />
            </Link>

            {/* Cart Icon */}
            <button 
              onClick={toggleCart}
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Login/User */}
            {user ? (
              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiUser className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/user/login"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      
      {showSearchBar && (
  <div className="search-dropdown absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
    <div className="max-w-8xl mx-auto px-4 py-4">
      <div className="flex items-center justify-center w-full">
        <div className="relative max-w-[800px] w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
              {products
                .filter(product => 
                  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.description?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5)
                .map(product => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setShowSearchBar(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.images || '/images/device1.jpg'} 
                        alt="product image"
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              {products.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <p className="px-4 py-3 text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
      {/* Mobile Menu */}
      <div
        className={`mobile-menu-container fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-medium text-gray-900">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="overflow-y-auto h-full pb-20">
            {/* Categories */}
            <div className="py-2">
              <Link
                href="/shop"
                className="block px-4 py-3 text-gray-900 hover:text-black hover:bg-gray-50 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={"/shop?category=" + item._id}
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Actions */}
            <div className="py-2">
              <Link
                href="/wishlist"
                className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiHeart className="w-5 h-5 mr-3" />
                Wishlist
              </Link>

              <button
                onClick={() => {
                  toggleCart();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <FiShoppingCart className="w-5 h-5 mr-3" />
                Cart ({cartItems.length})
              </button>

              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="w-5 h-5 mr-3" />
                  Profile
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="w-5 h-5 mr-3" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Slider */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleCart} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isCartOpen && <CartSlider />}
      </div>
      
    </header>
  );
}