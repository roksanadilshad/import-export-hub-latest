import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { FaStar, FaStarHalf } from 'react-icons/fa6';
import ImportModal from './ImportModal';
import RatingStars from './RatingStars';


 const ProductDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
   const [product,setProduct] = useState({});
   const {user, loading, setLoading} = use(AuthContext);
   const [refetch, setRefecth] = useState(false)
   const [showModal, setShowModal] = useState(false);
   //console.log(product);

   const {productImage,
        productName
,
        price,
        originCountry, 
        rating,
    availableQuantity,
} = product
   

   useEffect(()=>{
     if (!user?.accessToken) return;
          fetch(`http://localhost:3000/products/${id}`,{
         headers:{
        authorization: `Bearer ${user.accessToken}`
         },
         }).then(res=>res.json())
         .then(data=> {
         console.log(data);
         setProduct(data.result)
         setLoading(false)
         })
       },[user, id, refetch]);

  const handleImported = (quantity) => {
    // optional: decrease product quantity in UI immediately
    product.availableQuantity -= quantity;
  };

 



    return (
        <div className='w-11/12 mx-auto'>
            <div className="card lg:card-side bg-primary shadow-sm">
 <div>

    <img
      src={productImage}
      alt={productName} 
      className='lg:w-[75%] lg:h-[95%] rounded-2xl'/>
 </div>
 
  <div className="card-body *:not-first:text-xl">
    <h2 className="card-title font-bold text-4xl">{productName}</h2>
    <div className='text-amber-400 flex  items-center'>
    <span className='text-accent'>{rating}</span>
   <RatingStars rating={{rating}}/>
    </div>
    <span>Price:{price}$</span>
    <span>Available:{availableQuantity}</span>
    <span>Made In {originCountry}</span>
    <div className="card-actions ">
      <button onClick={() => setShowModal(true)} className="btn btn-secondary border-white">Import Now</button>
      {
        showModal && (
            <ImportModal product={product} onClose={() => setShowModal(false)}
            handleImported={handleImported}></ImportModal>
        )
      }
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductDetails;