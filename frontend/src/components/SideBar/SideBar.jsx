import { useState } from 'react'

// icons
import Logout from '/src/assets/Icons/logout.svg?react'

// component
import { GroupItem } from './Group/GroupItem'
import { GroupWrapper } from './GroupWrapper'
import { CreateGroupButton } from '../HomeComponent/Button/CreateGroupButton';


export const SideBar = ({
    user,
    groups,
    openModal,
    selectedGroupId,
    groupSelected
}) => {

    const [groupDropdown, setGroupDropdown] = useState(null);

    return (
        <div className="flex flex-col justify-between w-full h-full bg-[#191919]/50 p-[1rem]  border-r border-r-[#FAFAFA]/10">

            <div className='flex flex-col gap-[2rem]'>
                <div className="flex items-center w-full gap-[0.75rem]">
                    <img src="/logo/link_saver_logo.png" alt="logo" className="size-6"/>
                    <span className="text-[#FAFAFA] text-[18px] font-[500]">
                        {user?.name || user?.username}'s Space
                    </span>
                </div>


                <div className='flex flex-col w-full gap-[0.5rem]'>
                    <span className='text-[#FAFAFA]/50 text-[14px]'>My Groups</span>

                    <GroupWrapper>
                        {groups.map(group => (
                            <GroupItem key={group.id} 
                                group={group}
                                isSelected={selectedGroupId === group.id}
                                groupDropdown={groupDropdown}
                                setGroupDropdown={setGroupDropdown}
                                openModal={openModal}
                            />
                        ))}

                        <CreateGroupButton 
                            openModal={()=>openModal('create-group')}
                        />
                    </GroupWrapper>
                </div>
            </div>

            <button onClick={()=>openModal('logout')} className='flex items-center justify-between w-full cursor-pointer bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 p-2 px-3 rounded-[10px] transition-all duration-100'>
                <span className='text-[#FAFAFA] text-[14px]'>Logout</span>
                <Logout className="size-4" />
            </button>
        </div>
    )
}