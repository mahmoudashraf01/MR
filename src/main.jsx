import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './Helpers/ScrollToTop.js'
import CompnyRegisterLayout from './layouts/CompnyRegisterLayout.jsx'
import CompanyDataForm1 from './components/Auth/register/Company/components/CompanyDataForm1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='companyLaout' element={<CompnyRegisterLayout />} >
            <Route path='companyForm1' element={<CompanyDataForm1 />} />
          </Route>
        </Routes>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
