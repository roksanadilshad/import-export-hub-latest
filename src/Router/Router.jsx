import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/Root';
import Home from '../Pages/Home';
import Registration from '../Pages/Register';
import Login from '../Pages/Login';
import AllProducts from '../Pages/AllProducts';
import ProductDetails from '../Pages/ProductDetails';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import MyImports from '../Pages/MyImports';
import AddExport from '../Pages/AddExport';
import MyExport from '../Pages/MyExport';
import UpdateExport from '../Components/UpdateExport';
import ErrorPage from '../Pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    children: [
        {
            index: true,
            loader:()=> fetch('https://import-export-server.vercel.app/latest-products'),
            //errorElement: <p>Page Not Found</p>,
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
          loader:()=> fetch('https://import-export-server.vercel.app/products'),
         element:<AllProducts></AllProducts>
        },
        {
          path:'/productDetails/:id' ,
         element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        },
        
        {
          path:'/myImports' ,
         element:<PrivateRoute><MyImports></MyImports></PrivateRoute>
        },
        {
          path:'/imported-products/:id' ,
         element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        },
        {
          path:'/addExport' ,
         element:<PrivateRoute><AddExport></AddExport></PrivateRoute>
        },
        {
          path:'/my-exports' ,
         element:<PrivateRoute><MyExport></MyExport></PrivateRoute>
        },
       
        {
          path:'/updateExport/:id' ,
         element:<PrivateRoute><UpdateExport></UpdateExport></PrivateRoute>,
        },
        {
          path:'/*',
          element:<ErrorPage></ErrorPage>
        }
       
       
    ]
  },
]);
