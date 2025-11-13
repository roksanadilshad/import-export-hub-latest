import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';
import { useParams } from 'react-router';


import RatingStars from './RatingStars';
import ImportModal from './ImportModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
   //const [refetch, setRefeth] = useState(false)

 //console.log(user);
 
  useEffect(() => {
    if (!user?.accessToken) return;
    //setLoading(true);
    fetch(`http://localhost:3000/products/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data,id);
        
        setProduct(data.result)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, id, setLoading]);

    //console.log(product);

   const {
    productImage,
    productName,
    price,
    originCountry,
    rating,
    availableQuantity,
    _id
  } = product;

  const handleImported = (quantity) => {
    setProduct((prev) => ({
      ...prev,
      availableQuantity: prev.availableQuantity - quantity,
    }));
  }


  if (loading || !product?._id) {
  return <Loading />;
}



  return (
    <div>
      <div>

   <title>Product Details</title>
      </div>
    <div className="card-side card bg-neutral shadow-sm mx-10 my-20">
      {/* <div className="flex flex-col lg:flex-row bg-neutral shadow-2xl rounded-3xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all"> */}
        {/* Product Image */}
        {/* <div className="lg:w-1/2 relative  overflow-hidden flex justify-center items-center bg-gray-50"> */}
       <div className=''>

          <img
            src={productImage}
            alt={productName}
            className="w-full h-full  transition-transform transform group-hover:scale-105 group-hover:rotate-1"
          />
       </div>
      
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-20 transition-opacity duration-700"></div> */}
        {/* </div> */}
        <div className='w-[50%]'>
        <div className="p-10 flex flex-col justify-between space-y-6">
          <h2 className="text-4xl font-extrabold bg-accent bg-clip-text text-transparent">
            {productName}
          </h2>

          <div className="flex items-center space-x-3 text-amber-400">
            <span className="text-lg font-semibold text-gray-800">{rating}</span>
            <RatingStars rating={rating} />
          </div>

          <div className="space-y-3 text-gray-700 font-medium">
            <p>
              <span className="font-bold">Price:</span> ${price}
            </p>
            <p>
              <span className="font-bold">Available:</span> {availableQuantity}
            </p>
            <p>
              <span className="font-bold">Made in:</span> {originCountry}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-secondary border-white text-white font-bold py-3 px-6 rounded-xl hover:scale-105 hover:shadow-xl transition-transform duration-500 ease-in-out"
          >
            Import Now
          </button>

          {showModal && (
            <ImportModal
              product={product}
              onClose={() => setShowModal(false)}
              handleImported={handleImported}
            />
          )}
        </div>
        </div>
        {/* Product Info */}
     {/* </div>  */}
    </div>
    </div>
  );
};

export default ProductDetails;
