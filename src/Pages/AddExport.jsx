import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddExport = () => {
  const {user} = use(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const formData = {
      productImage: e.target.productImage.value,
      productName: e.target.productName.value,
      price:  parseFloat(e.target.price.value),
      originCountry: e.target.originCountry.value,
      rating: parseFloat(e.target.rating.value),
      availableQuantity: parseInt(e.target.availableQuantity.value, 10),
      createdAt: new Date(),
      exporterEmail: user.email

    }
    const res = await fetch('https://import-export-server.vercel.app/products', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Successfully added!");
      navigate('/'); // or wherever your home/latest-products route is
    }


  }

  
   
    return (
      <div>
        <div>
         <title>Add Export</title>
        </div>
          <div className="card border m-10 border-gray-200 bg-neutral w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
       <h2 className='border-b-4 border-secondary lg:w-80 w-80 mx-auto  font-bold text-2xl lg:text-4xl text-center text-accent my-5 lg:my-10'>ADD NEW PRODUCTS</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Product Name"
            />
          </div>
          <div>
            <label className="label font-medium">Product Image</label>
            <input
              type="url"
              name="productImage"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* price */}
          <div>
            <label className="label font-medium">Price</label>
            <input
              type="text"
              name="price"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Product Price"
            />
          </div> 
          {/* Origin country */}
          <div>
            <label className="label font-medium">Origin Country</label>
            <input
              type="text"
              name="originCountry"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Origin Country"
            />
          </div> 
          <div>
            <label className="label font-medium">Available Quantity</label>
            <input
              type='text'
              name="availableQuantity"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Available Quantity"
            />
          </div> 
          <div>
            <label className="label font-medium">Rating</label>
            <input
              type="text"
              name="rating"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Ratings"
            />
          </div>       
          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-secondary border-white"
          >
            Add Export
          </button>
        </form>
      </div>
    </div>
      </div>
    );
};

export default AddExport;