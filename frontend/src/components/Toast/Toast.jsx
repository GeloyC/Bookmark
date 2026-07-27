
import React, { useState } from 'react';

// icon
import Close from '/src/assets/Icons/close.svg?react';

export const Toast = ({
    className,
    message,
    setToastMessage
}) => {

    return (
        <div className={`flex items-center justify-between min-w-[200px] bg-[#252525] p-3 rounded-[10px] gap-[1rem] ${className}`}>
            <span>{message}</span>
            <button onClick={()=>setToastMessage(null)} className='cursor-pointer active:opacity-50'>
                <Close className="w-[20px] h-[20px]" /> 
            </button>
        </div>
    )
}