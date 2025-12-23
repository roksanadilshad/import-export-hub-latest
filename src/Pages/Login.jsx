import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye, FaShieldAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "./Loader";
import toast from "react-hot-toast";

const Login = () => {
    const { signInUser, signInWithGoogle, loading } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [err, setErr] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErr(null);
        signInUser(email, password)
            .then(() => {
                navigate(from, { replace: true });
                toast.success('Access Granted! Welcome back.');
            })
            .catch(err => {
                toast.error(err.message);
                setErr(err);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                navigate(from, { replace: true });
                toast.success('Verified via Google Identity.');
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    return (
        <div className="bg-[var(--color-primary)] min-h-screen flex items-center justify-center pt-20 transition-colors duration-500">
            <title>Security Clearance | HUB.</title>

            {loading ? (<Loader />) : (
                <div className="w-full max-w-md p-8 lg:p-12 bg-[var(--color-primary)] border border-[var(--color-accent)]/10 shadow-2xl relative">
                    
                    {/* INDUSTRIAL ACCENT CORNER */}
                    <div className="absolute top-0 left-0 w-16 h-1 bg-[var(--color-secondary)]"></div>
                    
                    <div className="text-center mb-10">
                        <div className="inline-flex p-3 bg-[var(--color-secondary)] text-white mb-4 shadow-lg">
                            <FaShieldAlt size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-[var(--color-accent)] uppercase tracking-tighter">
                            Security <span className="text-[var(--color-secondary)]">Clearance</span>
                        </h1>
                        <p className="text-[10px] font-bold text-[var(--color-accent)]/40 uppercase tracking-[0.2em] mt-2">
                            Enter credentials to access trade terminal
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Corporate Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                type="email"
                                placeholder="name@company.global"
                                className="w-full bg-[var(--color-accent)]/5 border-2 border-[var(--color-accent)]/5 p-4 text-sm font-bold text-[var(--color-accent)] focus:border-[var(--color-secondary)] outline-none transition-all placeholder:opacity-30"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] opacity-60">Security Key</label>
                                <button type="button" className="text-[9px] font-black uppercase text-[var(--color-secondary)] hover:underline">Forgot Key?</button>
                            </div>
                            <div className='relative'>
                                <input
                                    name='password'
                                    type={showPass ? 'text' : "password"}
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--color-accent)]/5 border-2 border-[var(--color-accent)]/5 p-4 text-sm font-bold text-[var(--color-accent)] focus:border-[var(--color-secondary)] outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-accent)] opacity-40 hover:opacity-100 transition-opacity'
                                >
                                    {showPass ? <FaEye size={18} /> : <LuEyeClosed size={18} />}
                                </button>
                            </div>
                        </div>

                        {err && (
                            <div className="p-3 bg-red-500/10 border-l-4 border-red-500 text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                Verification Failed: Invalid Credentials
                            </div>
                        )}

                        <button className="w-full py-4 bg-[var(--color-accent)] text-[var(--color-primary)] font-black text-xs tracking-[0.4em] uppercase hover:bg-[var(--color-secondary)] transition-all shadow-xl">
                            Authorize Access
                        </button>
                    </form>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-[var(--color-accent)]/10"></div>
                        <span className="text-[10px] font-black text-[var(--color-accent)]/30 uppercase tracking-widest">OR</span>
                        <div className="h-[1px] flex-1 bg-[var(--color-accent)]/10"></div>
                    </div>

                    <button
                        type='button'
                        onClick={handleGoogleSignIn}
                        className="w-full mt-8 py-4 bg-white border border-gray-200 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <FcGoogle size={20} /> Identity Verification
                    </button>

                    <p className="text-center mt-10 text-[10px] font-bold text-[var(--color-accent)]/40 uppercase tracking-widest">
                        New Personnel? <Link className='text-[var(--color-secondary)] hover:underline' to='/register'>Request Account</Link>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Login;