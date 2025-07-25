"use client"
import { useState, useRef,useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import ProductCard from "./ProductCard.jsx"

// Main Horizontal Scroll Container
export default function HorizontalProductScroll({ products, title = "Products" }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Calculate how many cards to scroll and their width
    const getScrollParams = () => {
        const container = scrollContainerRef.current;
        if (!container) return { cardWidth: 280, cardsToScroll: 1 };

        // Get the actual card width including gap
        const firstCard = container.querySelector('.product-card');
        if (!firstCard) return { cardWidth: 320, cardsToScroll: 1 };

        // Get computed style to get the exact gap value
        const containerStyle = window.getComputedStyle(container);
        const gap = parseFloat(containerStyle.gap) || 20; // fallback to 20px if gap not found
        
        const cardWidth = firstCard.offsetWidth + gap;

        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return { cardWidth, cardsToScroll: 1 }; // Mobile: scroll 1 card
            if (window.innerWidth < 1024) return { cardWidth, cardsToScroll: 2 }; // Tablet: scroll 2 cards
            return { cardWidth, cardsToScroll: 3 }; // Desktop: scroll 3 cards
        }
        return { cardWidth, cardsToScroll: 1 };
    };

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { cardWidth, cardsToScroll } = getScrollParams();
        const scrollDistance = cardWidth * cardsToScroll;
        const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollDistance : scrollDistance);
        
        container.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 1
        );
    };

    // Initialize scroll state on mount
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            handleScroll();
        }
    }, [products]);

    return (
        <div className="container relative w-full">
            {/* Section Title */}
            <div className="flex items-center justify-end mb-6">
                {/* Navigation Buttons - Hidden on mobile */}
                <div className="hidden md:flex space-x-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded-full border transition-colors ${
                            canScrollLeft
                                ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <FaChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`p-2 rounded-full border transition-colors ${
                            canScrollRight
                                ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <FaChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                    {products?.map((product, index) => (
                        <div key={product.id || index} className="product-card snap-start flex-shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation Dots */}
                <div className="flex justify-center mt-4 md:hidden">
                    <div className="flex space-x-2">
                        {Array.from({ length: Math.ceil(products?.length / 1) }).map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 rounded-full bg-gray-300"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}