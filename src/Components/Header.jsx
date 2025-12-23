import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { FaLock, FaGlobe, FaBars } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

const Header = () => {
  const { user, signOutUser } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to change header opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    html.classList.toggle('dark', theme === 'dark');
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => 
          `relative px-3 py-2 transition-all duration-300 hover:text-secondary lg:text-[12px] xl:text-[16px] font-bold uppercase tracking-widest ${
            isActive ? 'text-secondary after:w-full' : 'text-primary/70 after:w-0'
          } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all`
        }>Home</NavLink>
      </li>
      <li>
        <NavLink to="/allProducts" className={({ isActive }) => 
          `relative px-3 py-2 transition-all duration-300 hover:text-secondary lg:text-[12px] xl:text-[16px] font-bold uppercase tracking-widest ${
            isActive ? 'text-secondary after:w-full' : 'text-primary/70 after:w-0'
          } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all`
        }>All Products</NavLink>
      </li>
      <li>
        <NavLink to="/my-exports" className={({ isActive }) => 
          `relative px-3 py-2 transition-all duration-300 hover:text-secondary lg:text-[12px] xl:text-[16px] font-bold uppercase tracking-widest ${
            isActive ? 'text-secondary after:w-full' : 'text-primary/70 after:w-0'
          } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all`
        }>My Exports</NavLink>
      </li>
      <li>
        <NavLink to="/myImports" className={({ isActive }) => 
          `relative px-3 py-2 transition-all duration-300 hover:text-secondary lg:text-[12px] xl:text-[16px] font-bold uppercase tracking-widest ${
            isActive ? 'text-secondary after:w-full' : 'text-primary/70 after:w-0'
          } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all`
        }>My Imports</NavLink>
      </li>
      <li>
        <NavLink to="/addExport" className={({ isActive }) => 
          `relative px-3 py-2 transition-all duration-300 hover:text-secondary lg:text-[12px] xl:text-[16px] font-bold uppercase tracking-widest ${
            isActive ? 'text-secondary after:w-full' : 'text-primary/70 after:w-0'
          } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all`
        }>Add Export</NavLink>
      </li>
    </>
);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
      ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl py-2 shadow-lg' 
      : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 lg:px-10 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaBars className="text-xl text-primary" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white dark:bg-neutral rounded-none w-64 space-y-2">
              {links}
            </ul>
          </div>
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-secondary rounded-lg group-hover:rotate-12 transition-transform duration-300">
                <FaGlobe className="text-white text-xl" />
            </div>
            <h3 className="text-lg lg:text-2xl font-black tracking-tighter text-primary dark:text-white uppercase">
              HUB<span className="text-secondary">.</span>
            </h3>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-2">
            {links}
          </ul>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="flex items-center">
             <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              checked={theme === "dark"}
              className="toggle toggle-secondary toggle-sm"
            />
          </div>

          <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt="User" />
                </div>
              </div>
              <button 
                onClick={() => signOutUser()}
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors"
              >
                Logout <HiOutlineLogout className="text-lg" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm text-xs font-bold uppercase tracking-widest text-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary btn-sm px-6 rounded-none text-xs font-bold uppercase tracking-widest text-white">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;