import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ProductCard from '../Components/ProductCArd';
import Skleton from './Skleton';
import { FiSearch, FiFilter, FiSliders, FiPackage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0); 
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(9); 
    const [category, setCategory] = useState("All");
    const { loading, setLoading } = use(AuthContext);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000); // Set a high default
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState("newest"); // price-asc, price-desc, newest
    
    const categories = ["All", "Industrial", "Consumer", "Technology", "Logistics", "Raw Materials"];

    //console.log(products);
    

    // SAFE PAGINATION CALCULATION
    const validCount = Math.max(0, count || 0);
    const numberOfPages = Math.ceil(validCount / itemsPerPage);
    const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];

    useEffect(() => {
        setLoading(true);
        // Added price, rating, and sort to the fetch URL
        const url = `https://import-export-server.vercel.app/products?page=${currentPage}&size=${itemsPerPage}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&minRating=${minRating}&sort=${sortOrder}`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.result || []);
                setCount(data.count || 0);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [currentPage, category, itemsPerPage, minPrice, maxPrice, minRating, sortOrder, setLoading]);
    const handleCategoryChange = (cat) => {
        setCategory(cat);
        setCurrentPage(0); // Reset to first page when changing category
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const search_text = e.target.search.value;
        setLoading(true);
        fetch(`https://import-export-server.vercel.app/search?search=${search_text}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data || []);
                setCount(data?.length || 0);
                setLoading(false);
            });
    };

    return (
        <div className="bg-[var(--color-primary)] min-h-screen pt-28 pb-20 transition-colors duration-500">
            <title>Global Inventory | HUB.</title>

            <div className="container mx-auto px-4 lg:px-10">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--color-accent)]/10 pb-8 gap-6">
                    <div>
                        <p className="text-[var(--color-secondary)] font-black text-[10px] tracking-[0.4em] uppercase mb-2 flex items-center gap-2">
                            <FiPackage /> Logistics Management
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-accent)] uppercase tracking-tighter leading-none">
                            All <span className="text-[var(--color-secondary)]">Products</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSearch} className="flex w-full md:w-96 group">
                        <div className="relative w-full">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-accent)]/40" />
                            <input 
                                type="search" 
                                name="search" 
                                placeholder="Search cargo..." 
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 border border-[var(--color-accent)]/10 focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)] text-xs font-bold uppercase" 
                            />
                        </div>
                        <button className="bg-[var(--color-secondary)] text-white px-8 font-black text-[10px] uppercase">
                            Query
                        </button>
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* --- SIDEBAR --- */}
                    
                        {/* Sort Order */}
                        
                    
                    <aside className="lg:w-64 space-y-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                <FiSliders className="text-[var(--color-secondary)]" /> Sort Configuration
                            </h3>
                            <select 
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-[10px] font-bold uppercase focus:border-[var(--color-secondary)] outline-none"
                            >
                                <option value="newest">Latest Shipment</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                        
                        <div>
                            <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6">
                                <FiFilter className="text-[var(--color-secondary)]" /> Trade Categories
                            </h3>
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all border ${
                                            category === cat 
                                            ? "bg-[var(--color-secondary)] text-white border-[var(--color-secondary)]" 
                                            : "bg-transparent text-[var(--color-accent)]/60 border-transparent hover:border-[var(--color-accent)]/10"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Price Range Filter */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Price Valuation ($)</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input 
                                    type="number" placeholder="Min" 
                                    onChange={(e) => setMinPrice(e.target.value || 0)}
                                    className="w-full bg-[var(--color-accent)]/5 border p-2 text-[10px] outline-none" 
                                />
                                <input 
                                    type="number" placeholder="Max" 
                                    onChange={(e) => setMaxPrice(e.target.value || 100000)}
                                    className="w-full bg-[var(--color-accent)]/5 border p-2 text-[10px] outline-none" 
                                />
                            </div>
                        </div>

                        {/* Minimum Rating Filter */}
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">Min Trust Rating</h3>
                            <input 
                                type="range" min="0" max="5" step="0.5" 
                                value={minRating}
                                onChange={(e) => setMinRating(e.target.value)}
                                className="w-full accent-[var(--color-secondary)]"
                            />
                            <p className="text-[9px] font-bold opacity-50 mt-1">{minRating}+ Rating</p>
                        </div>
                    
                    </aside>
                    

                    {/* --- MAIN GRID --- */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-8 bg-white dark:bg-black/10 p-4 border border-[var(--color-accent)]/5">
                            <p className="text-[10px] font-black text-[var(--color-accent)]/40 uppercase tracking-widest">
                                Total Assets: {count} | Page {currentPage + 1} of {numberOfPages || 1}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[400px]">
                            {loading ? (
                                <Skleton count={6} />
                            ) : products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard basePath="/products" key={product._id} products={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center opacity-40 font-black uppercase tracking-widest">
                                    No Trade Assets Found in this Sector
                                </div>
                            )}
                        </div>

                        {/* --- PAGINATION CONTROLS --- */}
                        {numberOfPages > 1 && (
                            <div className="mt-16 flex items-center justify-center gap-2">
                                <button 
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="p-4 border border-[var(--color-accent)]/10 hover:bg-[var(--color-secondary)] hover:text-white disabled:opacity-20 transition-all"
                                >
                                    <FiChevronLeft />
                                </button>
                                
                                {pages.map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-12 h-12 text-[10px] font-black transition-all border ${
                                            currentPage === page 
                                            ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" 
                                            : "border-[var(--color-accent)]/10 hover:border-[var(--color-secondary)]"
                                        }`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}

                                <button 
                                    disabled={currentPage >= numberOfPages - 1}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="p-4 border border-[var(--color-accent)]/10 hover:bg-[var(--color-secondary)] hover:text-white disabled:opacity-20 transition-all"
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;