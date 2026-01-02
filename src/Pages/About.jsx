import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* SECTION 1: THE VISION */}
            <section className="py-24 bg-white dark:bg-[#000421] relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[15rem] lg:text-[20rem] font-black text-gray-500/5 select-none pointer-events-none translate-x-1/2 -translate-y-1/4 uppercase">
                    Vision
                </div>
                <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div data-aos="fade-right">
                        <h2 className="text-secondary font-mono tracking-[0.5em] uppercase text-sm mb-4">Established 2012</h2>
                        <h3 className="text-5xl lg:text-6xl font-black dark:text-white leading-tight mb-8">
                            Redefining the <br/> 
                            <span className="text-secondary">Global Flow.</span>
                        </h3>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed" data-aos="fade-left">
                        <p className="mb-6">
                            HUB. was founded on a single principle: <span className="text-black dark:text-white font-bold">Logistics should be invisible.</span> We remove the friction from international trade through a proprietary blend of deep-sea infrastructure and AI-driven predictive routing.
                        </p>
                        <p>
                            In 2026, we operate as a digital nervous system for global commerce, ensuring that "just-in-time" delivery remains a reality in an unpredictable world.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: CORE PILLARS */}
            <section className="py-20 bg-gray-50 dark:bg-black/20 border-y border-gray-200 dark:border-white/5">
                <div className="container mx-auto px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-0 lg:divide-x divide-gray-200 dark:divide-white/10">
                    {[
                        { title: "Precision", desc: "Military-grade tracking with sub-meter accuracy." },
                        { title: "Velocity", desc: "Automated customs clearing reducing wait-times by 40%." },
                        { title: "Integrity", desc: "Transparent, blockchain-verified ledger of every movement." },
                        { title: "Sustainability", desc: "Net-zero maritime fleet commitment by 2030." }
                    ].map((pillar, i) => (
                        <div key={pillar.title} className="p-10 group hover:bg-secondary transition-all duration-500" data-aos="fade-up" data-aos-delay={i * 100}>
                            <h4 className="text-secondary group-hover:text-white font-mono text-xs mb-4 uppercase tracking-widest">Pillar_0{i+1}</h4>
                            <h5 className="text-2xl font-black dark:text-white group-hover:text-white mb-4">{pillar.title}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: GLOBAL FOOTPRINT */}
            <section className="py-24 bg-white dark:bg-[#000421] overflow-hidden">
                <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative order-2 lg:order-1" data-aos="zoom-in">
                        <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full"></div>
                        {/* High-reliability Map Image */}
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png" 
                            alt="Global Network" 
                            className="relative z-10 opacity-20 grayscale dark:invert brightness-150"
                        />
                        <div className="grid grid-cols-2 gap-4 absolute inset-0 items-center z-20">
                            <div className="bg-white/80 dark:bg-[#000421]/80 backdrop-blur-md p-6 border-b-4 border-secondary shadow-xl" data-aos="fade-up">
                                <span className="block text-4xl font-black dark:text-white mb-2">142</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500">Global Hubs</span>
                            </div>
                            <div className="bg-white/80 dark:bg-[#000421]/80 backdrop-blur-md p-6 border-b-4 border-secondary mt-12 shadow-xl" data-aos="fade-up" data-aos-delay="200">
                                <span className="block text-4xl font-black dark:text-white mb-2">2.4M</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400">Tons Yearly</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="order-1 lg:order-2" data-aos="fade-left">
                        <h3 className="text-4xl lg:text-5xl font-black dark:text-white mb-6 leading-tight">Unrivaled Scale. <br/>Local Expertise.</h3>
                        <p className="text-gray-500 text-lg mb-8">
                            We don't just ship containers; we navigate local laws, cultural nuances, and regional disruptions so you don't have to. Our AI reroutes your cargo before the storm even hits.
                        </p>
                        <button className="group flex items-center gap-4 px-8 py-4 bg-secondary text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">
                            View Network Map
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE METHODOLOGY */}
            <section className="py-24 bg-gray-900 text-white relative">
                <div className="container mx-auto px-6 lg:px-40">
                    <div className="text-center mb-20" data-aos="fade-down">
                        <h3 className="text-sm font-mono text-secondary tracking-[0.4em] uppercase mb-4">Our Protocol</h3>
                        <h4 className="text-4xl font-black uppercase tracking-tighter">The HUB. Process</h4>
                    </div>
                    
                    <div className="space-y-12 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10 lg:left-[9px]"></div>
                        
                        {[
                            { step: "Intake", title: "Digital Onboarding", desc: "Automated SKU syncing via unified trade APIs." },
                            { step: "Sort", title: "Autonomous Sorting", desc: "Robotic warehouse optimization for high-velocity dispatch." },
                            { step: "Transit", title: "Smart-Routing", desc: "Real-time AI rerouting based on weather & port congestion." },
                            { step: "Arrival", title: "Final Mile Delivery", desc: "Biometric proof-of-delivery with digital custody tracking." }
                        ].map((item, i) => (
                            <div key={item.step} className="flex gap-10 items-start pl-10 relative group" data-aos="fade-left" data-aos-delay={i * 150}>
                                <div className="absolute -left-[1px] top-1.5 w-4 h-4 bg-secondary rounded-full border-4 border-gray-900 z-10 group-hover:scale-125 transition-transform lg:-left-[1px]"></div>
                                <span className="font-mono text-secondary text-sm min-w-[60px]">{item.step}</span>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{item.title}</h4>
                                    <p className="text-gray-400 max-w-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;