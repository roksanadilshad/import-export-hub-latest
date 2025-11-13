import React from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaCartShopping, FaXTwitter } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { TbBrandGoogle } from 'react-icons/tb';
import WhatIDo from './whatIDo';
import { useLoaderData } from 'react-router';
import AllProducts from './AllProducts';
import ProductCard from '../Components/ProductCArd';

const Home = () => {
    const products = useLoaderData()
    //console.log(latestProducts);
    const latestProducts = products.slice(0,6)
    return (
        <div>
            <div>
           <title>Home</title>
            </div>
            <div className="relative bg-[url('https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg')] bg-cover bg-center h-screen">
            <div className="absolute inset-0 bg-black/30"></div>

            <div className='relative  z-10 pt-64 w-11/12 mx-auto *:pb-2'>
            <h4 className='text-2xl text-primary font-bold'>Connecting Global Markets, One Click at a Time</h4>
            <h2 className='text-4xl text-white font-bold'>Discover, import, and export products worldwide <br/>
            <span className='text-6xl text-accent font-bold' >— all from one seamless platform
                </span></h2>

                <button className='btn my-5  border-white btn-secondary text-white pt-1'>CONTACT ME<span><IoIosArrowForward></IoIosArrowForward></span></button>
                <div className='*:btn flex *:text-lg  *:not-first:m-2 *: *:bg-secondary *:rounded-full *:p-1 *:hover:bg-white  *:hover:text-secondary *:text-primary *:dark:text-accent items-center w-[30%] '>
                   <CiFacebook></CiFacebook>
                   <FaXTwitter></FaXTwitter>
                   <TbBrandGoogle></TbBrandGoogle>
                   <CiLinkedin></CiLinkedin>
                </div>
                
        </div>
            </div>     
    <WhatIDo></WhatIDo>

    <section>
        <div className='py-20'>

           <h2 className='border-b-4 border-secondary w-100 mx-auto  font-bold text-4xl text-center text-accent '>LATEST PRODUCTS</h2>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-11/12 mx-auto pb-20'>
            {
                latestProducts.map(products=> <ProductCard key={products._id} products={products}></ProductCard>)
            }
        </div>
    </section>


    

        </div>
    );
};

export default Home;