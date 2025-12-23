import React, { useState } from 'react';
import { FaHeart, FaTrashAlt, FaEdit, FaBox, FaGlobeAmericas } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import Swal from 'sweetalert2';
import UpdateExport from './UpdateExport';
import RatingStars from '../Pages/RatingStars';

const ExportCard = ({ products, setProducts }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    productImage,
    productName,
    _id,
    price,
    originCountry,
    rating,
    availableQuantity,
  } = products;

  const handleDelete = () => {
    Swal.fire({
      title: "De-list Asset?",
      text: "This product will be removed from the global trade manifest.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-secondary)",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Confirm Deletion",
      background: "var(--color-primary)",
      color: "var(--color-accent)",
      customClass: {
        popup: 'rounded-none border-t-4 border-[var(--color-secondary)]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://import-export-server.vercel.app/exports/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire({
                title: "Asset Removed",
                icon: "success",
                background: "var(--color-primary)",
                color: "var(--color-accent)",
              });
              setProducts((prev) => prev.filter((p) => p._id !== _id));
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="group relative bg-[var(--color-primary)] border border-[var(--color-accent)]/10 transition-all duration-500 hover:shadow-2xl hover:border-[var(--color-secondary)]">
      {/* --- IMAGE SECTION --- */}
      <div className="relative h-64 overflow-hidden bg-[var(--color-accent)]/5">
        <img
          src={productImage}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-[var(--color-primary)]/90 backdrop-blur-md p-2 text-[var(--color-secondary)] shadow-sm">
                <FiShoppingCart size={16} />
            </div>
            <div className="bg-[var(--color-accent)] text-[var(--color-primary)] px-3 py-1 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
               <FaGlobeAmericas /> {originCountry}
            </div>
        </div>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-colors">
          <FaHeart size={14} />
        </button>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-black text-[var(--color-accent)] uppercase tracking-tighter truncate">
            {productName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <RatingStars rate={rating} />
            <span className="text-[10px] font-bold text-[var(--color-accent)]/40 font-mono">({rating})</span>
          </div>
        </div>

        {/* Technical Data Row */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--color-accent)]/5 mb-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-accent)]/40 mb-1">Unit Price</p>
            <p className="text-lg font-mono font-bold text-[var(--color-secondary)]">${price}</p>
          </div>
          <div className="border-l border-[var(--color-accent)]/5 pl-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-accent)]/40 mb-1">Inventory</p>
            <p className="text-sm font-bold text-[var(--color-accent)] flex items-center gap-2 uppercase">
              <FaBox className="text-[var(--color-secondary)]" /> {availableQuantity} Units
            </p>
          </div>
        </div>

        {/* --- MANAGEMENT ACTIONS --- */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-secondary)] transition-all"
          >
            <FaEdit /> Update
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 py-3 bg-transparent border border-[var(--color-accent)]/10 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
          >
            <FaTrashAlt /> Remove
          </button>
        </div>

        {/* --- MODAL INJECTION --- */}
        {showModal && (
          <UpdateExport
            product={products}
            onClose={() => setShowModal(false)}
            setProducts={setProducts}
          />
        )}
      </div>
    </div>
  );
};

export default ExportCard;