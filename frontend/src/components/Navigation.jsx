import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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


  const [accountDropdown, setAccountDropdown] = useState(false);

  return (
    <div className={`sticky top-0 flex items-center justify-between w-full min-h-[60px] box-border z-30 p-[1rem]`}>
        <Link to="/" className='flex items-center gap-[0.5rem]'>
            {/* LOGO HERE */}
            {/* <span className='text-[#8cd56a] text-[32px] font-bold whitespace-nowrap'>LINK SAVER</span>
             */}
            <img src="/src/assets/logo/link_saver_logo.png" alt="logo" className='size-7'/>
            {user ? (
              user?.username ? (
                <span className='text-[#71cb47] text-[20px]'>
                  {user.username}'s links
                </span>
              ) : user?.name && (
                <span className='text-[#71cb47] text-[20px]'>
                  {user.name}'s links
                </span>
              )
            ): (
              <span className='text-[#71cb47] text-[22px] font-bold'>
                Link Saver
              </span>
            )}
        </Link>

        {!user ? (
          <div className='flex flex-row items-center'>
            <div className='flex items-center overflow-hidden gap-2'>
              <button onClick={() => setLoginModalOpen(true)} className={`cursor-pointer flex items-center font-bold h-full w-full bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 px-3 py-2 rounded-[10px] text-[#FAFAFA]`}>Login</button>
              <button onClick={() => setCreateAccountModalOpen(true)} className='cursor-pointer flex items-center bg-[#71cb47] text-[#141414] font-bold h-full w-full px-3 py-2 rounded-[10px] text-[#141414] whitespace-nowrap hover:bg-[#71cb47]/75 active:bg-[#71cb47]'>Register</button>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center'>
              <button onClick={logOutUser} className='p-2 rounded-[10px]  cursor-pointer bg-[#71cb47] hover:bg-[#71cb47] active:bg-[#71cb47]/80 cursor-pointer transition-all duration-100' title="Log out" >
                  <Logout className="size-4" />
              </button>
          </div>
        )}
    </div>
  )
}

export default Navigation