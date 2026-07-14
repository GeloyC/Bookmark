import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

// import '../styling/Navigation.css'

const Navigation = () => {

  const location = useLocation();

  const [user, setUser] = useState([]);

  return (
    <div className='flex flex-row justify-between items-center h-auto border-[#656565]/50 border rounded-[15px] bg-[#191919] overflow-hidden box-border'>
        <Link to="/" className='px-[1rem]'>
            {/* LOGO HERE */}
            <span className='text-[#A8DF8E] text-[20px] font-bold'>BOOKMARK</span>
        </Link>
        <div className='flex flex-row items-center h-full'>
            <Link to="/" className={`flex items-center hover:bg-[#A8DF8E]/15 h-full w-full p-4 text-[#FAFAFA] ${location.pathname === '/' ? 'border-b-2 border-b-[#A8DF8E] bg-[#A8DF8E]/25' : 'border-r border-r-[#3A3A3A]'}`}>Home</Link>

            {user ? (
              <div className='flex items-center'>
                <Link to="/login" className={`flex items-center font-bold h-full w-full hover:bg-[#A8DF8E]/15 p-4 text-[#FAFAFA]`}>Login</Link>
                <Link className='flex items-center bg-[#191919] text-[#141414] font-bold h-full w-full border-l-[#FAFAFA]/25 border-l p-4 text-[#FAFAFA] whitespace-nowrap hover:bg-[#A8DF8E]/15'>Create Account</Link>
              </div>

            ) : (
              <div className='relative flex items-center'>
                <div className='flex items-center'>
                  <label className='flex items-center w-full p-4'>{user}</label>
                  <button onClick={displayExitButton} className='flex items-center justify-center size-8 p-4 cursor-pointer hover:bg-[#2A2A2A] active:bg-[#141414] rounded-full'>
                    {!showExit ? '>' : 'v'}
                  </button>
                </div>

                {showExit && (
                  <button onClick={ExitUser} className='absolute top-14 flex items-center justify-start p-4 w-full text-[14px] bg-[#2A2A2A] cursor-pointer whitespace-nowrap hover:bg-[#656565] active:bg-[#141414] border border-[#FFF] z-10'>
                    Exit
                  </button>
                )}
              </div>
            )}

        </div>

    </div>
  )
}

export default Navigation