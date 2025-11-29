import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ImportCard from "../Components/ImportCard";
import Skleton from "./Skleton";
import Loading from "./Loading";

const MyImports = () => {
       const { user, loading, setLoading } = useContext(AuthContext);
       const [products, setProducts] = useState([]);
     //console.log(user);
     
  useEffect(() => {
       if (!user?.accessToken) return;
   
       // setLoading(true);
       fetch(`https://import-export-server.vercel.app/my-imports?email=${user.email}`, {
         headers: {
           authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        const margeProduct = [];

        data.forEach((importItem)=>{
            const existing = margeProduct.find(
                (p) => p.productId === importItem.productId
            );
            if(existing){
                existing.quantity += importItem.quantity || 0;
                     
            }
            else{
                margeProduct.push({...importItem})
            }
        })
        //console.log(margeProduct);
        setProducts(margeProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching imports:", err);
        setLoading(false);
      });
  }, [user, setLoading]);

  if (loading) {
    return <div><Skleton count={products.length}></Skleton></div>;
  }

  return (
    <div>
      <div>

      <title>My Imports</title>
      </div>
      <h2 className='border-b-4 border-secondary lg:w-120 w-80 mx-auto  font-bold text-2xl lg:text-4xl text-center text-accent my-5 lg:my-10'>MY IMPORT PRODUCTS</h2>
      <div className=" w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-10">
        { loading ? (<Skleton count={products.length}></Skleton>) : 
       ( products.map((products) => (
          <ImportCard key={products._id} setProducts={setProducts} products={products} />
        )))
        }
      </div>
    </div>
  );
};

export default MyImports;
