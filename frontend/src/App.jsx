import React, { useState } from 'react'

// components
import Home from './pages/Home';
import { GuestHhome } from './pages/GuestHome';
import Navigation from './components/Navigation';
import { LoginModal } from './components/modal/LoginModal';
import { CreateAccountModal } from './components/modal/CreateAccountModal';

// hook
import { useUserContext } from './context/userContext';

function App() {

  const user = useUserContext();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createAccountModalOpen, setCreateAccountModalOpen] = useState(false);

  return (
      <div className="relative flex flex-col w-full h-screen">
        <Navigation 
          setLoginModalOpen={setLoginModalOpen}
          setCreateAccountModalOpen={setCreateAccountModalOpen}
          user={user}
        />

        {user ? (
          <Home />
        ): (
          <GuestHhome 
            setCreateAccountModalOpen={setCreateAccountModalOpen}
          />
        )}

        {loginModalOpen && (
          <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
              <LoginModal
                  setCloseModal={setLoginModalOpen}
              />
          </div>
        )}

        {createAccountModalOpen && (
          <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
              <CreateAccountModal
                  setCloseModal={setCreateAccountModalOpen}
              />
          </div>
        )}

      </div>
  )
}

export default App;
