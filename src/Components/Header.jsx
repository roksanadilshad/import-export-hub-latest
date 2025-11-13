import React, { use, useEffect, useState} from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { FaLock } from 'react-icons/fa';

const Header = () => {
    const {user, signOutUser} = use(AuthContext);
    //console.log(user);
     const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
      html.classList.toggle('dark', theme === 'dark') 
     localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }
    const handleSignout = () =>{
        signOutUser()
        .then()
        .catch()
    }
    const links = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/allProducts'>All Products</NavLink></li>
    <li><NavLink to='/my-exports'>My Exports</NavLink></li>
    <li><NavLink to='/myImports'>My Imports</NavLink></li>
    <li><NavLink to='/addExport'>Add Export</NavLink></li>
    </>
    return (
        <div className=" bg-[#8FABD4] lg:px-20  navbar shadow-sm flex justify-between items-center">
  <div className="flex justify-between items-center">
    <div className="dropdown">
       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
   <div>
    
   </div>
    <Link to='/'>
     <div className='flex justify-center items-center'>
      
   <img src="https://i.ibb.co.com/QvWc04mY/t-removebg-preview.png" alt=""  className='w-15 '/>
   <h3 className='font-bold text-xl lg:text-2xl text-[#EFECE3]'>Import Export <span className='text-[#4A70A9]'>Hub</span></h3>
    </div>
    </Link>
  <div className="justify-center items-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-primary font-semibold">
      {links}
    </ul>
  </div>
  </div>
  <div className="flex justify-center items-center">
    <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle mr-4"/>
    {
        user ? 
        (<>
       <div className='flex justify-around items-center gap-6'> <a href='/profile' className=""><img src={user?.photoURL || 'https://images.unsplash.com/photo-1747592771443-e15f155b1faf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500'} className='lg:w-12 lg:h-12 w-10 h-10 rounded-full' title={user.displayName} /></a>
        <button onClick={handleSignout} className='btn border-white btn-secondary text-white  mr-1 '>Log Out</button></div>
        </>) : (<>
         <NavLink className='btn border-white btn-secondary text-white  mr-1 ' to='/register'>Register</NavLink>
       <NavLink className='btn border-white btn-secondary text-white  mr-1 ' to='/login'><FaLock></FaLock>Login</NavLink>
        </>)

    }
  </div>

</div>
    );
};

export default Header;