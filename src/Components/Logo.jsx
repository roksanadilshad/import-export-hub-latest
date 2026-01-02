import React from 'react';
import { FaGlobe } from 'react-icons/fa6';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-[var(--color-secondary)] group-hover:rotate-12 transition-transform duration-300 shadow-lg">
              <FaGlobe className="text-white text-xl" />
            </div>
            <h3 className="text-lg lg:text-2xl font-black tracking-tighter text-[var(--color-accent)] uppercase">
              HUB<span className="text-[var(--color-secondary)]">.</span>
            </h3>
          </Link>
        </div>
    );
};

export default Logo;