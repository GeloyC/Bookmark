
import { useState } from 'react';
import { logOutUser } from '../../../lib/userServices';


export const LogOutModal = ({
    closeModal
}) => {


    return (
        <div className='modal-in flex flex-col min-w-[400px] p-[2rem] rounded-[10px] bg-[#191919] border border-[#FAFAFA]/15 gap-[2rem]'>
            <span className='text-[24px] text-[#FAFAFA] font-bold leading-none'>
                Are you sure you want log out?
            </span>

            <div className='flex items-center w-full gap-2'>
                <button onClick={logOutUser} className='w-full p-2 rounded-[10px] bg-[#F72B2B]/50 hover:bg-[#F72B2B] active:bg-[#F72B2B] cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Log out</span>
                </button>
                <button onClick={closeModal} className='w-full p-2 rounded-[10px] bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525] cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Cancel</span>
                </button>
            </div>

        </div>
    )
}