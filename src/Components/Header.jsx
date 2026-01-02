import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { FaGlobe, FaBars, FaUserCircle, FaSignOutAlt, FaThLarge } from 'react-icons/fa';

const Header = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    signOutUser().then(() => navigate('/'));
  };

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
      <li><NavLink to="/about" className={navItemStyles}>About us</NavLink></li>
      <li><NavLink to="/contact" className={navItemStyles}>Contact us</NavLink></li>
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
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            checked={theme === "dark"}
            className="toggle border-[var(--color-secondary)] bg-[var(--color-secondary)] [--tglbg:var(--color-primary)] checked:bg-[var(--color-neutral)]"
          />

          <div className="h-6 w-[1px] bg-[var(--color-accent)]/20 mx-2 hidden md:block"></div>

          {!loading && (
            user ? (
              <div className="dropdown dropdown-end">
                {/* PROFILE TRIGGER */}
                <label tabIndex={0} className="cursor-pointer group">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-[var(--color-secondary)] ring-offset-2 ring-offset-[var(--color-primary)] overflow-hidden transition-all group-hover:scale-105">
                      <img
                        src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=random`}
                        alt="User"
                      />
                    </div>
                  </div>
                </label>

                {/* DASHBOARD DROPDOWN MENU */}
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-[var(--color-primary)] border border-[var(--color-accent)]/10 rounded-none w-52 space-y-1">
                  <li className="px-4 py-2 border-b border-[var(--color-accent)]/5 mb-1">
                    <p className="text-[9px] font-black uppercase opacity-40 leading-none">Identity</p>
                    <p className="text-[11px] font-black text-[var(--color-secondary)] truncate">{user?.displayName || "Operator"}</p>
                  </li>
                  
                  <li>
                    <Link to="/dashboard/dashboardHome" className="flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-secondary)] hover:text-white rounded-none">
                      <FaThLarge /> Dashboard Home
                    </Link>
                  </li>
                  
                  <li>
                    <Link to="/dashboard/profile" className="flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-secondary)] hover:text-white rounded-none">
                      <FaUserCircle /> My Profile
                    </Link>
                  </li>

                  <li>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white rounded-none transition-colors"
                    >
                      <FaSignOutAlt /> Terminate Session
                    </button>
                  </li>
                </ul>
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