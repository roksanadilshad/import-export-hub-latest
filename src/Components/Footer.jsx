import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-accent)] text-[var(--color-primary)] transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* --- BRAND SECTION --- */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[var(--color-secondary)] group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <img src="https://i.ibb.co.com/QvWc04mY/t-removebg-preview.png" alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase">
                HUB<span className="text-[var(--color-secondary)]">.</span>
              </h3>
            </Link>
            <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
              The premier global trade terminal for verifiable export assets and industrial procurement.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-[var(--color-primary)]/10 hover:bg-[var(--color-secondary)] hover:border-transparent transition-all"><FaFacebookF size={14}/></a>
              <a href="#" className="p-2 border border-[var(--color-primary)]/10 hover:bg-[var(--color-secondary)] hover:border-transparent transition-all"><FaTwitter size={14}/></a>
              <a href="#" className="p-2 border border-[var(--color-primary)]/10 hover:bg-[var(--color-secondary)] hover:border-transparent transition-all"><FaLinkedinIn size={14}/></a>
            </div>
          </div>

          {/* --- QUICK NAVIGATION --- */}
          <div>
            <h6 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--color-secondary)]">Logistics</h6>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest opacity-80">
              <li><Link to="/allProducts" className="hover:text-[var(--color-secondary)] transition-colors">Global Inventory</Link></li>
              <li><Link to="/myImports" className="hover:text-[var(--color-secondary)] transition-colors">Import Manifest</Link></li>
              <li><Link to="/my-exports" className="hover:text-[var(--color-secondary)] transition-colors">Export Portfolio</Link></li>
              <li><Link to="/addExport" className="hover:text-[var(--color-secondary)] transition-colors">List Asset</Link></li>
            </ul>
          </div>

          {/* --- PORT CONTACT --- */}
          <div>
            <h6 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--color-secondary)]">Contact Port</h6>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest opacity-80">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[var(--color-secondary)]" /> 
                Terminal 4, Global Trade Zone
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[var(--color-secondary)]" /> 
                ops@iehub.global
              </li>
              <li><a href="#" className="hover:text-[var(--color-secondary)]">24/7 Support Line</a></li>
            </ul>
          </div>

          {/* --- NEWSLETTER/STATUS --- */}
          <div>
            <h6 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[var(--color-secondary)]">System Status</h6>
            <div className="p-4 border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] font-black uppercase tracking-widest">Global Servers Online</span>
              </div>
              <p className="text-[9px] opacity-40 leading-relaxed uppercase">
                All trade routes and verification services are operating at peak capacity.
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-16 pt-8 border-t border-[var(--color-primary)]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
            © {new Date().getFullYear()} IMPORT EXPORT HUB. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
            <a href="#" className="hover:text-[var(--color-secondary)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-secondary)]">Trade Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;