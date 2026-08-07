
import { useState } from "react"

import Folder from '/src/assets/Icons/folder.svg?react';

export const Onboarding = ({
    user,
    openModal
}) => {
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-[1rem]">
            <div className="flex flex-col gap-[0.3rem] items-center">
                <span className="text-[24px] text-[#FAFAFA] font-bold">No groups yet</span>
                <span className="text-[#FAFAFA] opacity-50 text-center">Create your group today and saving links.<br/> Let's get started!</span>
            </div>

            <button onClick={()=>openModal('create-group')}
                className="cursor-pointer flex items-center gap-2 bg-[#71cb47]/50 hover:bg-[#71cb47]/75 active:bg-[#71cb47]/50 border-2 border-[#71cb47]/50 rounded-[10px] p-1 px-3 transition-all duration-100">
                <Folder className="size-5" />
                <span className="text-[#FAFAFA]">Create Group</span>
            </button>
        </div>
    )
}