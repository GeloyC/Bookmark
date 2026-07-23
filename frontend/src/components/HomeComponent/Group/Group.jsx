// hooks
import { useState } from 'react' 
import { useQuery } from '@tanstack/react-query'

// icons
import ThreeDots from '/src/assets/Icons/three-dots-vertical.svg?react'
import Edit from '/src/assets/Icons/edit.svg?react'
import Delete from '/src/assets/Icons/delete.svg?react'


export const Group = ({
    group,
    selectedGroup,
    setSelectedGroup,
    handleSelectGroupId,
    handleDeleteGroup,
    handleOpenGroupEditModal
}) => {




    return (
        <div key={group.id} className={`relative group flex items-center justify-between items-center cursor-pointer rounded-[10px] w-full min-h-[40px] border-2 ${selectedGroup === group.name ? 'border-[#71cb47]/25 bg-[#71cb47]/50' : 'border-[#252525] bg-[#252525]'}`}>
            <input type="radio" name="group" id={`group_id_${group.id}`} hidden
            value={group.name} checked={selectedGroup === group.name} 
            onChange={(e) => {
                setSelectedGroup(e.target.value);
            }}/>
            <label htmlFor={`group_id_${group.id}`} onClick={()=>handleSelectGroupId(group.id)} className={`px-3 ${selectedGroup === group.name ? 'active:bg-[#191919]' : 'hover:bg-[#252525]/75 active:bg-[#191919]'} h-full w-full cursor-pointer flex items-center rounded-l-[7px]`}>
                <span className='text-[#FAFAFA] opacity-90 leading-none w-[175px] truncate'>{group.name}</span>
            </label>

            <div className='flex opacity-0 group-hover:opacity-100 items-center justify-end px-2 gap-2'>
                <button onClick={() => handleOpenGroupEditModal(group.id)} className='opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer'>
                    <Edit className={`w-[20px] h-[20px] transition-all duration-100`} />
                </button>
                <button onClick={() => handleDeleteGroup(group.id)} className='opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer'>
                    <Delete className={`w-[20px] h-[20px] transition-all duration-100`} />
                </button>
            </div>
        </div>
    )
}