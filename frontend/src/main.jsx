import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Help from './pages/Help.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> } /> {/* Homepage/Index */}
      <Route path='help' element={<Help /> } />
      <Route path='login' element={<Login />} />
    </Routes>
  </BrowserRouter>
)
