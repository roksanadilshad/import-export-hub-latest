import React, { use, useEffect } from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaCartShopping, FaShip, FaXTwitter, FaEarthAmericas, FaBoxesStacked, FaHandshakeSimple, FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { TbBrandGoogle } from 'react-icons/tb';
import { NavLink, useLoaderData } from 'react-router';
import ProductCard from '../Components/ProductCArd';
import { RiImportLine } from 'react-icons/ri';
import { FaShoppingBag } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import Skleton from './Skleton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    const { loading } = use(AuthContext);
    const products = useLoaderData();
    const latestProducts = products?.slice(0, 6) || [];
    const tickerText = "USD/EUR 0.92 ▲ • CN/USD 7.19 ▼ • OIL $78.40 ▲ • 2,400+ NEW CONTAINERS DEPARTED TODAY • VERIFIED PARTNERS: 12,402 • ";
    useEffect(() => {
        AOS.init({ duration: 800, once: false }); 
    }, []);

    return (
        <div className="overflow-x-hidden selection:bg-secondary selection:text-white">
            <title>Import Export Hub | Global Trade Logistics</title>

            {/* --- HERO SECTION WITH GLASS TRACKING BAR --- */}
            <div className="relative pt-40 py-20 min-h-[70%] px-20 lg:px-40 flex items-center bg-[url('https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg')] bg-cover bg-center bg-fixed">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
                
                <div className='relative z-10 w-11/12 mx-auto'>
                    <div className="max-w-4xl" data-aos="fade-up">
                        <span className="inline-block px-4 py-1 border border-primary text-primary text-xs font-bold tracking-[0.3em] uppercase mb-6 bg-primary/10 backdrop-blur-md">
                            Official Global Trade Portal
                        </span>
                        <h1 className='lg:text-8xl text-5xl text-white font-black leading-none mb-6'>
                            GLOBAL TRADE <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">MADE SIMPLE.</span>
                        </h1>
                        <p className="text-gray-300 text-xl max-w-2xl mb-10 leading-relaxed font-light">
                            The definitive platform for verified manufacturers and international buyers. 
                            Streamlining customs, logistics, and bulk trade since 2025.
                        </p>

                        {/* --- FLOATING TRACKING BAR --- */}
                        <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-xl p-2 rounded-none border border-white/20 shadow-2xl max-w-3xl">
                            <div className="flex-1 flex items-center px-6 py-4 border-r border-white/10">
                                <FaMagnifyingGlass className="text-accent mr-3" />
                                <input type="text" placeholder="Track shipment or search products..." className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-400" />
                            </div>
                            <button className="bg-secondary hover:bg-white hover:text-secondary text-white font-bold px-10 py-4 transition-all duration-300">
                                SEARCH
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DATA TICKER --- */}
            <div className="bg-black text-white py-3 overflow-hidden border-y border-white/10 flex">
      {/* Container for the scrolling content */}
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="uppercase text-[10px] tracking-[0.4em] font-mono pr-4">
          {tickerText}
        </span>
        {/* Duplicate the text to create the seamless loop */}
        <span className="uppercase text-[10px] tracking-[0.4em] font-mono pr-4">
          {tickerText}
        </span>
        <span className="uppercase text-[10px] tracking-[0.4em] font-mono pr-4">
          {tickerText}
        </span>
      </div>
    </div>

            {/* --- CORE SERVICES: BENTO GRID --- */}
            <section className="py-32 px-20 lg:px-40 bg-[#F8F9FA] dark:bg-[#020617]">
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                        <div data-aos="fade-right">
                            <h2 className="text-sm font-bold text-secondary tracking-[.5em] uppercase mb-2">Our Capabilities</h2>
                            <p className="text-5xl font-black text-neutral-900 dark:text-white italic">Elite Solutions.</p>
                        </div>
                        <p className="text-gray-500 max-w-sm text-right">Customized logistics pathways designed for efficiency and regulatory compliance.</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6 h-auto">
                        <div data-aos="fade-up" className="lg:col-span-8 group relative overflow-hidden bg-primary h-[400px]">
                            <img src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="" />
                            <div className="absolute inset-0 bg-secondary/40 group-hover:bg-secondary/20 transition-colors"></div>
                            <div className="relative p-10 h-full flex flex-col justify-end text-white">
                                <RiImportLine className="text-6xl mb-4 text-accent" />
                                <h3 className="text-4xl font-bold mb-2">IMPORT GATEWAY</h3>
                                <p className="max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">Source premium materials from Asia, Europe, and the Americas with automated duty calculations.</p>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="200" className="lg:col-span-4 group relative overflow-hidden bg-secondary h-[400px]">
                            <div className="relative p-10 h-full flex flex-col justify-center items-center text-center text-white border-2 border-secondary hover:border-white transition-all">
                                <FaShip className="text-8xl mb-6 text-accent animate-pulse" />
                                <h3 className="text-3xl font-bold">EXPORT PRO</h3>
                                <p className="mt-4 text-sm opacity-80">Launch your products into 190+ countries today.</p>
                                <NavLink to={"/addExport"} className="mt-8 btn btn-outline btn-accent rounded-none">Start Exporting</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION: GLOBAL TRADE CORRIDORS --- */}
<section className="py-24 px-30 lg:px-60 bg-white dark:bg-[#000421] overflow-hidden relative">
    {/* Subtle Background Text for Industrial Feel */}
    {/* <div className="absolute top-10 left-10 text-[15rem] font-black text-gray-500/5 select-none pointer-events-none uppercase">
        Network
    </div> */}

    <div className="w-full mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div data-aos="fade-right">
            <h2 className="text-sm font-bold text-secondary tracking-[.5em] uppercase mb-4">Network Coverage</h2>
            <h3 className="text-5xl font-black mb-6 dark:text-white leading-tight">
                Strategically Located <br/> 
                <span className="text-secondary">Trade Hubs.</span>
            </h3>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-xl">
                Our infrastructure spans 4 continents, with primary distribution centers in Rotterdam, Singapore, Dubai, and New Jersey. We ensure your cargo never stops moving.
            </p>
            
            <div className="space-y-6">
                {[
                    { region: "Asia-Pacific", status: "High Capacity", flow: "Electronic & Textiles" },
                    { region: "European Union", status: "Customs Priority", flow: "Machinery & Luxury" },
                    { region: "North America", status: "Express Entry", flow: "Consumer Goods" }
                ].map((item, i) => (
                    <div key={i} className="group flex items-center gap-6 p-4 border-l-4 border-secondary bg-gray-50 dark:bg-white/5 transition-all hover:bg-secondary/5">
                        <div className="relative">
                            <div className="w-3 h-3 bg-secondary rounded-full"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <h4 className="font-bold dark:text-white transition-colors group-hover:text-secondary">
                                {item.region} — <span className="text-secondary text-xs uppercase">{item.status}</span>
                            </h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">{item.flow}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="relative flex justify-center items-center" data-aos="zoom-in-left">
            {/* Holographic Glow Effect */}
            <div className="absolute w-[120%] h-[120%] bg-secondary/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
            
            <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/1000px-World_map_blank_without_borders.svg.png" 
    alt="Global Network Map" 
    className="relative z-10 w-full opacity-30 grayscale dark:invert brightness-50"
/>

            {/* Floating Info Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0b0f2a] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-8 border-t-4 border-secondary z-20 min-w-[220px]">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-secondary font-mono text-[10px] tracking-widest">LIVE TRAFFIC</p>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-end gap-3">
                    <span className="text-5xl font-black dark:text-white tracking-tighter">842</span>
                    <div className="mb-1">
                        <span className="block text-green-500 text-[10px] font-bold uppercase">Active</span>
                        <span className="block text-gray-400 text-[10px] uppercase">Vessels</span>
                    </div>
                </div>
                {/* Visual Bar Graph decoration */}
                <div className="mt-4 flex gap-1 h-8 items-end">
                    {[40, 70, 55, 90, 65, 80, 45].map((h, i) => (
                        <div key={i} style={{height: `${h}%`}} className="flex-1 bg-secondary/20 hover:bg-secondary transition-colors"></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</section>

            {/* --- PRODUCT SHOWCASE --- */}
            <section className="py-24 px-20 lg:px-40">
                <div className='flex flex-col items-center mb-16' data-aos="zoom-in">
                    <h2 className='text-6xl font-black text-center tracking-tighter dark:text-white'>LATEST TRENDS</h2>
                    <div className="w-16 h-2 bg-accent mt-4"></div>
                </div>
                
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12 w-11/12 mx-auto'>
                    {loading ? <Skleton count={6} /> : 
                        latestProducts.map(p => <ProductCard key={p._id} products={p} />)
                    }
                </div>
            </section>

{/* --- SECTION: COMPLIANCE & TRUST --- */}

<section className=" relative  bg-[url('https://images.pexels.com/photos/3063470/pexels-photo-3063470.jpeg')] bg-cover bg-center bg-no-repeat object-cover  text-white">
    <div className=" inset-0 bg-black/70">
        <div className="py-24 w-11/12 mx-auto px-20 lg:px-40 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1" data-aos="fade-up">
                <h2 className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Zero Risk Trade</h2>
                <h3 className="text-4xl font-bold mb-6">Fully Compliant. <br/>Globally Certified.</h3>
                <p className="text-gray-400 mb-8">We adhere to the strictest ICC (International Chamber of Commerce) standards to protect both buyers and sellers.</p>
                <button className="btn btn-outline btn-primary rounded-none border-2">VIEW DOCUMENTS</button>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6" data-aos="fade-left">
                <div className="p-8 border border-white/10 hover:border-white transition-colors group">
                    <FaHandshakeSimple className="text-4xl text-white mb-6" />
                    <h4 className="text-xl font-bold mb-3 group-hover:text-accent">Escrow Protection</h4>
                    <p className="text-sm text-gray-500">Funds are held securely and only released upon successful delivery verification.</p>
                </div>
                <div className="p-8 border border-white/10 hover:border-white transition-colors group">
                    <FaBoxesStacked className="text-4xl text-white mb-6" />
                    <h4 className="text-xl font-bold mb-3 group-hover:text-accent">SGS Inspection</h4>
                    <p className="text-sm text-gray-500">Optional third-party quality inspection available at every departure port.</p>
                </div>
                <div className="p-8 border border-white/10 hover:border-white transition-colors group">
                    <FaEarthAmericas className="text-4xl text-white mb-6" />
                    <h4 className="text-xl font-bold mb-3 group-hover:text-accent">Customs Clearing</h4>
                    <p className="text-sm text-gray-500">Automated HS Code classification to prevent shipping delays.</p>
                </div>
                <div className="p-8 border border-white/10 hover:border-white transition-colors group">
                    <FaShip className="text-4xl text-white mb-6" />
                    <h4 className="text-xl font-bold mb-3 group-hover:text-accent">Incoterms 2025</h4>
                    <p className="text-sm text-gray-500">Full support for FOB, CIF, DDP, and Ex-Works shipping terms.</p>
                </div>
            </div>
        </div>
    </div>
</section>

{/* --- SECTION: HOW IT WORKS --- */}
<section className="py-24 bg-white dark:bg-black">
    <div className="w-11/12 mx-auto text-center mb-20">
        <h2 className="text-5xl font-black dark:text-white tracking-tighter" data-aos="fade-down">Simplifying the Journey.</h2>
    </div>

    <div className="w-11/12 mx-auto px-20 lg:px-40 relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-white/10 hidden lg:block"></div>

        <div className="space-y-24">
            {[
                { step: "01", title: "Select & Verify", desc: "Choose from thousands of products. Our AI filters for only high-rated, verified manufacturers." },
                { step: "02", title: "Negotiate & Contract", desc: "Use our built-in communication suite to finalize prices and shipping terms securely." },
                { step: "03", title: "Logistics Tracking", desc: "Monitor your container from port-of-origin to your warehouse with real-time GPS." }
            ].map((item, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-10 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`} data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
                    <div className="lg:w-1/2 flex flex-col justify-center px-10">
                        <span className="text-8xl font-black text-gray-100 dark:text-white/5 mb-[-40px] z-0">{item.step}</span>
                        <h4 className="text-3xl font-bold dark:text-white relative z-10">{item.title}</h4>
                        <p className="text-gray-500 mt-4 max-w-md">{item.desc}</p>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-bold ring-8 ring-secondary/10">
                           {i + 1}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

            {/* --- GLOBAL PARTNERS LOGO STRIP --- */}
            <section className="py-12 px-20 lg:px-40 border-y border-gray-200 dark:border-white/10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 overflow-hidden bg-white dark:bg-transparent">
  <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-10">
    
    {/* Label stays static on the left for larger screens */}
    <h3 className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase whitespace-nowrap bg-white dark:bg-[#000421] z-10 pr-4">
      Trusted By Industry Giants:
    </h3>

    {/* The Scrolling Container */}
    <div className="flex overflow-hidden relative w-full">
      <div className="flex gap-16 items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        
        {/* First Set of Logos */}
        <div className="flex gap-16 items-center">
          <span className="text-2xl font-serif font-bold italic tracking-tighter">MAERSK</span>
          <span className="text-2xl font-sans font-black tracking-tighter">FedEx</span>
          <span className="text-2xl font-mono font-bold uppercase">Hapag-Lloyd</span>
          <span className="text-2xl font-serif font-black">MSC</span>
          <span className="text-2xl font-sans font-extrabold italic">COZCO</span>
          <span className="text-2xl font-mono">DB SCHENKER</span>
        </div>

        {/* Second Set (Exact Duplicate for Seamless Loop) */}
        <div className="flex gap-16 items-center">
          <span className="text-2xl font-serif font-bold italic tracking-tighter">MAERSK</span>
          <span className="text-2xl font-sans font-black tracking-tighter">FedEx</span>
          <span className="text-2xl font-mono font-bold uppercase">Hapag-Lloyd</span>
          <span className="text-2xl font-serif font-black">MSC</span>
          <span className="text-2xl font-sans font-extrabold italic">COZCO</span>
          <span className="text-2xl font-mono">DB SCHENKER</span>
        </div>
        
      </div>

      {/* Optional Fade Edges to blend logos in/out */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-[#000421] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-[#000421] to-transparent z-10"></div>
    </div>
  </div>
</section>

            {/* --- NEWSLETTER: MINIMALIST DARK --- */}
            <section className="bg-black px-20 lg:px-40 py-32 text-white">
                <div className="w-11/12 mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div data-aos="fade-right">
                        <h2 className="text-5xl font-bold mb-6">Stay Ahead of the <br/>Market.</h2>
                        <p className="text-gray-500 text-lg">Receive daily intelligence on trade routes, container pricing, and compliance updates.</p>
                    </div>
                    <div className="relative" data-aos="fade-left">
                        <input type="email" placeholder="professional@company.com" className="w-full bg-transparent border-b-2 border-white/20 py-4 focus:border-accent outline-none text-2xl font-light transition-all" />
                        <button className="absolute right-0 top-4 text-accent hover:text-white transition-colors">
                            <IoIosArrowForward size={40} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;