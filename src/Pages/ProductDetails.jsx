import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';
import { useParams } from 'react-router';
import RatingStars from './RatingStars';
import ImportModal from './ImportModal';
import ProductCard from '../Components/ProductCArd';
import ErrorPage from './ErrorPage';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
   //const [refetch, setRefeth] = useState(false)

 //console.log(user);
 
  useEffect(() => {
    if (!user?.accessToken) return;
    //setLoading(true);
    fetch(`https://import-export-server.vercel.app/products/${id}`, {
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

      fetch(`https://import-export-server.vercel.app/latest-products`)
      .then(res => res.json())
      .then(data => setLatestProducts(data));
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
 
    const showProducts = latestProducts.slice(0,4)
   
  const handleImported = (quantity) => {
    setProduct((prev) => ({
      ...prev,
      availableQuantity: prev.availableQuantity - quantity,
    }));
  }

  if (loading || !product?._id) {
  return <Loading></Loading>;
}

  return (
    <div>
      <div>

   <title>Product Details</title>
      </div>
    <div className="flex justify-between lg:flex-row flex-col bg-neutral shadow-sm rounded-2xl mx-2 lg:mx-10 my-2 lg:my-20">
      
       <div className=''>
          <img
            src={productImage}
            alt={productName}
            className="w-full rounded-2xl h-full  transition-transform transform group-hover:scale-105 group-hover:rotate-1"
          />
       </div>
        <div className='lg:w-[50%]'>
        <div className="lg:p-10 p-5 flex flex-col justify-between lg:space-y-6 space-y-2">
          <h2 className="lg:text-4xl text-2xl font-extrabold bg-accent bg-clip-text text-transparent">
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

          <h2 className='border-b-4 border-secondary lg:w-100 w-80 mx-auto  font-bold lg:text-4xl text-2xl text-center text-accent py-5'>LATEST PRODUCTS</h2>
           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  py-5 lg:py-10'>
            {
              showProducts.map(products => <ProductCard products={products} key={products._id}></ProductCard> )
            }
           </div>
           
        </div>
        </div>
       
    </div>
    </div>
  );
};

export default ProductDetails;
