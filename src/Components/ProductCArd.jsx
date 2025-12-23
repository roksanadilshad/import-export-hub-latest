import React from 'react';
import { FaEarthAmericas, FaHeart, FaBox } from 'react-icons/fa6';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';
import RatingStars from '../Pages/RatingStars';

const ProductCard = ({ products }) => {
    const {
        productImage,
        productName,
        _id,
        price,
        originCountry,
        rating,
        availableQuantity,
    } = products;

    return (
        <div className="group relative bg-[var(--color-primary)] border border-[var(--color-accent)]/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-[var(--color-secondary)]">
            {/* --- IMAGE SECTION --- */}
            <div className="relative h-72 overflow-hidden bg-[var(--color-neutral)]/10">
                <img
                    src={productImage}
                    alt={productName}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-[var(--color-secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Top Action Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-[var(--color-primary)]/90 backdrop-blur-md p-2 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer shadow-sm">
                        <FiShoppingCart size={18} />
                    </div>
                </div>

                <div className="absolute top-4 right-4">
                    <div className="bg-[var(--color-primary)]/90 backdrop-blur-md p-2 text-[var(--color-secondary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors cursor-pointer shadow-sm">
                        <FaHeart size={18} />
                    </div>
                </div>

                {/* Origin Label - Industrial Style */}
                <div className="absolute bottom-0 left-0 bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-1 text-[10px] font-black tracking-[0.2em] uppercase">
                    {originCountry}
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-black text-[var(--color-accent)] leading-tight uppercase tracking-tighter truncate w-full">
                        {productName}
                    </h2>
                </div>

                {/* Technical Specs Row */}
                <div className="grid grid-cols-2 border-y border-[var(--color-accent)]/10 py-4 mb-6">
                    <div className="border-r border-[var(--color-accent)]/10 pr-4">
                        <p className="text-[10px] text-[var(--color-accent)]/50 uppercase font-bold tracking-widest mb-1">Unit Price</p>
                        <p className="text-xl font-mono font-bold text-[var(--color-secondary)]">${price}</p>
                    </div>
                    <div className="pl-4">
                        <p className="text-[10px] text-[var(--color-accent)]/50 uppercase font-bold tracking-widest mb-1">Stock Level</p>
                        <p className="text-sm font-bold text-[var(--color-accent)] flex items-center gap-2">
                            <FaBox className="text-[var(--color-secondary)] text-xs" /> {availableQuantity} Units
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                         <RatingStars rate={rating} />
                         <span className="text-[10px] font-bold text-[var(--color-accent)]/40 font-mono mt-1">({rating})</span>
                    </div>
                </div>

                {/* Primary Action */}
                <Link 
                    to={`/productDetails/${_id}`} 
                    className="relative flex items-center justify-center w-full py-4 bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-black text-xs tracking-[0.3em] uppercase group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-all duration-300"
                >
                    Inquiry Details <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;