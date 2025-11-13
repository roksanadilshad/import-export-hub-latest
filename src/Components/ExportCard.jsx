import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import UpdateExport from './UpdateExport';
import RatingStars from '../Pages/RatingStars';


const ExportCard = ({products, setProducts}) => {
     const [showModal, setShowModal] = useState(false);


    const {productImage,
        productName, _id,
        price,
        originCountry, 
        rating,
    availableQuantity,
} = products
    
const handleDlete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://import-export-server.vercel.app/exports/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if(data.success){
                Swal.fire("Deleted!", "Your product has been deleted.", "success");
                setProducts((prev) => prev.filter((p) => p._id !== _id));
            }
            else{
             Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
    })
}

    return (
        <div>
            <div>
           <div className="card h-full  bg-neutral w-full shadow-sm rounded-2xl">
    <div className="relative">
    <img
      src={productImage}
      alt={productName}
      className="h-100 w-full object-cover rounded-t-2xl"
    />

    {/* Shopping cart icon */}
    <FiShoppingCart className="absolute top-3 left-3 text-3xl bg-secondary text-primary p-1 rounded cursor-pointer hover:bg-primary hover:text-accent transition-all" />

    {/* Heart icon */}
    <FaHeart className="absolute top-3 right-3 text-3xl text-secondary hover:text-primary cursor-pointer transition-all" />
  </div>
  <div className="text-center text-primary">
    <h2 className="text-2xl font-semibold text-primary dark:text-accent">{productName
}</h2>
    <div className='flex justify-evenly items-center'>
    <span>Available:{availableQuantity}</span>
    <span>Price:{price}$</span>
    </div>
    <div className='flex justify-center items-center'>
         {rating} <RatingStars rate={rating} />
    </div>
    <span>Made in {originCountry}</span>
    <span>
        
        </span>
    
    <div className="card-actions flex  justify-evenly items-center mb-4">
      <button onClick={handleDlete} className="btn btn-secondary border-white">Remove</button>
       <button
            onClick={() => setShowModal(true)}
            className="btn btn-secondary border-white"
          >
            Update
          </button>

          {showModal && (
            <UpdateExport
              product={products}
  onClose={() => setShowModal(false)}
 setProducts={setProducts}
            />
          )}
    </div>
  </div>
</div>
        </div>
        </div>
    );
};

export default ExportCard;