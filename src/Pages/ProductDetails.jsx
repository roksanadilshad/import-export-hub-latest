import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';
import { useParams } from 'react-router';
import RatingStars from './RatingStars';
import ImportModal from './ImportModal';
import ProductCard from '../Components/ProductCArd';
import { 
  FaGlobeAmericas, FaBoxes, FaFileInvoiceDollar, 
  FaCheckCircle, FaShieldAlt, FaShip, FaCubes 
} from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (!user?.accessToken) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetch(`https://import-export-server.vercel.app/products/${id}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.result);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    fetch(`https://import-export-server.vercel.app/latest-products`)
      .then(res => res.json())
      .then(data => setLatestProducts(data));
  }, [user, id, setLoading]);

  const handleImported = (quantity) => {
    setProduct((prev) => ({
      ...prev,
      availableQuantity: prev.availableQuantity - quantity,
    }));
  };

  if (loading || !product) return <Loading />;

  const { productImage, productName, price, originCountry, rating, availableQuantity } = product;
  const relatedProducts = latestProducts.slice(0, 4);

  return (
    <div className="bg-[var(--color-primary)] min-h-screen pt-28 pb-20 transition-colors duration-500">
      <title>{productName} | Strategic Procurement</title>

      <div className="container mx-auto px-4 lg:px-10">
        {/* --- PROFESSIONAL BREADCRUMB --- */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]/50 mb-8">
            Global Trade / Inventory / <span className="text-[var(--color-secondary)]">{productName}</span>
        </nav>

        <div className="bg-white dark:bg-[var(--color-primary)] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden border border-[var(--color-accent)]/5">
          <div className="flex flex-col lg:flex-row">
            
            {/* --- LEFT: ASSET VISUALS --- */}
            <div className="lg:w-3/5 relative bg-gray-50 dark:bg-black/20 overflow-hidden">
              <img
                src={productImage}
                alt={productName}
                className="w-full h-full object-cover min-h-[550px] transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                <span className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-1 text-[9px] font-black tracking-widest uppercase shadow-xl">
                  Trade-ID: {id.slice(-6).toUpperCase()}
                </span>
                <span className="bg-[var(--color-secondary)] text-white px-4 py-1 text-[9px] font-black tracking-widest uppercase shadow-xl flex items-center gap-2">
                  <FaShieldAlt /> Fully Compliant
                </span>
              </div>
            </div>

            {/* --- RIGHT: PROCUREMENT DETAILS --- */}
            <div className="lg:w-2/5 p-8 lg:p-14 flex flex-col bg-white dark:bg-black/10">
              <div className="mb-10">
                <div className="flex items-center gap-2 text-[var(--color-secondary)] font-bold text-[10px] tracking-[0.3em] uppercase mb-4">
                  <FaShip /> Direct Vessel Supply
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-accent)] dark:text-white uppercase tracking-tighter mb-4 leading-none">
                  {productName}
                </h1>
                <div className="flex items-center gap-4 border-b border-[var(--color-accent)]/5 pb-6">
                  <RatingStars rate={rating} />
                  <span className="text-xs font-bold text-[var(--color-accent)]/40 uppercase">Global Rating: {rating}</span>
                </div>
              </div>

              {/* TECHNICAL SPECS DATA GRID */}
              <div className="grid grid-cols-1 gap-0 mb-12">
                {[
                  { label: "Market Valuation", value: `$${price}`, icon: <FaFileInvoiceDollar />, color: "text-[var(--color-secondary)]" },
                  { label: "Current Allocation", value: `${availableQuantity} Units`, icon: <FaBoxes />, color: "" },
                  { label: "Port of Loading", value: originCountry, icon: <FaGlobeAmericas />, color: "" },
                  { label: "Quality Assurance", value: "Verified", icon: <FaCheckCircle />, color: "text-green-500" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center justify-between py-5 border-b border-[var(--color-accent)]/5 group hover:bg-gray-50 dark:hover:bg-white/5 px-2 transition-colors">
                    <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)]/40">
                      <span className="text-[var(--color-secondary)] text-sm">{spec.icon}</span> {spec.label}
                    </span>
                    <span className={`text-xl font-bold font-mono tracking-tighter ${spec.color || 'text-[var(--color-accent)] dark:text-white'}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* ACTION BUTTON - The "Maersk" Style CTA */}
              <button
                onClick={() => setShowModal(true)}
                className="group relative w-full py-6 bg-[var(--color-accent)] dark:bg-[var(--color-secondary)] text-[var(--color-primary)] dark:text-white font-black text-xs tracking-[0.5em] uppercase overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Initiate Procurement <FaCubes className="group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <p className="mt-6 text-[9px] text-center text-[var(--color-accent)]/40 uppercase font-bold tracking-[0.1em]">
                Secure escrow payment enabled for this transaction
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION: LOGISTICS & TECHNICAL MATRIX --- */}
<section className="mt-20 border-t border-[var(--color-accent)]/10 pt-16">
  <div className="grid lg:grid-cols-3 gap-12">
    <div className="lg:col-span-1">
      <h3 className="text-[var(--color-secondary)] font-black text-[10px] tracking-[0.4em] uppercase mb-4">Core Specifications</h3>
      <h4 className="text-3xl font-black text-[var(--color-accent)] dark:text-white uppercase tracking-tighter leading-none mb-6">
        Technical <br/> Parameters.
      </h4>
      <p className="text-sm text-[var(--color-accent)]/60 leading-relaxed">
        Our quality assurance team verifies every batch before container sealing to ensure 100% compliance with international standards.
      </p>
    </div>

    <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-12 gap-y-4">
      {[
        { label: "Harmonized System (HS) Code", value: "8471.30.01" },
        { label: "Standard Lead Time", value: "14-21 Business Days" },
        { label: "Incoterms Supported", value: "FOB, CIF, DDP, EXW" },
        { label: "Minimum Order Quantity", value: "50 Units" },
        { label: "Storage Condition", value: "Ambient / Dry" },
        { label: "Insurance Coverage", value: "All-Risk Protection" },
      ].map((spec, i) => (
        <div key={i} className="flex justify-between items-center py-4 border-b border-[var(--color-accent)]/5">
          <span className="text-[10px] uppercase font-bold text-[var(--color-accent)]/40 tracking-widest">{spec.label}</span>
          <span className="text-sm font-black text-[var(--color-accent)] dark:text-white font-mono">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
</section>

{/* --- SECTION: PROCUREMENT JOURNEY --- */}
<section className="mt-32 py-20 bg-[var(--color-accent)] dark:bg-[var(--color-secondary)]/10 text-[var(--color-primary)]">
  <div className="max-w-4xl mx-auto text-center mb-16 px-6">
    <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-50 mb-4">Standard Operational Procedure</h3>
    <h2 className="text-4xl font-black uppercase tracking-tighter">Your Supply Chain Timeline.</h2>
  </div>

  <div className="grid md:grid-cols-4 gap-8 px-10 relative">
    {/* Connecting Line (Desktop) */}
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-primary)]/10 hidden md:block"></div>
    
    {[
      { step: "01", title: "Order Placement", desc: "Digital Bill of Lading generated" },
      { step: "02", title: "Port Loading", desc: "Loading at Port of " + originCountry },
      { step: "03", title: "Transit", desc: "Global vessel tracking enabled" },
      { step: "04", title: "Arrival", desc: "Customs clearing & last-mile delivery" }
    ].map((item, i) => (
      <div key={i} className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-[var(--color-primary)] text-[var(--color-accent)] flex items-center justify-center font-black text-xl mb-6 shadow-xl">
          {item.step}
        </div>
        <h4 className="font-bold uppercase tracking-widest text-sm mb-2">{item.title}</h4>
        <p className="text-[10px] opacity-60 uppercase tracking-tighter leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* --- SECTION: COMPLIANCE & TRUST SIGNALS --- */}
<section className="mt-32 mb-10">
  <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
    <div className="flex flex-col items-center">
       <FaCheckCircle className="text-4xl mb-2" />
       <span className="text-[9px] font-black uppercase tracking-widest">ISO 9001:2015</span>
    </div>
    <div className="h-10 w-[1px] bg-[var(--color-accent)] hidden md:block"></div>
    <div className="flex flex-col items-center text-center">
       <span className="text-xl font-black italic">SGS</span>
       <span className="text-[9px] font-black uppercase tracking-widest">Quality Inspected</span>
    </div>
    <div className="h-10 w-[1px] bg-[var(--color-accent)] hidden md:block"></div>
    <div className="flex flex-col items-center">
       <span className="text-xl font-black">WTO</span>
       <span className="text-[9px] font-black uppercase tracking-widest">Trade Compliant</span>
    </div>
    <div className="h-10 w-[1px] bg-[var(--color-accent)] hidden md:block"></div>
    <div className="flex flex-col items-center">
       <span className="text-xl font-black">AEO</span>
       <span className="text-[9px] font-black uppercase tracking-widest">Authorized Operator</span>
    </div>
  </div>
</section>

        {/* --- RELATED TRADE ASSETS SECTION --- */}
        <div className="mt-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-md">
              <p className="text-[var(--color-secondary)] font-black text-[10px] tracking-[0.4em] uppercase mb-2">Market Insights</p>
              <h2 className="text-4xl font-black text-[var(--color-accent)] dark:text-white uppercase tracking-tighter leading-none">
                Related Trade <span className="text-[var(--color-secondary)]">Assets</span>
              </h2>
            </div>
            <div className="flex-1 h-[1px] bg-[var(--color-accent)]/10 mx-10 hidden lg:block"></div>
            <p className="text-xs font-bold text-[var(--color-accent)]/40 uppercase tracking-[0.2em]">Based on your supply chain history</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map(item => (
              <ProductCard products={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <ImportModal
          product={product}
          onClose={() => setShowModal(false)}
          handleImported={handleImported}
        />
      )}
    </div>
  );
};

export default ProductDetails;