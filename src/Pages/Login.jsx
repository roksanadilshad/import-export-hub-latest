import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "./Loader";



const Login = () => {
    const {signInUser, signInWithGoogle, loading} = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
     const [err, setErr] = useState(null);
     const [showPass, setShowPass] = useState(false);
     const [email, setEmail] = useState('')
     

    //default direct after login
    const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) =>{
    e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
     
      //console.log(email, password);
      setErr(null)
      signInUser(email, password)
      .then(() =>{
        //console.log(result);
        navigate(from, {replace:true})
        //toast.success('Logged in successfully! 🎉');
      })
      .catch(err => {
        //toast.error(err.message);
        setErr(err)
      })
      
  }
   const handleGoogleSignIn = () =>{
         signInWithGoogle()
         .then(result => {
            console.log(result.user);
            navigate(from, {replace:true})
           //toast.success('Logged in successfully! 🎉');
         })
         .catch(err => {
            //toast.error(err.message);
            console.log(err); 
         })
    }

    const handlePasswordShow = e =>{
      e.preventDefault();
      setShowPass(!showPass)
    }

   
    return (
      <div>
        <div><title>Log In</title></div>
{
  loading ? (<Loader></Loader>) : (<div className=" lg:mt-40 mt-20  min-h-screen">
  <div className=" flex-col flex justify-center items-center ">
    <div className="text-center">
    </div>
    <div className="card bg-neutral w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
           <h1 className="text-3xl font-bold text-primary text-center">Please Login</h1>

        <fieldset className="fieldset">
          <label  className="label">Email</label>
          <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}  name='email' 
          type="email" 
          className="input" 
          placeholder="Email" />
          <label className="label">Password</label>
          <div className='relative'>
                    <input name='password' type={showPass ? 'text' : "password"} className="input" placeholder="Password" />
                    <button type="button" onClick={handlePasswordShow} className='text-2xl top-2 text-center absolute z-10 right-5'>{showPass ? <FaEye></FaEye> : <LuEyeClosed></LuEyeClosed>}</button>
                    </div>
          <button><a className="button link-hover text-left">Forgot password?</a></button>

          {
            err && <p className="text-red-700">Please provide a valid Email or Password !</p>
          }
          <button className="btn btn-secondary text-white mt-4 hover:border-white">Login</button>
        </fieldset>
        </form>
        {/* google */}
        <button type='button' onClick={handleGoogleSignIn} className="btn bg-white text-black hover:border-secondary">
  <FcGoogle></FcGoogle>
  Login with Google
</button>
<p>Don't have an account? please <Link className='text-secondary' to='/register'>Sign up</Link></p>
      </div>
    </div>
  </div>
</div>

  )
}
       
      </div>
    );
};

export default Login;