import { useState } from 'react';

import Close from '/src/assets/Icons/close.svg?react';

export const GroupCreateModal = ({
    setCloseModal 
}) =>{

    const [groupName, setGroupName] = useState('');
    return (
        <div className="flex flex-col items-start w-[500px] h-auto bg-[#191919] p-[1rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">
            <div className="flex items-center justify-between w-full">
                <span className="text-[#FAFAFA]">Create Group</span>
                <button onClick={() => setCloseModal(false)} className="flex items-center justify-center cursor-pointer rounded-full hover:bg-[#252525] active:bg-[#191919] p-1">
                    <Close className="w-[20px] h-[20px]" />
                </button>
            </div>

            <div className='flex flex-col w-full items-center justify-center gap-[1rem]'>

                <input type="text" placeholder='Ex. YouTube Links' value={groupName} onChange={(e)=>setGroupName(e.target.value)}
                className='flex w-full text-[#FAFAFA] p-3 bg-[#252525] rounded-[10px] focus:outline-none border border-[#252525] focus:border-[#A8DF8E] transition-all duration-100'/>

                <div className='flex items-center gap-1 w-full'>
                    <button className='w-full py-[0.5rem] rounded-[10px] bg-[#A8DF8E] hover:bg-[#8cd56a] active:bg-[#A8DF8E] cursor-pointer'>
                        <span className='text-center text-[16px] text-[#191919] font-bold'>Create</span>
                    </button>
                    <button onClick={() => setCloseModal(false)} className='w-full py-[0.5rem] rounded-[10px] bg-[#191919] hover:bg-[#252525] active:bg-[#191919] cursor-pointer'>
                        <span className='text-center text-[16px] text-[#FAFAFA] font-bold'>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    )
}