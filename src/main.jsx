import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './Helpers/ScrollToTop.js'
import AuthProvider from './contexts/AuthContext.jsx'
import { LoadScript } from '@react-google-maps/api'
import { apiKey } from './Helpers/const/const'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </LoadScript>
    </Provider>
  </StrictMode>
)
