import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ImportCard from "../Components/ImportCard";
import Skleton from "./Skleton";
import { FaDownload, FaHistory, FaBoxes } from "react-icons/fa";

const MyImports = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!user?.accessToken) return;

        fetch(`https://import-export-server.vercel.app/my-imports?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const margeProduct = [];

                data.forEach((importItem) => {
                    const existing = margeProduct.find(
                        (p) => p.productId === importItem.productId
                    );
                    if (existing) {
                        existing.importedQuantity += importItem.quantity || 0;
                    } else {
                        margeProduct.push({ ...importItem, importedQuantity: importItem.quantity });
                    }
                });
                setProducts(margeProduct);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching imports:", err);
                setLoading(false);
            });
    }, [user, setLoading]);

    // Financial calculations for the header stats
    const totalAssets = products.length;
    const totalVolume = products.reduce((acc, curr) => acc + (curr.importedQuantity || 0), 0);

    if (loading) {
        return <div className="bg-[var(--color-primary)] min-h-screen pt-32 px-10"><Skleton count={6} /></div>;
    }

    return (
        <div className="bg-[var(--color-primary)] min-h-screen pt-28 pb-20 transition-colors duration-500">
            <title>Import Manifest | HUB.</title>

            <div className="container mx-auto px-4 lg:px-10">
                {/* --- LOGISTICS HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--color-accent)]/10 pb-8 gap-6">
                    <div>
                        <p className="text-[var(--color-secondary)] font-black text-[10px] tracking-[0.4em] uppercase mb-2 flex items-center gap-2">
                            <FaHistory /> Procurement History
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-accent)] uppercase tracking-tighter leading-none">
                            Import <span className="text-[var(--color-secondary)]">Manifest</span>
                        </h1>
                    </div>

                    {/* MANIFEST STATS */}
                    <div className="flex gap-6 items-center">
                        <div className="text-right">
                            <p className="text-[9px] font-black text-[var(--color-accent)]/40 uppercase tracking-widest">Total SKU</p>
                            <p className="text-2xl font-mono font-bold text-[var(--color-accent)]">{totalAssets}</p>
                        </div>
                        <div className="h-8 w-[1px] bg-[var(--color-accent)]/10"></div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-[var(--color-accent)]/40 uppercase tracking-widest">Gross Volume</p>
                            <p className="text-2xl font-mono font-bold text-[var(--color-secondary)]">{totalVolume} <span className="text-xs">U</span></p>
                        </div>
                        <button className="ml-4 p-4 bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-all shadow-xl">
                            <FaDownload size={14} />
                        </button>
                    </div>
                </div>

                {/* --- MANIFEST GRID --- */}
                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-40 bg-[var(--color-accent)]/5 border border-dashed border-[var(--color-accent)]/10">
                        <FaBoxes className="text-6xl text-[var(--color-accent)]/10 mb-6" />
                        <h3 className="text-xl font-black text-[var(--color-accent)] uppercase tracking-tighter">Manifest Empty</h3>
                        <p className="text-[10px] font-bold text-[var(--color-accent)]/40 uppercase tracking-widest mt-2">No incoming trade assets detected.</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {products.map((item) => (
                            <ImportCard 
                                key={item._id} 
                                setProducts={setProducts} 
                                products={item} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyImports;