import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';

// ImgBB Config
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateExport = ({ product, onClose, setProducts }) => {
  const { user } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize Hook Form with default values from the existing product
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      productName: product.productName,
      price: product.price,
      rating: product.rating,
      originCountry: product.originCountry,
      availableQuantity: product.availableQuantity,
    }
  });

  const onSubmit = async (data) => {
    if (!user) return toast.error("Session expired. Please login.");
    
    setIsUpdating(true);
    const loadingToast = toast.loading("Updating global manifest...");

    try {
      let finalImageUrl = product.productImage; // Default to existing image

      // 1. Check if a new image was selected
      if (data.imageFile && data.imageFile.length > 0) {
        const formData = new FormData();
        formData.append('image', data.imageFile[0]);

        const imgRes = await fetch(image_hosting_api, {
          method: 'POST',
          body: formData
        });
        const imgData = await imgRes.json();

        if (imgData.success) {
          finalImageUrl = imgData.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // 2. Prepare Payload
      const updatedDoc = {
        productName: data.productName,
        productImage: finalImageUrl,
        price: parseFloat(data.price),
        rating: data.rating,
        originCountry: data.originCountry,
        availableQuantity: data.availableQuantity
      };

      // 3. Send to Server
      const token = await user.getIdToken();
      const res = await fetch(
        `https://import-export-server.vercel.app/exports/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedDoc),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Manifest Updated", { id: loadingToast });
        
        // Update the local list state
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, ...updatedDoc } : p))
        );
        onClose();
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message, { id: loadingToast });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary/80 backdrop-blur-md flex justify-center items-center z-[100] p-4">
      <div className="bg-[var(--color-primary)] border border-[var(--color-accent)]/20 p-8 shadow-2xl w-full max-w-lg relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-secondary)]"></div>

        <h2 className="text-xl font-black mb-6 text-[var(--color-accent)] uppercase tracking-tighter">
          Update <span className="text-[var(--color-secondary)]">Product Record</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Nomenclature</label>
              <input
                {...register("productName", { required: "Name is required" })}
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Update Portrait (Optional)</label>
              <div className="flex items-center gap-4 mt-1">
                <img src={product.productImage} alt="Current" className="w-12 h-12 object-cover border border-[var(--color-accent)]/20" />
                <input
                  type="file"
                  accept="image/*"
                  {...register("imageFile")}
                  className="text-[10px] uppercase font-bold cursor-pointer file:bg-[var(--color-accent)] file:text-white file:border-none file:px-4 file:py-2 file:mr-4 hover:file:bg-[var(--color-secondary)]"
                />
              </div>
            </div>

            {/* Price & Quantity */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Value ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Stock</label>
              <input
                {...register("availableQuantity", { required: true })}
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none"
              />
            </div>

            {/* Origin & Rating */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Origin</label>
              <input
                {...register("originCountry", { required: true })}
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Rating</label>
              <input
                {...register("rating", { required: true })}
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-500/10 hover:bg-gray-500/20 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-[var(--color-accent)] text-white hover:bg-[var(--color-secondary)] transition-all disabled:opacity-50"
            >
              {isUpdating ? "Syncing..." : "Commit Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExport;