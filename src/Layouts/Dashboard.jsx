import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { FiUser, FiGrid, FiPlusSquare, FiPackage, FiArrowLeft } from 'react-icons/fi';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-[var(--color-primary)] text-[var(--color-accent)] transition-colors duration-500">
            {/* SIDEBAR */}
            <aside className="w-72 border-r border-[var(--color-accent)]/10 bg-[var(--color-primary)] flex flex-col p-6 shadow-2xl z-20">
                <NavLink to={'/'} className="mb-10 px-4">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic text-[var(--color-accent)]">
                        HUB <span className="text-[var(--color-secondary)]">CORE</span>
                    </h2>
                    <div className="h-[2px] w-8 bg-[var(--color-secondary)] mt-1"></div>
                </NavLink>

                <nav className="flex-1 space-y-2">
                    <Link 
                        to="/dashboard/dashboardHome" 
                        className="flex items-center gap-3 p-4 hover:bg-[var(--color-accent)]/5 text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-[var(--color-accent)]/10 transition-all group"
                    >
                        <FiGrid className="text-[var(--color-secondary)] group-hover:scale-110 transition-transform" /> 
                        <span>Overview</span>
                    </Link>
                    
                    <Link 
                        to="/dashboard/addExport" 
                        className="flex items-center gap-3 p-4 hover:bg-[var(--color-accent)]/5 text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-[var(--color-accent)]/10 transition-all group"
                    >
                        <FiPlusSquare className="text-[var(--color-secondary)] group-hover:scale-110 transition-transform" /> 
                        <span>Register Export</span>
                    </Link>
                    
                    <Link 
                        to="/dashboard/my-exports" 
                        className="flex items-center gap-3 p-4 hover:bg-[var(--color-accent)]/5 text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-[var(--color-accent)]/10 transition-all group"
                    >
                        <FiPackage className="text-[var(--color-secondary)] group-hover:scale-110 transition-transform" /> 
                        <span>Active Assets</span>
                    </Link>
                    
                    <Link 
                        to="/dashboard/profile" 
                        className="flex items-center gap-3 p-4 hover:bg-[var(--color-accent)]/5 text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-[var(--color-accent)]/10 transition-all group"
                    >
                        <FiUser className="text-[var(--color-secondary)] group-hover:scale-110 transition-transform" /> 
                        <span>Profile Node</span>
                    </Link>
                </nav>

                <Link 
                    to="/" 
                    className="p-4 text-[10px] font-black uppercase opacity-40 hover:opacity-100 flex items-center gap-2 transition-opacity"
                >
                    <FiArrowLeft /> Back to Terminal
                </Link>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-primary)]">
                {/* TOP HEADER */}
                <header className="h-20 border-b border-[var(--color-accent)]/10 flex items-center justify-between px-10 bg-[var(--color-primary)]/50 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-[var(--color-accent)] opacity-40">
                            Secure Connection: Established
                        </span>
                    </div>
                    
                    {/* Placeholder for User Profile Dropdown */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-[var(--color-accent)] leading-none uppercase">System Operator</p>
                            <p className="text-[8px] font-bold text-[var(--color-secondary)] uppercase tracking-tighter">Active session</p>
                        </div>
                        <div className="w-10 h-10 border border-[var(--color-secondary)] p-1">
                            <div className="w-full h-full bg-[var(--color-accent)]/10"></div>
                        </div>
                    </div>
                </header>

                {/* DYNAMIC CONTENT WRAPPER */}
                <main className="flex-1 overflow-y-auto p-10 relative">
                    {/* Subtle Radial Gradient for Depth */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--color-secondary)_0%,_transparent_25%)] opacity-[0.03]"></div>
                    
                    <div className="relative z-10">
                        <Outlet /> 
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;