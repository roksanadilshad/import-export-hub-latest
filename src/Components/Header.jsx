import React, { useState, useEffect, useContext } from 'react'; // Changed 'use' to 'useContext' for standard compatibility
import { Link, NavLink } from 'react-router-dom'; // Ensure correct router-dom import
import { AuthContext } from '../Context/AuthContext';
import { FaGlobe, FaBars } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

const Header = () => {
  // Pull 'loading' from context if you have it to prevent flicker/crashes
  const { user, signOutUser, loading } = useContext(AuthContext); 
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const [scrolled, setScrolled] = useState(false);

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

  const navItemStyles = ({ isActive }) => 
    `relative px-3 py-2 transition-all duration-300 hover:text-[var(--color-secondary)] lg:text-[12px] xl:text-[14px] font-black uppercase tracking-[0.2em] ${
      isActive 
      ? 'text-[var(--color-secondary)] after:w-full' 
      : 'text-[var(--color-accent)] opacity-70 after:w-0'
    } after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[var(--color-secondary)] after:transition-all`;

  const links = (
    <>
      <li><NavLink to="/" className={navItemStyles}>Home</NavLink></li>
      <li><NavLink to="/allProducts" className={navItemStyles}>Inventory</NavLink></li>
      {user && ( // Only show these if user is logged in
        <>
          <li><NavLink to="/my-exports" className={navItemStyles}>My Exports</NavLink></li>
          <li><NavLink to="/myImports" className={navItemStyles}>My Imports</NavLink></li>
          <li><NavLink to="/addExport" className={navItemStyles}>Add Export</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
      ? 'bg-[var(--color-primary)]/90 backdrop-blur-xl py-2 border-b border-[var(--color-accent)]/5 shadow-xl' 
      : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 lg:px-10 flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <FaBars className="text-xl text-[var(--color-accent)]" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-[var(--color-primary)] border border-[var(--color-accent)]/10 rounded-none w-64 space-y-2">
              {links}
            </ul>
          </div>
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-[var(--color-secondary)] group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <FaGlobe className="text-white text-xl" />
            </div>
            <h3 className="text-lg lg:text-2xl font-black tracking-tighter text-[var(--color-accent)] uppercase">
              HUB<span className="text-[var(--color-secondary)]">.</span>
            </h3>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="flex items-center gap-2">
            {links}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
             <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              checked={theme === "dark"}
              className="toggle border-[var(--color-secondary)] bg-[var(--color-secondary)] [--tglbg:var(--color-primary)] checked:bg-[var(--color-neutral)]"
            />
          </div>

          <div className="h-6 w-[1px] bg-[var(--color-accent)]/20 mx-2 hidden md:block"></div>

          {/* Conditional rendering based on user AND loading state */}
          {!loading && (
            user ? (
              <div className="flex items-center gap-4">
                <div className="avatar tooltip tooltip-bottom" data-tip={user?.displayName || "Operator"}>
                  <div className="w-10 h-10 rounded-full ring-2 ring-[var(--color-secondary)] ring-offset-2 ring-offset-[var(--color-primary)] overflow-hidden">
                    <img 
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=random`} 
                      alt="User" 
                    />
                  </div>
                </div>
                <button 
                  onClick={() => signOutUser()}
                  className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  Logout <HiOutlineLogout className="text-lg" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)]">
                  Login
                </Link>
                <Link to="/register" className="btn bg-[var(--color-secondary)] border-none hover:brightness-125 btn-sm px-6 rounded-none text-[10px] font-black uppercase tracking-widest text-white">
                  Join Now
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;