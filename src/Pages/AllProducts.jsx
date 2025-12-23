import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import ProductCard from '../Components/ProductCArd';
import Skleton from './Skleton';
import { FiSearch, FiFilter, FiSliders, FiPackage } from 'react-icons/fi';

const AllProducts = () => {
    const data = useLoaderData();
    const [products, setProducts] = useState(data);
    const [sortBy, setSortBy] = useState("");
    const [category, setCategory] = useState("All");
    const { loading, setLoading } = use(AuthContext);

    // List of industrial categories
    const categories = ["All", "Industrial", "Consumer", "Technology", "Logistics", "Raw Materials"];

    const handleSearch = (e) => {
        e.preventDefault();
        const search_text = e.target.search.value;
        setLoading(true);

        fetch(`https://import-export-server.vercel.app/search?search=${search_text}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    };

    // Professional Sort Logic
    const handleSort = (type) => {
        setSortBy(type);
        const sorted = [...products].sort((a, b) => {
            if (type === "price-low") return a.price - b.price;
            if (type === "price-high") return b.price - a.price;
            if (type === "rating") return b.rating - a.rating;
            return 0;
        });
        setProducts(sorted);
    };

    return (
        <div className="bg-[var(--color-primary)] min-h-screen pt-28 pb-20 transition-colors duration-500">
            <title>Global Inventory | HUB.</title>

            <div className="container mx-auto px-4 lg:px-10">
                {/* --- TOP TERMINAL HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--color-accent)]/10 pb-8 gap-6">
                    <div>
                        <p className="text-[var(--color-secondary)] font-black text-[10px] tracking-[0.4em] uppercase mb-2 flex items-center gap-2">
                            <FiPackage /> Logistics Management
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-accent)] uppercase tracking-tighter leading-none">
                            All <span className="text-[var(--color-secondary)]">Products</span>
                        </h1>
                    </div>

                    {/* PROFESSIONAL SEARCH FORM */}
                    <form onSubmit={handleSearch} className="flex w-full md:w-96 group">
                        <div className="relative w-full">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-accent)]/40 group-focus-within:text-[var(--color-secondary)] transition-colors" />
                            <input 
                                type="search" 
                                name="search" 
                                placeholder="Search cargo by name or ID..." 
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 border border-[var(--color-accent)]/10 focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest transition-all" 
                            />
                        </div>
                        <button className="bg-[var(--color-secondary)] text-white px-8 font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[var(--color-secondary)]/20">
                            {loading ? "..." : "Query"}
                        </button>
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* --- SIDEBAR FILTERS --- */}
                    <aside className="lg:w-64 space-y-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6">
                                <FiFilter className="text-[var(--color-secondary)]" /> Trade Categories
                            </h3>
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        onClick={() => setCategory(cat)}
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

                        <div className="p-6 bg-[var(--color-accent)] text-[var(--color-primary)]">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">Global Reach</p>
                            <p className="text-sm font-bold leading-tight">Access 50,000+ Trade Verified Suppliers</p>
                        </div>
                    </aside>

                    {/* --- MAIN GRID & SORT CONTROL --- */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-8 bg-white dark:bg-black/10 p-4 border border-[var(--color-accent)]/5">
                            <p className="text-[10px] font-black text-[var(--color-accent)]/40 uppercase tracking-widest">
                                Showing {products.length} Results
                            </p>
                            <div className="flex items-center gap-4">
                                <FiSliders className="text-[var(--color-secondary)]" />
                                <select 
                                    onChange={(e) => handleSort(e.target.value)}
                                    className="bg-transparent text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] focus:outline-none cursor-pointer"
                                >
                                    <option value="">Sort By: Default</option>
                                    <option value="price-low">Valuation: Low to High</option>
                                    <option value="price-high">Valuation: High to Low</option>
                                    <option value="rating">Trust Rating: Highest</option>
                                </select>
                            </div>
                        </div>

                        {/* PRODUCT GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {loading ? (
                                <Skleton count={6} />
                            ) : (
                                products.map((product) => (
                                    <ProductCard basePath="/products" key={product._id} products={product} />
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;