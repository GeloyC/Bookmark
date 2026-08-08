import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

// icons
import ArrowDown from '../assets/icons/arrow-down.svg?react';


const Navigation = ({
  setLoginModalOpen,
  setCreateAccountModalOpen,
  user
}) => {


  const [accountDropdown, setAccountDropdown] = useState(false);

  return (
    <div className={`sticky top-0 flex items-center justify-between w-full min-h-[60px] box-border z-30 p-[1rem]`}>
        <Link to="/" className='flex items-center gap-[0.5rem]'>
            {/* LOGO HERE */}
            {/* <span className='text-[#8cd56a] text-[32px] font-bold whitespace-nowrap'>LINK SAVER</span>
             */}
            <img src="/src/assets/logo/link_saver_logo.png" alt="logo" className='size-7'/>
        </Link>

        {user && (
          user?.username ? (
            <span className='text-[#FAFAFA] text-[20px] font-bold'>
              {user.username}'s Space
            </span>
          ) : user?.name && (
            <span className='text-[#FAFAFA] text-[20px] font-bold'>
              {user.name}'s Space
            </span>
          )
        )}
        
        {!user && (
          <div className='flex flex-row items-center'>
            <div className='flex items-center overflow-hidden gap-2'>
              <button onClick={() => setLoginModalOpen(true)} className={`cursor-pointer flex items-center font-bold h-full w-full bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 px-3 py-2 rounded-[10px] text-[#FAFAFA]`}>Login</button>
              <button onClick={() => setCreateAccountModalOpen(true)} className='cursor-pointer flex items-center bg-[#71cb47] text-[#141414] font-bold h-full w-full px-3 py-2 rounded-[10px] text-[#141414] whitespace-nowrap hover:bg-[#71cb47]/75 active:bg-[#71cb47]'>Get Started</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Navigation