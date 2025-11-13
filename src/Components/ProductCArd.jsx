import React from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart, FaRegStar, FaStar } from 'react-icons/fa6';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router';
import RatingStars from './RatingStars';

const ProductCard = ({products}) => {
      //console.log(products);

    const {productImage,
        productName, _id,
        price,
        originCountry, 
        rating,
    availableQuantity,
} = products
    
    return (
        <div>
           <div className="card h-full  bg-neutral w-full shadow-sm rounded-2xl">
    <div className="relative">
    <img
      src={productImage}
      alt={productName}
      className="h-100 w-full object-cover rounded-t-2xl"
    />

    {/* Shopping cart icon */}
    <FiShoppingCart className="absolute top-3 left-3 text-3xl bg-secondary text-primary p-1 rounded cursor-pointer hover:bg-primary hover:text-accent transition-all " />

    {/* Heart icon */}
    <FaHeart className="absolute top-3 right-3 text-3xl text-secondary hover:text-primary cursor-pointer transition-all" />
  </div>
  <div className="text-center text-primary">
    <h2 className="text-2xl font-semibold text-primary">{productName
}</h2>
    <div className='flex justify-evenly items-center'>
    <span>Available:{availableQuantity}</span>
    <span>Price:{price}$</span>
    </div>
    <div className='flex justify-center items-center'>
          <RatingStars rate={rating} />
    </div>
    <span>Made in {originCountry}</span>
    <span>
        
        </span>
    
    <div className="card-actions justify-end mb-4 mx-2">
      <Link to={`/productDetails/${_id}`} className="btn border-white btn-secondary w-full">See Details</Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default ProductCard;