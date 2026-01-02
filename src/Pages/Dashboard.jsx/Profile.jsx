import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { FiUploadCloud } from 'react-icons/fi';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            displayName: user?.displayName
        }
    });

    // Handle Image Selection & Preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        setUploading(true);
        const imageFile = data.image[0];
        let finalPhotoURL = user?.photoURL;

        try {
            // 1. If a new file is selected, upload it to ImgBB
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                // REPLACE 'your_imgbb_api_key' with your actual key
                const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
                
                const res = await fetch(url, { method: 'POST', body: formData });
                const imgData = await res.json();

                if (imgData.success) {
                    finalPhotoURL = imgData.data.display_url;
                }
            }

            // 2. Update Firebase/Auth Profile
            await updateUserProfile(data.displayName, finalPhotoURL);
            
            Swal.fire({
                title: 'Profile Updated',
                text: 'Your credentials have been synchronized.',
                icon: 'success',
                background: 'var(--color-primary)',
                color: 'var(--color-accent)',
                confirmButtonColor: 'var(--color-secondary)'
            });
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Update failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header Banner */}
            <div className="h-64 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] border border-[var(--color-accent)]/10 p-10 flex items-end relative overflow-visible">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 translate-y-20">
                    <div className="relative group">
                        <img 
                            src={preview || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}`} 
                            className="w-40 h-40 border-8 border-[var(--color-primary)] bg-[var(--color-primary)] object-cover shadow-2xl" 
                            alt="profile" 
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="loading loading-spinner text-[var(--color-secondary)]"></span>
                            </div>
                        )}
                    </div>

                    <div className="pb-4 text-center md:text-left">
                        <h1 className="text-4xl pb-2 font-black uppercase tracking-tighter text-[var(--color-accent)]">
                            {user?.displayName || "Operator"}
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-secondary)]">
                            Verified Logistics Partner
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[var(--color-accent)]/10 pt-12">
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-50">Update Credentials</h3>
                    
                    {/* Display Name */}
                    <div>
                        <label className="text-[9px] font-bold uppercase mb-2 block opacity-50">Full Name</label>
                        <input 
                            {...register("displayName", { required: true })}
                            className="w-full bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10 p-4 text-[var(--color-accent)] outline-none focus:border-[var(--color-secondary)] font-bold"
                        />
                    </div>

                    {/* File Upload (Instead of URL) */}
                    <div>
                        <label className="text-[9px] font-bold uppercase mb-2 block opacity-50">Upload New Avatar</label>
                        <div className="relative group">
                            <input 
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full bg-[var(--color-accent)]/5 border-2 border-dashed border-[var(--color-accent)]/10 p-8 flex flex-col items-center justify-center group-hover:border-[var(--color-secondary)]/50 transition-colors">
                                <FiUploadCloud className="text-2xl text-[var(--color-secondary)] mb-2" />
                                <span className="text-[10px] font-black uppercase opacity-40">Drop file or click to replace</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={uploading}
                        className="bg-[var(--color-accent)] text-[var(--color-primary)] px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[var(--color-secondary)] hover:text-white transition-all disabled:opacity-50"
                    >
                        {uploading ? "Uploading Data..." : "Apply Changes"}
                    </button>
                </div>

                {/* Info Box */}
                <div className="bg-[var(--color-accent)]/5 p-8 border border-[var(--color-accent)]/10 h-fit">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-40 mb-4">System Information</h3>
                    <p className="text-xs leading-relaxed opacity-60">
                        Profile images are hosted on secure cloud nodes. Updating your visual protocol will reflect across all logistics terminals in real-time.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Profile;