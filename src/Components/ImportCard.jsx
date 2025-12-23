import React from 'react';
import { FaHeart, FaTrashAlt, FaInfoCircle, FaGlobeAmericas } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import RatingStars from '../Pages/RatingStars';

const ImportCard = ({ products, setProducts }) => {
  const {
    productImage,
    productName,
    _id,
    price,
    originCountry,
    rating,
    importedQuantity,
    productId,
  } = products;

  const handleDelete = () => {
    Swal.fire({
      title: "Confirm Removal?",
      text: "This item will be removed from your import manifest.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-secondary)", 
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove It",
      background: 'var(--color-primary)',
      color: 'var(--color-accent)',
      customClass: {
        popup: 'rounded-none border-t-4 border-[var(--color-secondary)]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://import-export-server.vercel.app/imports/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire({
                title: "Manifest Updated",
                icon: "success",
                background: 'var(--color-primary)',
                color: 'var(--color-accent)',
              });
              setProducts((prev) => prev.filter((p) => p._id !== _id));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="group relative bg-[var(--color-primary)] overflow-hidden border border-[var(--color-accent)]/10 transition-all duration-500 hover:shadow-2xl hover:border-[var(--color-secondary)]">
      
      {/* --- Image Section with Theme Badge --- */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Origin Badge - Industrial Style */}
        <div className="absolute top-4 left-4 bg-[var(--color-primary)]/90 backdrop-blur-md px-3 py-1 text-[10px] font-black tracking-widest text-[var(--color-accent)] flex items-center gap-2">
          <FaGlobeAmericas className="text-[var(--color-secondary)]" /> {originCountry?.toUpperCase()}
        </div>

        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-primary)]/20 backdrop-blur-md text-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-colors">
          <FaHeart size={14} />
        </button>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-black tracking-tighter text-[var(--color-accent)] uppercase truncate w-3/4">
            {productName}
          </h2>
          <span className="text-lg font-black text-[var(--color-secondary)] font-mono">${price}</span>
        </div>

        {/* Inventory Info */}
        <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-[10px] text-[var(--color-accent)]/60 font-black uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                In Stock: {importedQuantity}
            </div>
            <div className="flex items-center gap-1">
                 <RatingStars rating={rating} />
                 <span className="text-[10px] font-bold text-[var(--color-accent)]/40 font-mono">({rating})</span>
            </div>
        </div>

        <div className="h-[1px] w-full bg-[var(--color-accent)]/5 mb-6"></div>

        {/* --- Action Buttons --- */}
        <div className="grid grid-cols-2 gap-4">
          <Link 
            to={`/productDetails/${productId}`} 
            className="btn btn-sm rounded-none border-[var(--color-secondary)] text-[var(--color-secondary)] bg-transparent hover:bg-[var(--color-secondary)] hover:text-white transition-all text-[10px] tracking-widest font-black"
          >
            <FaInfoCircle /> DETAILS
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-sm rounded-none bg-[var(--color-accent)]/5 border-none text-red-600 hover:bg-red-600 hover:text-white transition-all text-[10px] tracking-widest font-black"
          >
            <FaTrashAlt /> REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportCard;