
import React, { useState } from 'react';

// icon
import Close from '/src/assets/Icons/close.svg?react';

export const EditToast = ({
    editToastMessage,
    setEditToastMessage
}) => {



    return (
        <div className={`toast-animation flex items-center justify-between min-w-[200px] bg-[#252525] p-3 rounded-[10px] gap-[1rem] border border-[#FAFAFA]/50`}>
            <span className='pl-2 text-[#FAFAFA]'>{editToastMessage}</span>
            <button onClick={()=>setEditToastMessage(null)} className='cursor-pointer active:opacity-50'>
                <Close className="w-[20px] h-[20px]" /> 
            </button>
        </div>
    )
}