
import React, { useState } from 'react';

// icon
import Close from '/src/assets/Icons/close.svg?react';

export const Toast = ({
    message,
    setToastMessage
}) => {



    return (
        <div className={`toast-animation flex items-center justify-between min-w-[200px] bg-[#8cd56a]/15 p-3 rounded-[10px] gap-[1rem] border border-[#8cd56a]`}>
            <span className='pl-2 text-[#8cd56a]'>{message}</span>
            <button onClick={()=>setToastMessage(null)} className='cursor-pointer active:opacity-50'>
                <Close className="w-[20px] h-[20px]" /> 
            </button>
        </div>
    )
}