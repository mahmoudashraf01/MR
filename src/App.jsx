import { useRoutes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './components/Auth/login/Login'
import NavbarLayout from './layouts/Layout'
import Contact from './pages/contact'
import Machines from './pages/MAchines'
import About from './pages/About'
import ViewDetails from './pages/ViewDetails'
import TechnicalSpecifications from './components/viewDetails/TechnicalSpecifications'
import CompanyDataForm1 from './components/Auth/register/Company/components/CompanyDataForm1'
import ChooseAcount from './components/Auth/register/ChooseAcount'
import Auth from './pages/Auth'
import CompanyDataForm2 from './components/Auth/register/Company/components/CompanyDataForm2'
import CompanyDataForm3 from './components/Auth/register/Company/components/CompanyDataForm3'
import RenterDataForm1 from './components/Auth/register/Renter/components/RenterDataForm1'
import RenterDataForm2 from './components/Auth/register/Renter/components/RenterDataForm2'
import CompanyRegisterParent from './components/Auth/register/Company/CompanyRegisterParent'
import RenterRegisterParent from './components/Auth/register/Renter/RenterRegisterParent'
import path from 'path'
import RenterDashBoard from './pages/Dashboard/RenterDashBoardSideBar'
import DashboardLayout from './layouts/DashboardLayout'
import MyBookings from './pages/Dashboard/Navigations/MyBookings/MyBookings'



function App() {

  const routesArray = [

    // Main site layout with navbar for the rest of pages
    {
      path: '/',
      element: <NavbarLayout />,
      children: [
        { index: true, element: <Landing /> },
        { path: 'machines', element: <Machines /> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'viewDetails/:id', element: <ViewDetails /> },
        { path: 'technicalSpecifications', element: <TechnicalSpecifications /> },
        // fallback for unknown paths under navbar layout
        { path: '*', element: <Landing /> },
      ],
    },

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <div className="p-8"><h1>Overview</h1><p>Welcome to your dashboard overview.</p></div> },
        { path: 'myBookings', element: <MyBookings /> },
        { path: 'profile', element: <div className="p-8"><h1>Profile</h1><p>Manage your profile here.</p></div> },
        { path: 'settings', element: <div className="p-8"><h1>Settings</h1><p>Adjust your settings here.</p></div> },
      ],
    },

    // Company registration layout (root) — index shows RegisterCompanyForm
    {
      path: 'auth',
      element: <Auth />,
      children: [
        { index: true, element: <ChooseAcount /> },
        { path: 'login', element: <Login /> },

        // Company Registration Steps as nested routes
        {
          path: 'registerCompany',
          element: <CompanyRegisterParent />,
          children: [
            { index: true, element: <CompanyDataForm1 /> },
            { path: 'step2', element: <CompanyDataForm2 /> },
            { path: 'step3', element: <CompanyDataForm3 /> },
          ],
        },

        //Renter Registration Steps as nested routes
        {
          path: 'registerRenter',
          element: <RenterRegisterParent />,
          children: [
            { index: true, element: <RenterDataForm1 /> },
            { path: 'step2', element: <RenterDataForm2 /> },
          ],
        },
      ],
    },


  ];

  let routesElement = useRoutes(routesArray)

  return <div>{routesElement}</div>
}

export default App
