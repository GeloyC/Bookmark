import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

// icons
import ArrowDown from '/src/assets/icons/arrow-down.svg?react';

// service

const Navigation = ({
  setLoginModalOpen,
  setCreateAccountModalOpen,
  user
}) => {

  const location = useLocation();

  const [accountDropdown, setAccountDropdown] = useState(false);

  return (
    <>
      <div className={`sticky top-0 flex flex-row ${user ? 'justify-center' : 'justify-between'} items-center min-h-[60px] box-border z-20`}>
          <Link to="/" className='flex items-center justify-center'>
              {/* LOGO HERE */}
              <span className='text-[#8cd56a] text-[28px] font-bold'>LINK SAVER</span>
          </Link>

          {!user && (
            <div className='flex flex-row items-center h-full'>
              <div className='flex items-center overflow-hidden gap-2'>
                <button onClick={() => setLoginModalOpen(true)} className={`cursor-pointer flex items-center font-bold h-full w-full bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 p-3 rounded-[15px] text-[#FAFAFA]`}>Login</button>
                <button onClick={() => setCreateAccountModalOpen(true)} className='cursor-pointer flex items-center bg-[#71cb47] text-[#141414] font-bold h-full w-full p-3 rounded-[15px] text-[#141414] whitespace-nowrap hover:bg-[#71cb47]/75 active:bg-[#71cb47]'>Create Account</button>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Navigation