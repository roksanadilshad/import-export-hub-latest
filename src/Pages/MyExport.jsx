import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import ExportCard from '../Components/ExportCard';
import Skleton from './Skleton';
import { FaBoxOpen, FaChartLine, FaShip } from 'react-icons/fa';

const MyExport = () => {
    const { user } = use(AuthContext);
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://import-export-server.vercel.app/my-exports?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setproducts(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [user]);

    // Derived stats for the professional look
    const totalValue = products.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0).toLocaleString();

    if (loading) {
        return (
            <div className="bg-[var(--color-primary)] min-h-screen pt-32 px-10">
                <Skleton count={6} />
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-primary)] min-h-screen pt-28 pb-20 transition-colors duration-500">
            <title>My Export Portfolio | HUB.</title>

            <div className="container mx-auto px-4 lg:px-10">
                {/* --- DASHBOARD HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--color-accent)]/10 pb-8 gap-6">
                    <div>
                        <p className="text-[var(--color-secondary)] font-black text-[10px] tracking-[0.4em] uppercase mb-2">
                            Supplier Terminal
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-accent)] uppercase tracking-tighter leading-none">
                            My Export <span className="text-[var(--color-secondary)]">Portfolio</span>
                        </h1>
                    </div>
                    
                    {/* QUICK STATS BAR */}
                    <div className="flex gap-8">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-[var(--color-accent)]/40 uppercase tracking-widest">Active Listings</p>
                            <p className="text-2xl font-mono font-bold text-[var(--color-accent)]">{products.length}</p>
                        </div>
                        <div className="w-[1px] bg-[var(--color-accent)]/10 h-10"></div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-[var(--color-accent)]/40 uppercase tracking-widest">Portfolio Value</p>
                            <p className="text-2xl font-mono font-bold text-[var(--color-secondary)]">${totalValue}</p>
                        </div>
                    </div>
                </div>

                {/* --- EMPTY STATE --- */}
                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-[var(--color-accent)]/10">
                        <FaShip className="text-6xl text-[var(--color-accent)]/10 mb-6" />
                        <h3 className="text-xl font-black text-[var(--color-accent)] uppercase tracking-tighter">No Active Exports</h3>
                        <p className="text-[10px] font-bold text-[var(--color-accent)]/40 uppercase tracking-widest mt-2">Start your trade journey by adding a new product.</p>
                    </div>
                ) : (
                    /* --- PRODUCT GRID --- */
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {products.map(item => (
                            <ExportCard 
                                key={item._id} 
                                setProducts={setproducts} 
                                products={item} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyExport;