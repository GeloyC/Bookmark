
// hook
import { useState } from "react"

// icons
import Close from '/src/assets/Icons/close.svg?react';

export const ManageGroupModal = ({
    closeModal
}) => {
    
    console.log('Manage Group Modal is mounted');
    
    return (
        <div className="relative flex flex-col w-[700px] h-auto rounde-[10px] p-[1rem] bg-[#252525] rounded-[10px]">
            <span className="text-[24px] text-[#FAFAFA] font-[500] leading-none">Manage Groups</span>

            <button onClick={closeModal} className="absolute top-4 right-4 cursor-pointer hover:opacity-75 active:opacity-25">
                <Close className="size-5"/>
            </button>


            <div className="flex flex-col w-full max-h-[600px] overflow-y-auto thin-scrollbar">

            </div>
        </div>
    )
}