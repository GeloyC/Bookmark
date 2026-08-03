// hooks
import { useState } from 'react' 

// icons
import ThreeDots from '/src/assets/Icons/three-dots-vertical.svg?react'
import Edit from '/src/assets/Icons/edit.svg?react'
import Delete from '/src/assets/Icons/delete.svg?react'


export const Group = ({
    group,
    selectedGroup,
    setSelectedGroup,
    setSelectedGroupId,
    setSelectedGroupEditModal,
    setSelectedGroupDeleteModal
}) => {

    const handleSelectGroupId = (group_id) => {
        setSelectedGroupId(prev => prev === group_id ? null : group_id)
    }

    const handleOpenGroupEditModal = (id) => {
        setSelectedGroupEditModal(prev => prev === id ? null : id);
    };
    
    const handleOpenGroupDeleteModal = (id) => {
        setSelectedGroupDeleteModal(prev => prev === id ? null : id);
    };


    return (
        <div key={group.id} className={`relative group flex items-center justify-between items-center cursor-pointer rounded-[10px] w-full min-h-[40px] ${selectedGroup === group.name ? 'bg-[#71cb47]/50' : 'bg-[#252525]/75'}`}>
            <input type="radio" name="group" id={`group_id_${group.id}`} hidden
            value={group.name} checked={selectedGroup === group.name} 
            onChange={(e) => {
                setSelectedGroup(e.target.value);
            }}/>
            
            <label htmlFor={`group_id_${group.id}`} onClick={()=>handleSelectGroupId(group.id)} className={`px-3 ${selectedGroup === group.name ? 'active:bg-[#191919]' : 'hover:bg-[#252525]/75 active:bg-[#191919]'} flex items-center gap-2 h-full w-full cursor-pointer flex items-center rounded-l-[7px]`}>
                <span className='flex items-center justify-center text-[#71cb47] text-[14px] bg-[#71cb47]/15 font-bold opacity-90 leading-none rounded-[5px] size-5'>{group.card_count}</span>

                <span className='text-[#FAFAFA] opacity-90 leading-none max-w-[175px] truncate'>{group.name}</span>

            </label>

            <div className='flex opacity-0 group-hover:opacity-100 items-center justify-end px-2 gap-2 transition-all duration-100'>
                <button onClick={() => handleOpenGroupEditModal(group.id)} className='opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer'>
                    <Edit className={`w-[20px] h-[20px] transition-all duration-100`} />
                </button>
                <button onClick={() => handleOpenGroupDeleteModal(group.id)} className='opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer'>
                    <Delete className={`w-[20px] h-[20px] transition-all duration-100`} />
                </button>
            </div>
        </div>
    )
}