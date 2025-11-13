import React, { use, useEffect, useState } from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaCartShopping, FaShip, FaXTwitter } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { TbBrandGoogle } from 'react-icons/tb';
import { useLoaderData } from 'react-router';
import ProductCard from '../Components/ProductCArd';
import { RiImportLine } from 'react-icons/ri';
import { FaShoppingBag } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';
import Skleton from './Skleton';

const Home = () => {
    const {loading} = use(AuthContext)
    const products = useLoaderData()
    const [popularProducts, setPopularProducts] = useState([]);
    //console.log(latestProducts);
    const latestProducts = products.slice(0,6)
   
    useEffect(() => {
    fetch('https://import-export-server.vercel.app/popular-products')
      .then(res => res.json())
      .then(data => setPopularProducts(data))
      .catch(err => console.error('Error fetching popular products:', err));
  }, [])


    return (
        <div>
            <div>
           <title>Home</title>
            </div>
            <div className="relative bg-[url('https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg')] bg-cover bg-center bg-no-repeat object-cover lg:h-screen">
            <div className="absolute inset-0 bg-black/40"></div>
         <div className='relative  z-10'>

            <div className='md:pt-10 lg:pt-20 pt-15  xl:pt-64 w-11/12 mx-auto *:pb-2'>
            <h4 className='lg:text-2xl text-[12px] md:text-xl text-primary font-bold'>Connecting Global Markets, One Click at a Time</h4>
            <h2 className='lg:text-4xl xl:text-6 text-[16px] md:text-2xl text-white font-bold'>Discover, import, and export products worldwide <br/>
            <span className='lg:text-6xl xl:text-8xl md:text-5xl text-2xl text-accent font-bold' >— all from one seamless platform
                </span></h2>

                <button className='btn my-5  border-white btn-secondary text-white pt-1'>CONTACT ME<span><IoIosArrowForward></IoIosArrowForward></span></button>
                <div className='*:btn flex lg:*:text-lg  *:not-first:m-2 *: *:bg-secondary *:rounded-full *:p-1 *:hover:bg-white  *:hover:text-secondary *:text-primary *:dark:text-accent items-center w-[30%] '>
                   <CiFacebook></CiFacebook>
                   <FaXTwitter></FaXTwitter>
                   <TbBrandGoogle></TbBrandGoogle>
                   <CiLinkedin></CiLinkedin>
                </div>
                
        </div>
         </div>
            </div>     
               <section className="hidden lg:block relative bg-[url('https://images.pexels.com/photos/3063470/pexels-photo-3063470.jpeg')] bg-cover bg-center bg-no-repeat object-cover pb-10 lg:pb-20">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className='relative  z-10'>
          <div className='lg:py-20 py-8'>
  
             <h2 className='border-neutral  border-b-4 w-60 mx-auto  font-bold lg:text-4xl dark:text-accent text-2xl text-center text-primary'>WHAT I DO</h2>
          </div>
  
             <div className='w-11/12 mx-auto grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-20'>
              <div className='p-4'>
                  <h3 className='lg:text-2xl text-xl dark:text-accent font-bold text-primary pb-4'>IMPORT</h3>
                  <div className='flex justify-between gap-6'>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>Our Import section lets you explore products from trusted global suppliers with verified credentials. Whether you're sourcing raw materials, finished goods, or niche items, you can easily compare prices, check supplier ratings, and place secure import orders. Track your shipments in real time and build long-term partnerships with international manufacturers — all from one dashboard.</p>
                  <RiImportLine className='dark:text-accent text-primary text-5xl w-[70%]'></RiImportLine>
                  </div>
              </div>
              <div className='bg-accent dark:bg-neutral p-4 rounded-2xl'>
                  <h3 className=' lg:text-2xl text-xl dark:text-accent font-bold text-primary pb-4'>EXPORT</h3>
                  <div className='flex justify-between gap-6'>
                       <FaShip className='dark:text-accent text-primary text-5xl w-[70%]'></FaShip>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>The Export section empowers businesses to showcase their products to a global audience. List your export-ready goods, manage orders, and set preferred shipping routes effortlessly. We help you connect with international buyers, streamline documentation, and expand your brand presence in new markets. From order confirmation to delivery, our tools make exporting smooth, transparent, and profitable.</p>
                 
                  </div>
              </div>
              <div className='bg-accent dark:bg-neutral p-4 rounded-2xl'>
                  <h3 className='lg:text-2xl text-xl dark:text-accent font-bold text-primary pb-4'>BUY</h3>
                  <div className='flex justify-between gap-6'>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>Our Buy section simplifies the purchasing process for businesses and individual traders. Browse thousands of verified listings, compare deals from multiple suppliers, and purchase directly through secure payment options. Each product listing comes with detailed specifications and shipping information to help you make smart buying decisions without delays or hidden costs.</p>
                  <FaCartShopping className='dark:text-accent text-primary text-5xl w-[70%]'></FaCartShopping>
                  </div>
              </div>
              <div className='p-4'>
                  <h3 className='lg:text-2xl text-xl dark:text-accent font-bold text-primary pb-4'>SALES</h3>
                  <div className='flex justify-between gap-6'>
                      <FaShoppingBag className='text-primary text-5xl dark:text-accent w-[60%]'></FaShoppingBag>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>In the Sales section, you can manage and monitor every aspect of your selling activity. Add new listings, track performance, respond to buyer inquiries, and view analytics to understand what's driving your sales. Whether you're selling locally or internationally, our platform ensures your products reach the right audience with maximum visibility and minimal effort.</p>
                  
                  </div>
              </div>
             </div>
        </div>
  
       </section>
              
          

    <section>
        <div className='lg:py-20 py-10'>

           <h2 className='border-b-4 border-secondary w-100 mx-auto  font-bold text-4xl text-center text-accent '>LATEST PRODUCTS</h2>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-11/12 mx-auto lg:pb-20'>
           {
            loading ? (<Skleton count={products.length}></Skleton>) : (
                 
                latestProducts.map(products=> <ProductCard key={products._id} products={products}></ProductCard>)
            
            )
           }
        </div>
    </section>
    <section>
        <div className='lg:py-20 py-10'>

           <h2 className='border-b-4 border-secondary w-100 mx-auto  font-bold text-4xl text-center text-accent '>POPULAR PRODUCTS</h2>
        </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-11/12 mx-auto pb-20'>
            { loading ? (<Skleton count={products.length}></Skleton>) :( popularProducts.map(products=> <ProductCard key={products._id} products={products}></ProductCard>))
               
            }
        </div>
        {/* What i Do */}
        <section className="block lg:hidden relative bg-[url('https://images.pexels.com/photos/3063470/pexels-photo-3063470.jpeg')] bg-cover bg-center bg-no-repeat object-cover pb-10 lg:pb-20">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className='relative  z-10'>
          <div className='lg:py-20 py-8'>
  
             <h2 className='border-neutral  border-b-4 w-60 mx-auto  font-bold lg:text-4xl dark:text-accent text-2xl text-center text-primary'>WHAT I DO</h2>
          </div>
  
             <div className='w-11/12 mx-auto grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-20'>
              <div className='p-4'>
                  <h3 className='lg:text-2xl text-xl dark:text-accent font-bold text-primary pb-4'>IMPORT</h3>
                  <div className='flex justify-between gap-6'>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>Our Import section lets you explore products from trusted global suppliers with verified credentials. Whether you're sourcing raw materials, finished goods, or niche items, you can easily compare prices, check supplier ratings, and place secure import orders. Track your shipments in real time and build long-term partnerships with international manufacturers — all from one dashboard.</p>
                  <RiImportLine className='dark:text-accent text-primary text-5xl w-[70%]'></RiImportLine>
                  </div>
              </div>
              <div className='bg-accent dark:bg-neutral p-4 rounded-2xl'>
                  <h3 className=' lg:text-2xl text-xl dark:text-neturl font-bold text-primary pb-4'>EXPORT</h3>
                  <div className='flex justify-between gap-6'>
                       <FaShip className='dark:text-accent text-primary text-5xl w-[70%]'></FaShip>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>The Export section empowers businesses to showcase their products to a global audience. List your export-ready goods, manage orders, and set preferred shipping routes effortlessly. We help you connect with international buyers, streamline documentation, and expand your brand presence in new markets. From order confirmation to delivery, our tools make exporting smooth, transparent, and profitable.</p>
                 
                  </div>
              </div>
              <div className='bg-accent dark:bg-neutral p-4 rounded-2xl'>
                  <h3 className='lg:text-2xl text-xl dark:text-neturl font-bold text-primary pb-4'>BUY</h3>
                  <div className='flex justify-between gap-6'>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>Our Buy section simplifies the purchasing process for businesses and individual traders. Browse thousands of verified listings, compare deals from multiple suppliers, and purchase directly through secure payment options. Each product listing comes with detailed specifications and shipping information to help you make smart buying decisions without delays or hidden costs.</p>
                  <FaCartShopping className='dark:text-accent text-primary text-5xl w-[70%]'></FaCartShopping>
                  </div>
              </div>
              <div className='p-4'>
                  <h3 className='lg:text-2xl text-xl dark:text-accent font-bold text-primary pb-4'>SALES</h3>
                  <div className='flex justify-between gap-6'>
                      <FaShoppingBag className='text-primary text-5xl dark:text-accent w-[60%]'></FaShoppingBag>
                  <p className='font-semibold lg:text-[16px] dark:text-accent text-[12px] text-neutral'>In the Sales section, you can manage and monitor every aspect of your selling activity. Add new listings, track performance, respond to buyer inquiries, and view analytics to understand what's driving your sales. Whether you're selling locally or internationally, our platform ensures your products reach the right audience with maximum visibility and minimal effort.</p>
                  
                  </div>
              </div>
             </div>
        </div>
  
       </section>
    </section>


    

        </div>
    );
};

export default Home;