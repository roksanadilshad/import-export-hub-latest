import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import Loder from './Loder';

const ForgetPassword = () => {
   const {passwordReset, loading, setLoading} = use(AuthContext);
   const [email,setEmail] = useState("");
   const emailRef = useRef();
   const location = useLocation();
   const navigate = useNavigate()

    useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

    const handleReset = (e) =>{
        e.preventDefault();
        setLoading(true)
    const email = emailRef.current.value;

    if(!email) {
      toast.error('Please Enter Your Email First');
      return
    }

    passwordReset(email)
         .then(() => {
      toast.success('Password reset email sent! Check your inbox 📩');
      setLoading(false)
       window.open("https://mail.google.com", "_blank");
      setTimeout(() => {
         navigate('/login', { replace: true });
        }, 2000);
     })
     
     .catch((err) =>{
         toast.error(err.message);   
         setLoading(false)  
     })
    
         
    }
    return (
        <div>
          
            <div className="flex justify-center items-center h-screen ">
      <div className="card w-96 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            ref={emailRef}
            placeholder="Enter your email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-success text-white w-full">{loading ? <Loder></Loder> : "Send Reset Email"}</button>
        </form>
        <p className="text-center mt-4">
          <Link to="/login" className="text-amber-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
        </div>
    );
};

export default ForgetPassword;