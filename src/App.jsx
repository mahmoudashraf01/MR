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
// import CompanyDataForm2 from './components/Auth/register/Company/components/CompanyDataForm2'



function App() {

  const routesArray = [
    // Company registration layout (root) — index shows RegisterCompanyForm
    {
      path: '/',
      element: <Auth />,
      children: [
        { index: true, element: <ChooseAcount /> },
        { path: 'login', element: <Login /> },
        { path: 'companyForm1', element: <CompanyDataForm1 /> },
        { path: 'companyForm2', element: <CompanyDataForm2 /> },
      ],
    },

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
  ];

  let routesElement = useRoutes(routesArray)

  return <div>{routesElement}</div>
}

export default App
