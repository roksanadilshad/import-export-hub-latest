import React, { use, useState } from 'react';

import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { LuEyeClosed } from 'react-icons/lu';
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const Registration = () => {
     const {createUser, setUser, signInWithGoogle, updateUserProfile} = use(AuthContext);
     const [nameError, setNameError] = useState('');
     const [success, setSuccess] = useState(false);
     const [error, setError] = useState('');
  const [showPass, setShoePass] = useState(false)
const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked
        //console.log(email, password);

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]).{6,}$/;

         if(!passwordPattern.test(password)){
          setError('Passowerd must be contain at least 6 characters long, include one uppercase, one lowercase and special character')
          toast.error('Passowerd must be contain at least 6 characters long, include one uppercase, one lowercase and special character')
          return
         }

        if(name.length < 5){
            setNameError('Name Should be more then 5 character');
            return;
        }
        else{
            setNameError('')
        };
        
        setError(null);
         setSuccess(false);

         if(!terms){
          toast.error('Please accept our terms and condition.');
          return;
         }

        createUser(email, password, terms)
        .then(result =>{
          const user = result.user;
          setSuccess(true)
          e.target.reset()
            //console.log(result.user);
             return updateUserProfile()
        .then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
          setSuccess(true);
          setError('');
          e.target.reset();
          toast.success("Sign up successfull")
           navigate(from, {replace:true});
        });
      })
         .catch((error) => {
            console.log(error);
            setError(error.message);
            setSuccess(false)
          });
    }

    const handlePasswordShow = e =>{
      e.preventDefault();
      setShoePass(!showPass)
    }
        const handleGoogleSignIn = () =>{
         signInWithGoogle()
         .then(() => {
          toast.success("Sign up successfull")
            //console.log(result.user);
            navigate(from, {replace:true})
            
         })
         .catch(err => {
            console.log(err);
           toast.error(err.message)
         })
    }
    
   
    return (
      <div>
       <div><title> Register</title></div>
        <div className="hero base-200 min-h-screen">
  <div className="hero-content flex-col">
    <div className="text-center">
    </div>
    <div className="card bg-neutral w-full min-w-md shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-primary">Registration now!</h1>
        <fieldset className="fieldset ">
             <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input  w-full"
              placeholder="Name"
              required
            />

            {nameError && <p className="text-xs text-error">{nameError}</p>}

            {/* Photo URl  */}
            <label className="label">Photo URl </label>
            <input
              name="photo"
              type="text"
              className="input  w-full"
              placeholder="Photo URl"
              required
            />

          <label className="label">Email</label>
          <input name='email' type="email" className="input  w-full" placeholder="Email" />
          <label className="label">Password</label>
         <div className='relative'>
          <input name='password' type={showPass ? 'text' : "password"} className="input  w-full" placeholder="Password" />
          <button onClick={handlePasswordShow} className='text-2xl top-2 text-center absolute z-10 right-5'>{showPass ? <FaEye></FaEye> : <LuEyeClosed></LuEyeClosed>}</button>
          </div>
         <div>
            <label className="label">
         <input name='terms' type="checkbox" className="checkbox" />
        Accept our terms and condition
        </label>
           </div>

          {
            success && <p className='text-green-500'>Account Crteated Sussessfully</p>
          }
           {
          error && <p className='text-red-500'>{error.message}! provide a valid email or passowerd</p>  
        }
          <button className="btn btn-secondary text-white hover:border-white mt-4">Register</button>

          <button type='button' onClick={handleGoogleSignIn} className="btn bg-white text-black hover:border-secondary">
  <FcGoogle></FcGoogle>
  Login with Google
</button>

          <p>Already have an account ? Please <Link className='text-secondary' to='/login'>Sign in</Link></p>
        </fieldset>
        </form>
      </div>
    </div>
  </div>
    </div>
      </div>
    );
};

export default Registration;