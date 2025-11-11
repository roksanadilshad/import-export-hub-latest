import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalf } from 'react-icons/fa6';
import ImportModal from './ImportModal';
import RatingStars from './RatingStars';
import { useNavigate, useParams } from 'react-router';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user, loading, setLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const {
    productImage,
    productName,
    price,
    originCountry,
    rating,
    availableQuantity,
  } = product;

  useEffect(() => {
    if (!user?.accessToken) return;
    fetch(`http://localhost:3000/products/${id}`, {
      headers: {
        authorization: `Bearer ${!user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.result){
          navigate('/all-models');
          return;
        }
        setProduct(data.result);
        setLoading(false);
      })
      .catch((err) => {
      console.error(err);
      navigate('/all-models');
    });
  }, [user, id, navigate, setLoading]);

  const handleImported = (quantity) => {
    setProduct(prev => ({
  ...prev,
  availableQuantity: prev.availableQuantity - quantity,
}));

     fetch("http://localhost:3000/imports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${!user?.accessToken}`,
      },
      body: JSON.stringify({
        userId: user.uid,
        productId: product._id,
        quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Swal.fire("Error", data.error, "error");
        } else {
          Swal.fire("Success", "Product imported successfully!", "success");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
    
  };

  
  if (loading) {
    return <div> Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto my-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        {/* Left Image Section */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center items-center bg-[#fff8f0] lg:w-1/2"
        >
          <img
            src={productImage}
            alt={productName}
            className="w-[90%] h-[90%] object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Details Section */}
        <div className="flex flex-col justify-center lg:w-1/2 p-8 space-y-5">
          <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
            {productName}
          </h2>

          <div className="flex items-center text-yellow-500">
            <span className="text-lg font-semibold mr-2 text-gray-700">
              {rating}
            </span>
            <RatingStars rating={rating} />
          </div>

          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-gray-800">Price:</span> ${price}
          </p>

          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-gray-800">Available:</span>{' '}
            {availableQuantity}
          </p>

          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-gray-800">Made In:</span>{' '}
            {originCountry}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="mt-6  bg-secondary text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            Import Now
          </motion.button>

          {showModal && (
            <ImportModal
              product={product}
              onClose={() => setShowModal(false)}
              handleImported={handleImported}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
