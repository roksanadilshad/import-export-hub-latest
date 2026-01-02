import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt, FaLayerGroup } from 'react-icons/fa';

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddExport = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Defined Industrial Categories
  const categories = ["Industrial", "Consumer", "Technology", "Logistics", "Raw Materials"];

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) { navigate('/login'); return null; }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Processing image and manifest...");

    try {
      // Step A: Upload Image to ImgBB
      const imageFile = { image: data.productImage[0] };
      const formData = new FormData();
      formData.append('image', imageFile.image);

      const imgRes = await fetch(image_hosting_api, {
        method: 'POST',
        body: formData
      });
      const imgData = await imgRes.json();

      if (!imgData.success) throw new Error("Image upload failed");

      // Step B: Prepare Final Data with Category
      const finalProductData = {
        productName: data.productName,
        category: data.category, // Captured from new field
        productImage: imgData.data.display_url,
        price: parseFloat(data.price),
        originCountry: data.originCountry,
        rating: parseFloat(data.rating),
        availableQuantity: parseInt(data.availableQuantity, 10),
        createdAt: new Date(),
        exporterEmail: user?.email
      };

      // Step C: Save to Backend
      const token = await user.getIdToken();
      const res = await fetch('https://import-export-server.vercel.app/products', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(finalProductData)
      });

      const backendData = await res.json();
      
      if (backendData.success || res.status === 200) {
        toast.success("Product registered successfully!", { id: loadingToast });
        reset();
        navigate('/allProducts');
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 bg-[var(--color-primary)] min-h-screen">
      <div className="card border border-[var(--color-accent)]/10 bg-[var(--color-primary)] w-full max-w-xl mx-auto shadow-2xl rounded-none">
        <div className="card-body p-8">
          <h2 className='border-b-2 border-[var(--color-secondary)] font-black text-2xl text-center text-[var(--color-accent)] mb-8 uppercase'>
            ADD <span className="text-[var(--color-secondary)]">EXPORT</span> ITEM
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* PRODUCT NAME & CATEGORY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Product Name</label>
                  <input
                    {...register("productName", { required: "Name is required" })}
                    className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)]"
                    placeholder="Industrial Name"
                  />
                  {errors.productName && <span className="text-red-500 text-[9px] uppercase font-bold">{errors.productName.message}</span>}
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60 flex items-center gap-1">
                    <FaLayerGroup className="text-[var(--color-secondary)]" /> Trade Category
                  </label>
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)] appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[var(--color-primary)]">Select Sector</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[var(--color-primary)]">
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && <span className="text-red-500 text-[9px] uppercase font-bold">{errors.category.message}</span>}
                </div>
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Product Image (File)</label>
              <div className="relative border-2 border-dashed border-[var(--color-accent)]/20 p-4 hover:border-[var(--color-secondary)] transition-all">
                <input
                  type="file"
                  accept="image/*"
                  {...register("productImage", { required: "Image is required" })}
                  className="w-full text-xs cursor-pointer text-[var(--color-accent)]"
                />
              </div>
              {errors.productImage && <span className="text-red-500 text-[9px] uppercase font-bold">{errors.productImage.message}</span>}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Price required" })}
                  className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)]"
                />
              </div>
              {/* Stock */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Quantity</label>
                <input
                  type="number"
                  {...register("availableQuantity", { required: "Quantity required" })}
                  className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)]"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {/* Origin */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Origin</label>
                <input
                  {...register("originCountry", { required: "Origin required" })}
                  className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)]"
                />
              </div>
              {/* Rating */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("rating", { required: "Rating required", min: 0, max: 5 })}
                  className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm focus:border-[var(--color-secondary)] outline-none text-[var(--color-accent)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-4 bg-[var(--color-accent)] text-[var(--color-primary)] font-black text-xs tracking-[0.3em] uppercase overflow-hidden transition-all hover:bg-[var(--color-secondary)] disabled:opacity-50"
            >
              <span className="relative z-10">
                {isSubmitting ? "Uploading Data..." : "Execute Export Addition"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExport;