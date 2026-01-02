import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { FiUser, FiGrid, FiPlusSquare, FiPackage, FiArrowLeft, FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi';
import Logo from '../Components/Logo';

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    // Dynamic style for NavLinks
    const navLinkStyles = ({ isActive }) => `
        flex items-center gap-3 p-4 transition-all duration-300 group border-l-4
        ${isActive 
            ? 'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)] text-[var(--color-secondary)]' 
            : 'border-transparent text-[var(--color-accent)] opacity-60 hover:opacity-100 hover:bg-[var(--color-accent)]/5'
        }
        ${isCollapsed ? 'justify-center px-0' : 'px-6'}
    `;

    return (
        <div className="flex h-screen bg-[var(--color-primary)] text-[var(--color-accent)] transition-all duration-500">
            
            {/* SIDEBAR SLIDER */}
            <aside className={`
                relative border-r border-[var(--color-accent)]/10 bg-[var(--color-primary)] 
                flex flex-col shadow-2xl z-20 transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-20' : 'w-72'}
            `}>
                
                {/* TOGGLE BUTTON */}
                <button 
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-10 bg-[var(--color-secondary)] text-white rounded-full p-1 shadow-lg z-30 hover:scale-110 transition-transform"
                >
                    {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
                </button>

                {/* LOGO AREA */}
                <div className="mb-10 mt-8 px-6 overflow-hidden whitespace-nowrap">
                    <h2 className={`font-black tracking-tighter uppercase italic transition-all duration-300 ${isCollapsed ? 'text-xs text-center' : 'text-xl'}`}>
                        <Logo/><span className="text-[var(--color-secondary)]"></span>{ !isCollapsed && 'CORE' }
                    </h2>
                    {!isCollapsed && <div className="h-[2px] w-8 bg-[var(--color-secondary)] mt-1"></div>}
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
                    <NavLink to="/dashboard/dashboardHome" className={navLinkStyles}>
                        <FiGrid className="text-lg min-w-[20px]" /> 
                        {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Overview</span>}
                    </NavLink>
                    
                    <NavLink to="/dashboard/myImports" className={navLinkStyles}>
                        <FiDownload className="text-lg min-w-[20px]" /> 
                        {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">My Imports</span>}
                    </NavLink>

                    <NavLink to="/dashboard/addExport" className={navLinkStyles}>
                        <FiPlusSquare className="text-lg min-w-[20px]" /> 
                        {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Register Export</span>}
                    </NavLink>
                    
                    <NavLink to="/dashboard/my-exports" className={navLinkStyles}>
                        <FiPackage className="text-lg min-w-[20px]" /> 
                        {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Active Assets</span>}
                    </NavLink>
                    
                    <NavLink to="/dashboard/profile" className={navLinkStyles}>
                        <FiUser className="text-lg min-w-[20px]" /> 
                        {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Profile Node</span>}
                    </NavLink>
                </nav>

                {/* BOTTOM ACTION */}
                <Link 
                    to="/" 
                    className={`p-6 text-[10px] font-black uppercase opacity-40 hover:opacity-100 flex items-center transition-all ${isCollapsed ? 'justify-center' : 'gap-2'}`}
                >
                    <FiArrowLeft className="text-lg" /> 
                    {!isCollapsed && <span>Exit Core</span>}
                </Link>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* TOP HEADER */}
                <header className="h-20 border-b border-[var(--color-accent)]/10 flex items-center justify-between px-10 bg-[var(--color-primary)]/50 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-[var(--color-accent)] opacity-40">
                            Node: {window.location.pathname.split('/').pop()} // Established
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-[var(--color-accent)] leading-none uppercase">System Operator</p>
                            <p className="text-[8px] font-bold text-[var(--color-secondary)] uppercase tracking-tighter">Authorized</p>
                        </div>
                        <div className="w-10 h-10 border border-[var(--color-secondary)]/30 p-1 rounded-sm">
                            <div className="w-full h-full bg-[var(--color-accent)]/5 flex items-center justify-center">
                                <FiUser className="opacity-20" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--color-secondary)_0%,_transparent_20%)] opacity-[0.05]"></div>
                    <div className="relative z-10">
                        <Outlet /> 
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;