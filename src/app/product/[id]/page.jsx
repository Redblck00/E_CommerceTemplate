"use client";
import { useState, useEffect } from "react";
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
import { useService } from "@/context/ServerContext";
import { api } from "@/data/api";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ params }) {
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { products, loading: serviceLoading } = useService();
  const { id } = useParams();
  const { addToCart } = useCart();

  // Find the product from the service data
  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (!serviceLoading) {
      if (!product) {
        setError("Product not found");
      }
      setLoading(false);
    }
  }, [product, serviceLoading]);

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price);
  };
  const getProductRating = () => {
    return 4.5;
  };
  

  const getFeatures = () => {
    // Mock features based on product data
    const features = [];
    if (product?.isNew) features.push("Шинэ бүтээгдхүүн");
    if (product?.isBestSeller) features.push("Эрэлттэй");
    if (product?.isSpecial) features.push("Онцгой");
    if (product?.stock > 0) features.push("Барааны тоо");
    
    return features.length > 0 ? features : ["High Quality Product", "Fast Delivery", "Warranty Included"];
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < (product?.stock || 0)) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    try {
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
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Сагсанд нэмэхэд алдаа гарлаа!");
    }
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // TODO: Implement wishlist functionality with your API
  };
  // Loading state
  if (loading || serviceLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ачаалж байна...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Бүтээгдэхүүн олдсонгүй</h2>
          <p className="text-gray-600 mb-6">Таны хайж буй бүтээгдэхүүн олдсонгүй.</p>
          <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  const rating = getProductRating();
  const features = getFeatures();

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Нүүр
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/shop" className="text-gray-500 hover:text-gray-700">
            Бүтээгдэхүүн
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-blue-600 font-medium">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={toggleWishlist}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                  } hover:scale-110 transition-all duration-200 shadow-lg`}
                >
                  <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Title & Status */}
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 flex-wrap">
                  {product.brand && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {product.brand}
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'Бэлэн байгаа' : 'Дууссан'}
                  </span>
                  {product.isNew && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      Шинэ
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      Хит бүтээгдэхүүн
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <FiStar
                        key={idx}
                        className={`w-5 h-5 ${
                          idx < Math.floor(rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-lg font-semibold text-gray-900 ml-2">
                      {rating}
                    </span>
                  </div>
                  
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-indigo-900">
                  ₮{formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₮{formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}

              {/* Key Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Онцлог шинж чанарууд:</h3>
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">Тоо ширхэг:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[50px] text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                      disabled={quantity >= product.stock}
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">({product.stock} ширхэг үлдсэн)</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 }

                    className={`flex-1 bg-indigo-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-green-400 disabled:cursor-not-allowed `}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    {product.stock > 0  ? '' : 'Дууссан'}
                    {showAddedMessage  ? (<>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 27 27">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Нэмэгдлээ!
              </>)
              : (<> Сагсанд нэмэх</>)
              }
                  </button>
                
                </div>
              </div>

              {/* Service Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiTruck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Үнэгүй хүргэлт</p>
                    <p className="text-gray-500 text-xs">100,000₮-аас дээш</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiShield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Баталгаа</p>
                    <p className="text-gray-500 text-xs">12 сарын баталгаа</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FiRefreshCw className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Буцаах</p>
                    <p className="text-gray-500 text-xs">30 хоногийн хугацаа</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === "details"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Дэлгэрэнгүй мэдээлэл
                {activeTab === "details" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
          
           
            </div>
          </div>

          <div className="p-8">
            {activeTab === "details" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description || "Энэхүү бүтээгдэхүүний талаарх дэлгэрэнгүй мэдээлэл."}
                </p>
                {product.brand && (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    <strong>Брэнд:</strong> {product.brand}
                  </p>
                )}
                {product.code && (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    <strong>Код:</strong> {product.code}
                  </p>
                )}
                {product.stock &&(<p className="text-gray-800">
                  <strong>Код:</strong>{product.stock}
                </p>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}