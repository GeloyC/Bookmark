// hooks
import { useState } from 'react' 

// icons
import ThreeDots from '/src/assets/Icons/three-dots-vertical.svg?react'


export const Group = ({
    group,
    selectedGroup,
    setSelectedGroup,
    handleShowDropdown,
    currentId
}) => {

    return (
        <div key={group.id} className={`relative group flex items-center justify-between items-center cursor-pointer bg-[#252525] rounded-[10px] w-full min-h-[40px] border-2 ${selectedGroup === group.name ? 'border-dashed border-[#8cd56a]/50 text-[#8cd56a]' : 'border-[#252525] text-[#FAFAFA]'}`}>
            <input type="radio" name="group" id={`group_id_${group.id}`} hidden
            value={group.name} checked={selectedGroup === group.name} onChange={(e) => setSelectedGroup(e.target.value)}/>
            <label htmlFor={`group_id_${group.id}`}  className='px-3 hover:bg-[#252525]/75 h-full w-full active:bg-[#191919] cursor-pointer flex items-center rounded-l-[10px]'>
                <span className=' opacity-90 leading-none w-[175px] truncate'>{group.name}</span>
            </label>

            <div className='flex opacity-0 group-hover:opacity-100 items-center justify-end px-2 gap-2'>
                <button onClick={() => handleShowDropdown(group.id)} className='opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer'>
                    <ThreeDots className={`w-[18px] h-[18px] ${currentId === group.id ? 'rotate-90' : 'rotate-360'} transition-all duration-100`} />
                </button>
            </div>

            {currentId === group.id && (
                <div className='absolute top-5 right-5 flex flex-col p-1.5 min-w-[200px] bg-[#141414] border border-[#FAFAFA]/15 border-dashed rounded-[12px] gap-1.5 z-10'>
                    <button className='cursor-pointer rounded-[10px] bg-[#191919] hover:bg-[#71cb47]/50 active:bg-[#191919] border border-[#252525] py-2 transition-all duration-100'>
                        <span className='text-[#FAFAFA] text-[14px]'>Edit</span>
                    </button>
                    <button className='cursor-pointer rounded-[10px] bg-[#191919] hover:bg-[#71cb47]/50 active:bg-[#191919] border border-[#252525] py-2 transition-all duration-100'>
                        <span className='text-[#FAFAFA] text-[14px]'>Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}