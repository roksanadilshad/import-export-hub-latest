import React, { use, useState, } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import ProductCard from '../Components/ProductCArd';

const AllProducts = () => {
    const data = useLoaderData();
    const [products, setProducts] = useState(data)
    const {loading,setLoading} = use(AuthContext)

    //console.log(products);
    
   const handleSearch = (e) => {
    e.preventDefault()
    const search_text = e.target.search.value
    console.log(search_text)
    setLoading(true)

    fetch(`https://3d-model-server.vercel.app/search?search=${search_text}`)
    .then(res=> res.json())
    .then(data=> {
      //console.log(data)
      setProducts(data)
      setLoading(false)
    })
  }
    return (
        <div>
           <div className='py-10'>

           <h2 className='border-b-4 border-secondary w-100 mx-auto  font-bold text-4xl text-center text-accent '>ALL PRODUCTS</h2>
        </div>

        <form onSubmit={handleSearch} className='pb-10 flex justify-center items-center
        '>
            <input type="search" name="search" placeholder='Search products 🔎︎' className='py-2 px-4 bg-neutral rounded-l text-[#777777e8]' />
            <button className="btn btn-secondary rounded-l-none">{loading ? "Searching...." : "Search"}</button>
        </form>

        <div className=" w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {products.map((product) => (
          <ProductCard basePath="/products" key={product._id} products={product} />
        ))}
        </div>
        </div>
    );
};

export default AllProducts;