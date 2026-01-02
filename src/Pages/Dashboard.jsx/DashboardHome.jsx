import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DashboardHome = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch real count per category from your backend
        fetch('https://import-export-server.vercel.app/category-stats')
            .then(res => res.json())
            .then(data => setChartData(data))
            .catch(err => console.error("Chart fetch error:", err));
    }, []);

    return (
        <div className="space-y-10">
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Exports", val: "1.2k" },
                    { label: "Global Reach", val: "42 Countries" },
                    { label: "System Trust", val: "99.9%" }
                ].map((s, i) => (
                    <div 
                        key={i} 
                        className="p-8 border border-[var(--color-accent)]/10 bg-[var(--color-accent)]/5 backdrop-blur-sm relative overflow-hidden group transition-all hover:border-[var(--color-secondary)]/30"
                    >
                        {/* Interactive Accent Line */}
                        <div className="absolute top-0 right-0 w-1 h-full bg-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-all"></div>
                        
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60 mb-2">
                            {s.label}
                        </p>
                        <p className="text-4xl font-black italic tracking-tighter text-[var(--color-accent)]">
                            {i === 0 ? <span className="text-[var(--color-secondary)]">{s.val}</span> : s.val}
                        </p>
                    </div>
                ))}
            </div>

            {/* BAR CHART CONTAINER */}
            <div className="h-[450px] w-full border border-[var(--color-accent)]/10 bg-[var(--color-accent)]/5 p-8 backdrop-blur-md">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)] opacity-80">
                        Inventory Distribution by Sector
                    </h3>
                    <div className="flex gap-2">
                        <span className="w-3 h-3 bg-[var(--color-secondary)]"></span>
                        <span className="text-[9px] font-bold uppercase text-[var(--color-accent)] opacity-40">Live Metrics</span>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="var(--color-accent)" 
                            vertical={false} 
                            opacity={0.1} 
                        />
                        <XAxis 
                            dataKey="category" 
                            stroke="var(--color-accent)" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            dy={10}
                            style={{ fontWeight: '900', textTransform: 'uppercase', opacity: 0.5 }}
                        />
                        <YAxis 
                            stroke="var(--color-accent)" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            opacity={0.5}
                        />
                        <Tooltip 
                            cursor={{ fill: 'var(--color-secondary)', opacity: 0.05 }} 
                            contentStyle={{ 
                                background: 'var(--color-primary)', 
                                border: '1px solid var(--color-accent)', 
                                fontSize: '10px', 
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                color: 'var(--color-accent)'
                            }} 
                            itemStyle={{ color: 'var(--color-secondary)' }}
                        />
                        <Bar 
                            dataKey="count" 
                            fill="var(--color-secondary)" 
                            barSize={30} 
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardHome;