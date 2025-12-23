import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { FaFileContract, FaCalculator, FaShieldAlt } from "react-icons/fa";

const ImportModal = ({ product, onClose, handleImported }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  const { productImage, productName, price, originCountry, rating, _id, availableQuantity } = product;

  // Professional Financial Calculation
  const totalValuation = (Number(quantity) * Number(price)).toLocaleString();

  const handleImport = async () => {
    const qty = Number(quantity);

    if (qty < 1 || qty > availableQuantity) {
      Swal.fire({
        title: "Trade Violation",
        text: `Allocation must be between 1 and ${availableQuantity} units.`,
        icon: "warning",
        background: "var(--color-primary)",
        color: "var(--color-accent)",
        confirmButtonColor: "var(--color-secondary)",
      });
      return;
    }

    const modalData = {
      productId: _id,
      productImage,
      productName,
      price,
      rating,
      originCountry,
      quantity: qty,
      import_by: user.email,
      createdAt: new Date()
    };

    try {
      const res = await fetch("https://import-export-server.vercel.app/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Manifest Confirmed",
          text: "The asset has been allocated to your import manifest.",
          icon: "success",
          background: "var(--color-primary)",
          color: "var(--color-accent)",
          confirmButtonColor: "var(--color-secondary)",
        });
        handleImported(qty);
        onClose();
      }
    } catch (err) {
      Swal.fire("System Error", "Connection to trade server lost.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-accent)]/80 backdrop-blur-md z-[200] p-4">
      <div className="bg-[var(--color-primary)] border border-[var(--color-accent)]/10 w-full max-w-md overflow-hidden shadow-2xl transition-colors duration-500">
        
        {/* --- MODAL HEADER --- */}
        <div className="bg-[var(--color-secondary)] p-6 text-white">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase opacity-80 mb-2">
            <FaFileContract /> Letter of Intent
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            Procurement <span className="opacity-60">Entry</span>
          </h2>
        </div>

        <div className="p-8">
          {/* ASSET SUMMARY */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[var(--color-accent)]/10">
            <img src={productImage} className="w-16 h-16 object-cover border border-[var(--color-accent)]/10" alt="" />
            <div>
              <p className="text-[10px] font-black uppercase text-[var(--color-accent)]/40 tracking-widest">Selected Asset</p>
              <h3 className="text-lg font-black text-[var(--color-accent)] uppercase leading-none">{productName}</h3>
            </div>
          </div>

          {/* QUANTITY INPUT */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] mb-3">
                <span>Allocation Quantity</span>
                <span className="text-[var(--color-secondary)]">Max: {availableQuantity}</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-[var(--color-accent)]/5 border-2 border-[var(--color-accent)]/10 p-4 font-mono font-bold text-xl text-[var(--color-accent)] focus:border-[var(--color-secondary)] outline-none transition-all"
                />
              </div>
            </div>

            {/* LIVE VALUATION CARD */}
            <div className="bg-[var(--color-accent)] p-4 flex justify-between items-center shadow-inner">
              <div className="flex items-center gap-2 text-[var(--color-primary)] opacity-60">
                <FaCalculator size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">Total Valuation</span>
              </div>
              <span className="text-xl font-mono font-bold text-[var(--color-primary)]">${totalValuation}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleImport}
              disabled={quantity < 1 || quantity > availableQuantity}
              className="w-full py-4 bg-[var(--color-secondary)] text-white font-black text-xs tracking-[0.4em] uppercase hover:brightness-110 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
            >
              Confirm Allocation <FaShieldAlt />
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-all"
            >
              Abort Transaction
            </button>
          </div>

          <p className="mt-6 text-[8px] text-center text-[var(--color-accent)]/30 uppercase font-bold leading-relaxed">
            By confirming, you acknowledge that this is a non-binding intent to import <br/>
            under the Global Trade Governance Framework.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;