import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> } /> {/* Homepage/Index */}
      <Route path='login' element={<Login />} />
    </Routes>
  </BrowserRouter>
)
