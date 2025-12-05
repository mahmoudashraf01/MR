import { use, useState } from 'react'
import Landing from './pages/Landing'
import { useParams, useRoutes } from "react-router-dom";
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import NavbarLayout from './layouts/Layout'
import Contact from './pages/contact';
import Machines from './pages/MAchines';
import About from './pages/About';
import ViewDetails from './pages/ViewDetails';
import TechnicalSpecifications from './components/viewDetails/TechnicalSpecifications';
// import AppRouters from './Helpers/Routes/AppRoutes'



function App() {

  const routesArray = [
    {
      path: '/',
      element: <NavbarLayout />,
      children: [
        // { index: true, element: <Landing /> },
        { path: 'landing', element: <Landing /> },
        { index: true, element: <Register /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: 'machines', element: <Machines /> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'viewDetails/:id', element: <ViewDetails /> },
        { path: 'technicalSpecifications', element: <TechnicalSpecifications /> },
        { path: '*', element: <Landing /> },
      ],
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <>
      <div>{routesElement}</div>
    </>
  )
}

export default App
