import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

// icons
import ArrowDown from '/src/assets/icons/arrow-down.svg?react';
import Logout from '/src/assets/Icons/Logout.svg?react';


// service
import { logOutUser } from '../lib/userServices';

const Navigation = ({
  setLoginModalOpen,
  setCreateAccountModalOpen,
  user
}) => {

  const location = useLocation();

  const [accountDropdown, setAccountDropdown] = useState(false);

  return (
    <div className={`sticky top-0 flex flex-row items-center justify-between min-h-[50px] box-border z-20 p-[1rem] bg-[#141414]`}>
        <Link to="/" className='flex items-center justify-center'>
            {/* LOGO HERE */}
            <span className='text-[#8cd56a] text-[32px] font-bold whitespace-nowrap'>LINK SAVER</span>
        </Link>

        {!user ? (
          <div className='flex flex-row items-center h-full'>
            <div className='flex items-center overflow-hidden gap-2'>
              <button onClick={() => setLoginModalOpen(true)} className={`cursor-pointer flex items-center font-bold h-full w-full bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 p-3 rounded-[15px] text-[#FAFAFA]`}>Login</button>
              <button onClick={() => setCreateAccountModalOpen(true)} className='cursor-pointer flex items-center bg-[#71cb47] text-[#141414] font-bold h-full w-full p-3 rounded-[15px] text-[#141414] whitespace-nowrap hover:bg-[#71cb47]/75 active:bg-[#71cb47]'>Create Account</button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between bg-[#71cb47]/75 py-2 rounded-[10px] transition-all duration-100'>
              <span className='text-[#191919] font-bold px-2 pl-3'>{user.name}</span>
              <button onClick={logOutUser} className='pr-3 rounded-full bg-transparent cursor-pointer opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer transition-all duration-100 ' title="Log out" >
                  <Logout className="w-[20px] h-[20px]" />
              </button>
          </div>
        )}
    </div>
  )
}

export default Navigation