import React, { useState } from 'react'

// components
import Home from './pages/Home';
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
      <div className='relative flex flex-col w-full h-full bg-[#141414] p-[1rem] px-[16rem]'>
        <Navigation 
          setLoginModalOpen={setLoginModalOpen}
          setCreateAccountModalOpen={setCreateAccountModalOpen}
          user={user}
        />
        <Home />

        {loginModalOpen && (
          <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur z-20'>
              <LoginModal
                  setCloseModal={setLoginModalOpen}
              />
          </div>
        )}

        {createAccountModalOpen && (
          <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
              <CreateAccountModal
                  setCloseModal={setCreateAccountModalOpen}
              />
          </div>
        )}

      </div>
  )
}

export default App;
