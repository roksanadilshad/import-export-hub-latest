import React from 'react';
import { FaFacebook, FaGoogle, FaShip, FaShoppingBag } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

import { RiImportLine } from 'react-icons/ri';


const WhatIDo = () => {
    return (
        <div>
             <section className="relative bg-[url('https://images.pexels.com/photos/3063470/pexels-photo-3063470.jpeg')] bg-cover bg-center bg-no-repeat object-cover pb-20">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className='relative  z-10'>
        <div className='py-20'>

           <h2 className='border-neutral  border-b-4 w-60 mx-auto  font-bold text-4xl text-center text-primary '>WHAT I DO</h2>
        </div>

           <div className='w-11/12 mx-auto grid lg:grid-cols-2 grid-cols-1 gap-20'>
            <div className='p-4'>
                <h3 className='text-2xl font-bold text-primary pb-4'>IMPORT</h3>
                <div className='flex justify-between gap-6'>
                <p className='font-semibold text-neutral'>Our Import section lets you explore products from trusted global suppliers with verified credentials. Whether you're sourcing raw materials, finished goods, or niche items, you can easily compare prices, check supplier ratings, and place secure import orders. Track your shipments in real time and build long-term partnerships with international manufacturers — all from one dashboard.</p>
                <RiImportLine className='text-primary text-5xl w-[70%]'></RiImportLine>
                </div>
            </div>
            <div className='bg-accent p-4 rounded-2xl'>
                <h3 className=' text-2xl font-bold text-primary pb-4 pl-12'>EXPORT</h3>
                <div className='flex justify-between gap-6'>
                     <FaShip className='text-primary text-5xl w-[70%]'></FaShip>
                <p className='font-semibold text-neutral'>The Export section empowers businesses to showcase their products to a global audience. List your export-ready goods, manage orders, and set preferred shipping routes effortlessly. We help you connect with international buyers, streamline documentation, and expand your brand presence in new markets. From order confirmation to delivery, our tools make exporting smooth, transparent, and profitable.</p>
               
                </div>
            </div>
            <div className='bg-accent p-4 rounded-2xl'>
                <h3 className='text-2xl font-bold text-primary pb-4'>BUY</h3>
                <div className='flex justify-between gap-6'>
                <p className='font-semibold text-neutral'>Our Buy section simplifies the purchasing process for businesses and individual traders. Browse thousands of verified listings, compare deals from multiple suppliers, and purchase directly through secure payment options. Each product listing comes with detailed specifications and shipping information to help you make smart buying decisions without delays or hidden costs.</p>
                <FaCartShopping className='text-primary text-5xl w-[70%]'></FaCartShopping>
                </div>
            </div>
            <div className='p-4'>
                <h3 className='text-2xl font-bold text-primary pb-4 pl-12'>SALES</h3>
                <div className='flex justify-between gap-6'>
                    <FaShoppingBag className='text-primary text-5xl w-[60%]'></FaShoppingBag>
                <p className='font-semibold text-neutral'>In the Sales section, you can manage and monitor every aspect of your selling activity. Add new listings, track performance, respond to buyer inquiries, and view analytics to understand what's driving your sales. Whether you're selling locally or internationally, our platform ensures your products reach the right audience with maximum visibility and minimal effort.</p>
                
                </div>
            </div>
           </div>
      </div>

     </section>
            
        </div>
    );
};

export default WhatIDo;