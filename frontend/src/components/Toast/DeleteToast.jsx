
import React, { useState } from 'react';

// icon
import Close from '/src/assets/Icons/close.svg?react';

export const DeleteToast = ({
    deleteToastMessage,
    setDeleteToastMessage
}) => {



    return (
        <div className={`toast-animation flex items-center justify-between min-w-[200px] bg-[#E2BA01]/15 p-3 rounded-[10px] gap-[1rem] border border-[#E2BA01]`}>
            <span className='pl-2 text-[#E2BA01]'>{deleteToastMessage}</span>
            <button onClick={()=>setDeleteToastMessage(null)} className='cursor-pointer active:opacity-50'>
                <Close className="w-[20px] h-[20px]" /> 
            </button>
        </div>
    )
}