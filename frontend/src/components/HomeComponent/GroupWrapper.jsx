import { useState } from 'react';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';
import ThreeDots from '/src/assets/Icons/three-dots-vertical.svg?react'

// service
import { getGroupsById } from '../../lib/group.service';

export const GroupWrapper = ({
    user, // passed from useUserContext from /Home.jsx
    groups, // passed from /Home.jsx,
    selectedGroup,
    setSelectedGroup, // passed this setState from /Home.jsx
    setGroupModalOpen
}) => {

    return (
        <div className='flex flex-col items-start justify-start gap-1 w-full h-auto p-2 px-3 rounded-t-[10px] bg-gradient-to-b from-[#191919] to-transparent'>

            <div className='flex w-full items-center justify-between pb-1'>
                <span className='text-[#8cd56a]'>Groups</span>

                <button onClick={() => setGroupModalOpen(true)} title='Create Group' className='flex items-center justify-center gap-2 opacity-50 hover:opacity-100 active:opacity-50 rounded-full cursor-pointer transition-all duration-100'>
                    <Folder className="w-[25px] h-[25px] opacity-75"/>
                </button>
            </div>
            
            <div className='flex flex-col w-full max-h-[600px] overflow-y-auto overflow-x-hidden thin-scrollbar gap-1'>
                {groups.map(group => (
                    <div key={group.id} className={`group flex items-center justify-between items-center cursor-pointer bg-[#252525] rounded-[10px] w-full min-h-[40px] border-2 ${selectedGroup === group.name ? 'border-dashed border-[#8cd56a]/50 text-[#8cd56a]' : 'border-[#252525] text-[#FAFAFA]'}`}>
                        <input type="radio" name="group" id={`group_id_${group.id}`} hidden
                        value={group.name} checked={selectedGroup === group.name} onChange={(e) => setSelectedGroup(e.target.value)}/>
                        <label htmlFor={`group_id_${group.id}`}  className='px-3 hover:bg-[#252525]/75 h-full w-full active:bg-[#191919] cursor-pointer flex items-center rounded-l-[10px]'>
                            <span className=' opacity-90 leading-none w-[175px] truncate'>{group.name}</span>
                        </label>

                        <div className='flex opacity-0 group-hover:opacity-100 items-center justify-end px-2 gap-2'>
                            <button className='opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer'>
                                <ThreeDots className="w-[18px] h-[18px]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}