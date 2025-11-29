import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { LuEyeClosed } from 'react-icons/lu';
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const Registration = () => {
  const { createUser, setUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const [nameError, setNameError] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const terms = e.target.terms.checked;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 6 characters long, include uppercase, lowercase, and a special character');
      toast.error('Password must be at least 6 characters long, include uppercase, lowercase, and a special character');
      return;
    }

    if (name.length < 5) {
      setNameError('Name should be more than 5 characters');
      return;
    } else {
      setNameError('');
    }

    setError(null);
    setSuccess(false);

    if (!terms) {
      toast.error('Please accept our terms and conditions.');
      return;
    }

    createUser(email, password, terms)
      .then(result => {
        const user = result.user;
        setSuccess(true);
        e.target.reset();
        updateUserProfile()
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            setSuccess(true);
            setError('');
            toast.success("Sign up successful");
            navigate(from, { replace: true });
          });
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
        setSuccess(false);
      });
  };

  const handlePasswordShow = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Sign up successful");
        navigate(from, { replace: true });
      })
      .catch(err => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-neutral shadow-2xl rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">Register now!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input name="name" type="text" className="input w-full" placeholder="Name" required />
            {nameError && <p className="text-xs text-error">{nameError}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">Photo URL</label>
            <input name="photo" type="text" className="input w-full" placeholder="Photo URL" required />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input name='email' type="email" className="input w-full" placeholder="Email" required />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label">Password</label>
            <input
              name='password'
              type={showPass ? 'text' : 'password'}
              className="input w-full pr-12"
              placeholder="Password"
              required
            />
            <button onClick={handlePasswordShow} className="absolute right-3 top-9 text-xl text-gray-600">
              {showPass ? <FaEye /> : <LuEyeClosed />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input name='terms' type="checkbox" className="checkbox" />
            <label>Accept our terms and conditions</label>
          </div>

          {/* Feedback messages */}
          {success && <p className='text-green-500'>Account created successfully!</p>}
          {error && <p className='text-red-500'>{error}</p>}

          {/* Buttons */}
          <button className="btn btn-secondary w-full text-white mt-2">Register</button>
          <button type='button' onClick={handleGoogleSignIn} className="btn bg-white text-black w-full flex items-center justify-center gap-2 mt-2 hover:border-secondary">
            <FcGoogle /> Sign in with Google
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account? <Link className='text-secondary' to='/login'>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
