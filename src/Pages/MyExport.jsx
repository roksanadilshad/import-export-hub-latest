import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import AddExport from './AddExport';
import ExportCard from '../Components/ExportCard';
import Skleton from './Skleton';
import Loading from './Loading';

const MyExport = () => {
     const {user} = use(AuthContext)
    const [products, setproducts] = useState([])
    const [loading, setLoading] = useState(true)
    
    
    useEffect(()=> {

        fetch(`https://import-export-server.vercel.app/my-exports?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            
            setproducts(data)
            setLoading(false)
        })

    }, [user])

    if(loading) {
        return <div><Skleton count={products.length}></Skleton></div>
    }

    return (
        <div>
            <div>

            <title>My Export</title>
            </div>
            <h2 className='border-b-4 border-secondary w-120 mx-auto  font-bold text-4xl text-center text-accent my-10'>MY EXPORT PRODUCTS</h2>
           <div className='w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-10 h-screen'>
            { loading ? (<Skleton count={products.length}></Skleton>) :
           ( products.map(products => <ExportCard key={products._id} setProducts={setproducts} products={products}></ExportCard>))
            }
           </div>
        </div>
    );
};

export default MyExport;