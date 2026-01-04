import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { LuEyeClosed } from 'react-icons/lu';
import { FaEye, FaUserPlus, FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
  const { createUser, setUser, signInWithGoogle, updateUserProfile, setLoading } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard/dashboardHome'; // Fixed default path

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [photoFile]);

  const onSubmit = async (data) => {
    if (!image_hosting_key) {
        toast.error("Manifest Error: Missing API credentials");
        return;
    }

    setIsUploading(true);
    setLoading(true); // Put AuthContext in loading state to prevent getIdToken errors in other components

    try {
      // 1. Image Upload
      const formData = new FormData();
      formData.append('image', data.photo[0]);
      const res = await fetch(image_hosting_api, { method: 'POST', body: formData });
      const imgData = await res.json();

      if (!imgData.success) throw new Error("Image Upload Failed");
      const photoURL = imgData.data.display_url;

      // 2. Account Creation
      const result = await createUser(data.email, data.password);
      
      // 3. Update Profile (Name & Photo)
      await updateUserProfile(data.name, photoURL);
      
      // 4. Force state update with all data included
      // This prevents components from seeing a "partial" user object
      const updatedUser = { 
        ...result.user, 
        displayName: data.name, 
        photoURL: photoURL 
      };
      
      setUser(updatedUser);
      
      // 5. Finalize
      toast.success("Personnel Record Created Successfully");
      reset();
      
      // Small timeout ensures all internal Firebase state changes settle 
      // before the navigation closes the message channel
      setTimeout(() => {
        navigate(from, { replace: true });
        setLoading(false);
      }, 500);

    } catch (err) {
      toast.error(err.message || "Registration Failed");
      setLoading(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Identity Verified via Google");
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center pt-24 pb-12 px-4">
      {/* ... (UI layout remains the same as your previous code) ... */}
      <div className="w-full max-w-xl bg-[var(--color-primary)] border border-[var(--color-accent)]/10 p-8 lg:p-12 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-24 h-1 bg-[var(--color-secondary)]"></div>
        
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-[var(--color-accent)] text-[var(--color-primary)] mb-4">
            <FaUserPlus size={24} />
          </div>
          <h1 className="text-3xl font-black text-[var(--color-accent)] uppercase tracking-tighter">
            Personnel <span className="text-[var(--color-secondary)]">Onboarding</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--color-accent)] opacity-60">Full Name</label>
              <input 
                {...register("name", { required: "Name is required", minLength: 5 })}
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm font-bold text-[var(--color-accent)] focus:border-[var(--color-secondary)] outline-none" 
              />
              {errors.name && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-[var(--color-accent)] opacity-60">Identity Portrait</label>
              <div className="relative">
                <input 
                  {...register("photo", { required: "Portrait required" })}
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload" 
                  className={`flex items-center justify-center gap-2 w-full border-2 border-dashed p-3 text-[10px] font-black uppercase cursor-pointer transition-all h-[47px]
                    ${preview ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]' : 'border-[var(--color-accent)]/10'}`}
                >
                  {preview ? <><FaCheckCircle /> Ready</> : <><FaCloudUploadAlt /> Select File</>}
                </label>
              </div>
              {errors.photo && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.photo.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--color-accent)] opacity-60">Corporate Email</label>
            <input 
              {...register("email", { required: "Email is required" })}
              type="email" 
              placeholder="operator@hub.global" 
              className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm font-bold text-[var(--color-accent)] focus:border-[var(--color-secondary)] outline-none" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-[var(--color-accent)] opacity-60">Security Key</label>
            <div className="relative">
              <input
                {...register("password", { 
                  required: "Password required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/,
                    message: "Complexity requirement failed"
                  }
                })}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-[var(--color-accent)]/5 border-2 border-transparent p-3 text-sm font-bold text-[var(--color-accent)] focus:border-[var(--color-secondary)] outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-accent)]/40"
              >
                {showPass ? <FaEye size={18} /> : <LuEyeClosed size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.password.message}</p>}
          </div>

          <button 
            disabled={isUploading}
            className="w-full py-4 bg-[var(--color-accent)] text-[var(--color-primary)] font-black text-xs tracking-[0.4em] uppercase hover:bg-[var(--color-secondary)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isUploading ? "Syncing..." : "Initialize Onboarding"}
          </button>

          <button 
            type='button' 
            onClick={handleGoogleSignIn} 
            className="w-full py-4 bg-white border border-gray-200 text-gray-600 font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-3"
          >
            <FcGoogle size={20} /> Google Verification
          </button>

          <p className="text-center text-[10px] font-bold uppercase tracking-widest mt-6 text-[var(--color-accent)]/40">
            Existing Personnel? <Link className='text-[var(--color-secondary)] hover:underline' to='/login'>Authorize Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;