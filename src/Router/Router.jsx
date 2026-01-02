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
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Dashboard from '../Layouts/Dashboard';
import DashboardHome from '../Pages/Dashboard.jsx/DashboardHome';
import Profile from '../Pages/Dashboard.jsx/Profile';

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
          path:'/about' ,
         element:<About/>
        },
        {
          path:'/contact' ,
         element:<Contact/>
        },
        {
          path:'/allProducts' ,
          loader:()=> fetch('https://import-export-server.vercel.app/products'),
         element:<AllProducts></AllProducts>
        },
        {
          path:'/productDetails/:id' ,
         element:<ProductDetails></ProductDetails>
        },

       
        {
          path:'/*',
          element:<ErrorPage></ErrorPage>
        }
       
       
    ],
  },
     {
    path: "dashboard",
    element: <PrivateRoute><Dashboard/></PrivateRoute>,
    children: [
      {
          path:'myImports' ,
         element:<MyImports></MyImports>
        },
        {
          path:'imported-products/:id' ,
         element:<ProductDetails></ProductDetails>
        },
        {
          path:'addExport' ,
         element:<AddExport></AddExport>
        },
        {
          path:'my-exports' ,
         element:<MyExport></MyExport>
        },
       
        {
          path:'dashboardHome' ,
         element:<DashboardHome/>,
        },
        {
          path:'profile' ,
         element:<Profile/>,
        },
        {
          path:'updateExport/:id' ,
         element:<UpdateExport></UpdateExport>,
        },
     
    ]

  },
]);
