import { useState } from 'react';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';

// service
import { deleteGroupByID } from '../../lib/group.service';
import { Group } from './Group/Group';

export const GroupWrapper = ({
    user, // passed from useUserContext from /Home.jsx
    setGroupModalOpen,
    children
}) => {


    return (
        <div className='flex flex-col items-center justify-between w-full h-auto gap-1'>
            <div className='flex flex-col items-start gap-1 w-full h-full rounded-t-[10px] '>
                <div className='flex w-full items-center justify-between pb-1'>
                    <span className='text-[#8cd56a]'>Groups</span>

                    <button onClick={() => setGroupModalOpen(true)} title='Create Group' className='flex items-center justify-center gap-2 opacity-50 hover:opacity-100 active:opacity-50 rounded-full cursor-pointer transition-all duration-100'>
                        <Folder className="w-[25px] h-[25px] opacity-75"/>
                    </button>
                </div>
                
                <div className='flex flex-col w-full max-h-[700px] overflow-y-auto overflow-x-hidden thin-scrollbar gap-1'>
                    {children}
                </div>
            </div>
        </div>
    )
}