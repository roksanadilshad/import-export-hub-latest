import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center flex-col  h-screen'>
            
            <img className='rounded-2xl' src="https://i.pinimg.com/736x/ed/1c/0d/ed1c0dc5442b37049edc08e7a53cba90.jpg" alt="" />
             <button
      onClick={() => navigate(-1)}
      className="btn btn-secondary border-white mt-4"
    > Go Back
    </button>
            
        </div>
    );
};

export default ErrorPage;