import React, { use, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhoneAlt, FaEnvelope, FaGlobe, FaHeadset } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';

const Contact = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    const {user} = use(AuthContext)
console.log(user);

    return (
        <div className="bg-white dark:bg-[#000421] min-h-screen">
            {/* SECTION 1: HEADER & GLOBAL SUPPORT GRID */}
            <section className="py-20 border-b border-gray-200 dark:border-white/10">
                <div className="container mx-auto px-6 lg:px-10">
                    <div className="max-w-3xl mb-16" data-aos="fade-right">
                        <h2 className="text-secondary font-mono tracking-[0.5em] uppercase text-xs mb-4">Channel Open</h2>
                        <h1 className="text-5xl font-black dark:text-white mb-6 uppercase">Connect with <span className="text-secondary">Hub.</span></h1>
                        <p className="text-gray-500 text-lg">Our global network is active 24/7. Reach out to our specialized departments for real-time logistics support.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <FaHeadset />, title: "Live Support", detail: "24/7 Real-time Tracking", contact: "+1 (800) HUB-LOGS" },
                            { icon: <FaEnvelope />, title: "Electronic Manifest", detail: "Documentation & Billing", contact: "manifest@hub.trade" },
                            { icon: <FaGlobe />, title: "Customs Desk", detail: "International Clearances", contact: "customs.hq@hub.trade" },
                            { icon: <FaPhoneAlt />, title: "Press/Media", detail: "Corporate Relations", contact: "media@hub.trade" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-gray-50 dark:bg-white/5 border-t-2 border-transparent hover:border-secondary transition-all" data-aos="fade-up" data-aos-delay={i * 100}>
                                <div className="text-secondary text-2xl mb-6">{item.icon}</div>
                                <h3 className="font-black dark:text-white uppercase text-sm tracking-widest mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-500 mb-4">{item.detail}</p>
                                <p className="font-bold text-secondary text-sm">{item.contact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2: THE COMMAND FORM (SPLIT VIEW) */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-20">
                    <div data-aos="fade-right">
                        <h3 className="text-3xl font-black dark:text-white mb-8 uppercase tracking-tighter">Initiate Inquiry</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
                                    <input type="text" className="w-full bg-gray-100 dark:bg-white/5 border-none p-4 text-sm focus:ring-2 focus:ring-secondary outline-none dark:text-white"
                                    defaultValue={user?.displayName || ""} placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Inquiry Type</label>
                                    <select className="w-full bg-gray-100 dark:bg-white/5 border-none p-4 text-sm focus:ring-2 focus:ring-secondary outline-none dark:text-white">
                                        <option>Import Management</option>
                                        <option>Export Distribution</option>
                                        <option>Customs Consulting</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Interface</label>
                                <input type="email" className="w-full bg-gray-100 dark:bg-white/5 border-none p-4 text-sm focus:ring-2 focus:ring-secondary outline-none dark:text-white"
                                defaultValue={user?.email || ""}
                                placeholder="user@domain.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Message Manifest</label>
                                <textarea rows="5" className="w-full bg-gray-100 dark:bg-white/5 border-none p-4 text-sm focus:ring-2 focus:ring-secondary outline-none dark:text-white" placeholder="Describe your logistics requirements..."></textarea>
                            </div>
                            <button className="w-full py-5 bg-secondary text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-black transition-all shadow-xl shadow-secondary/20">
                                Transmit Message
                            </button>
                        </form>
                    </div>

                    {/* SECTION 3: HQ LOGISTICS MAP (VISUAL) */}
                    <div className="relative" data-aos="fade-left">
                        <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full"></div>
                        <div className="relative z-10 bg-gray-100 dark:bg-[#0b0f2a] border border-gray-200 dark:border-white/10 h-full min-h-[400px] flex flex-col">
                            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                                <span className="text-xs font-mono text-secondary">HQ_LOCATION:ROTTERDAM_PORT</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                </div>
                            </div>
                            {/* Placeholder for Map or Visual */}
                            <div className="flex-grow bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/1000px-World_map_blank_without_borders.svg.png')] bg-center bg-no-repeat opacity-20 dark:invert grayscale p-10">
                            </div>
                            <div className="p-10">
                                <h4 className="text-xl font-black dark:text-white mb-2">Global Headquarters</h4>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Port of Rotterdam, M-422 <br />
                                    Logistic Plaza, Floor 12 <br />
                                    The Netherlands
                                </p>
                                <div className="p-4 bg-secondary/10 border-l-4 border-secondary">
                                    <p className="text-[10px] font-mono text-secondary uppercase tracking-tighter">Status: Fully Operational / 0ms Latency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: EMERGENCY HOTLINES (TICKER STYLE) */}
            <section className="py-12 bg-black border-y border-white/10">
                <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h4 className="text-white font-black text-lg uppercase tracking-widest">Emergency Priority Line</h4>
                        <p className="text-gray-500 text-xs font-mono">For critical cargo disruptions and vessel emergencies only.</p>
                    </div>
                    <div className="text-3xl font-mono text-secondary font-black animate-pulse">
                        +880 123-456789
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;