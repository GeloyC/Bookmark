import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

// service
import { getUser } from './lib/userServices.js'

// context
import { UserContext } from './context/userContext.jsx'

const user = await getUser();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserContext value={user}>
        <Routes>
          <Route element={ <App /> }> 
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </UserContext>
    </BrowserRouter> 
  </QueryClientProvider>
)
