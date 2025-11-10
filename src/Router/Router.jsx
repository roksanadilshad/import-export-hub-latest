import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/root';
import Home from '../Pages/Home';
import Registration from '../Pages/Register';
import Login from '../Pages/Login';
import AllProducts from '../Pages/AllProducts';
import ProductDetails from '../Pages/ProductDetails';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    //errorElement:<p>Add Firebase</p>,
    children: [
        {
            index: true,
            loader:()=> fetch('http://localhost:3000/products'),
            element:<Home></Home>,
        },
        {
          path:'/register',
          element:<Registration></Registration>
        },
        {
          path:'/login' ,
         element:<Login></Login>
        },
       
        {
          path:'/allProducts' ,
          loader:()=> fetch('http://localhost:3000/products'),
         element:<AllProducts></AllProducts>
        },
        {
          path:'/productDetails/:id' ,
         element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        },
       
    ]
  },
]);
