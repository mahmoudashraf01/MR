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
import MyBookings from './pages/Dashboard/Renter/Navigations/MyBookings'
import RenterProfile from './pages/Dashboard/Renter/Navigations/RenterProfile'
import RenterSettings from './pages/Dashboard/Renter/Navigations/RenterSettings'
import RenterDashboardLayout from './layouts/RenterDashboardLayout'
import CompanyDashboardLayout from './layouts/CompanyDashboardLayout'
import ManageMachines from './pages/Dashboard/Company/Navigations/ManageMachines'
import AddMachines from './pages/Dashboard/Company/Navigations/AddMachines'
import Bookings from './pages/Dashboard/Company/Navigations/Bookings'
import CompanyProfile from './pages/Dashboard/Company/Navigations/CompanyProfile'
import CompanySettings from './pages/Dashboard/Company/Navigations/CompanySettings'
import CompanyOverView from './pages/Dashboard/Company/Navigations/CompanyOverView'
import AdminOverView from './pages/Dashboard/Admin/Navigations/AdminOverView'
import AdminDashBoardLayout from './layouts/AdminDashBoardLayout'
import CompanyManagment from './pages/Dashboard/Admin/Navigations/CompanyManagment'
import CategoryManagment from './pages/Dashboard/Admin/Navigations/CategoryManagment'
import AdminBookings from './pages/Dashboard/Admin/Navigations/AdminBookings'
import AdminMachinesManagment from './pages/Dashboard/Admin/Navigations/AdminMachinesManagment'
import AdminSettings from './pages/Dashboard/Admin/Navigations/AdminSettings'
import UsersManagment from './pages/Dashboard/Admin/Navigations/UsersManagment'



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
      path: '/renterDashboard',
      element: <RenterDashboardLayout />,
      children: [
        { index: true, element: <div className="p-8"><h1>Overview</h1><p>Welcome to your dashboard overview.</p></div> },
        { path: 'myBookings', element: <MyBookings /> },
        { path: 'profile', element: <RenterProfile /> },
        { path: 'settings', element: <RenterSettings /> },
      ],
    },

    {
      path: '/companyDashboard',
      element: <CompanyDashboardLayout />,
      children: [
        { index: true, element: <CompanyOverView /> },
        { path: 'manageMachines', element: <ManageMachines /> },
        { path: 'addMachines', element: <AddMachines /> },
        { path: 'companyBookings', element: <Bookings /> },
        { path: 'companyprofile', element: <CompanyProfile /> },
        { path: 'companysettings', element: <CompanySettings /> },
      ],
    },

    {
      path: '/adminDashboard',
      element: <AdminDashBoardLayout />,
      children: [
        { index: true, element: <AdminOverView /> },
        { path: 'companyManagment', element: <CompanyManagment /> },
        { path: 'categoryManagment', element: <CategoryManagment /> },
        { path: 'cmachineManagment', element: <AdminMachinesManagment /> },
        { path: 'adminBookings', element: <AdminBookings /> },
        { path: 'allUsers', element: <UsersManagment /> },
        { path: 'adminSettings', element: <AdminSettings /> },
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
