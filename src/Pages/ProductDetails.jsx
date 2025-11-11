import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import ImportModal from './ImportModal';
import RatingStars from './RatingStars';
import Loading from './Loading';
import { useParams } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
   const [refetch, setRefeth] = useState(false)

 
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
        console.log(data,id);
        
        setProduct(data.result)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, id, setLoading, refetch]);

    //console.log(product);

   const {
    productImage,
    productName,
    price,
    originCountry,
    rating,
    availableQuantity,
    exporterEmail,
    _id
  } = product;

  const handleImported = (quantity) => {
    setProduct((prev) => ({
      ...prev,
      availableQuantity: prev.availableQuantity - quantity,
    }));
    // setImportsUpdated((prev) => !prev);
     const finalImport = {
      productImage:productImage,
      productName:productName,
      availableQuantity: product.availableQuantity - quantity,
      exporterEmail: exporterEmail,
      createdAt: new Date(),
      import_by: user.email,
    };

    fetch(`https://localhost:3000/imports/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalImport),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       alert("Successfully downloaded!");
        setRefeth(!refetch)
      })
       .catch((err) => {
        console.log(err);
      });
  }


  if (loading || !product?._id) {
  return <Loading />;
}



  return (
    <div className="w-11/12 mx-auto my-12">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all">
        {/* Product Image */}
        <div className="lg:w-1/2 relative group overflow-hidden flex justify-center items-center bg-gray-50">
          <img
            src={productImage}
            alt={productName}
            className="w-full max-h-[28rem] md:max-h-[24rem] object-contain lg:object-cover transition-transform transform group-hover:scale-105 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-20 transition-opacity duration-700"></div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-between space-y-6">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 hover:shadow-xl transition-transform duration-500 ease-in-out"
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
    </div>
  );
};

export default ProductDetails;
