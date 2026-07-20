import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';
import Add from '/src/assets/Icons/add.svg?react';
import Logout from '/src/assets/Icons/Logout.svg?react';


// components
import { GroupCreateModal } from '../components/modal/GroupCreateModal';
import { GroupWrapper } from '../components/HomeComponent/GroupWrapper';
import { LinkWrapper } from '../components/HomeComponent/LinkWrapper';
import { AddLinkModal } from '../components/modal/AddLinkModal';

// context
import { useUserContext } from '../context/userContext';

// services
import { getGroupsById } from '../lib/group.service';
import { getLinksPerGroup } from '../lib/card.service';
import { logOutUser } from '../lib/userServices';

const Home = () => {

    const user = useUserContext();
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);

    const [selectedGroup, setSelectedGroup] = useState(null);

    const { data: groups = [], error, isLoading, isError } = useQuery({
        queryKey: ['groups', user.id],
        queryFn: () => getGroupsById(user.id)
    });


    const { data: cards = [] } = useQuery({
        queryKey: ['cards', selectedGroup],
        queryFn: () => getLinksPerGroup(
            selectedGroup
        ),
        enabled: !!selectedGroup
    });
    

    return (
        <>
            <div className='grid grid-cols-[1fr_4fr] w-full min-h-full rounded-[15px] gap-4 py-[1rem]'>

                {/* TABS of category */}
                <div className='flex flex-col items-center justify-between w-full  gap-1'>
                    <GroupWrapper 
                        user={user}
                        groups={groups}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        setGroupModalOpen={setGroupModalOpen}
                    />

                    {user && (
                        <div className='relative flex items-center gap-2 w-full'>
                            <div className='flex items-center justify-between w-full bg-[#71cb47]/75 hover:bg-[#71cb47] py-3 px-2 rounded-full transition-all duration-100'>
                                <span className='text-[#141414] font-bold px-2'>{user.name}</span>
                                <button onClick={logOutUser} className='px-2 cursor-pointer opacity-50 hover:opacity-100 active:opacity-50 cursor-pointer transition-all duration-100 ' title="Log out" >
                                    <Logout className="w-[20px] h-[20px]" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`flex flex-col w-full h-full items-center justify-center rounded-[10px] ${selectedGroup === null ? 'border border-dashed border-[#FAFAFA]/15' : ''} `}>
                    {/* Show this if user has not created anything yet */}
                    {groups.length <= 0 && !user ? (
                        <div className='flex items-center gap-[1rem]'>
                            <button onClick={() => setGroupModalOpen(true)} className='flex flex-col items-center justify-center bg-[#191919] hover:bg-[#1D1D1D] active:bg-[#191919] cursor-pointer p-[1rem] px-[1.5rem] rounded-[15px] border-2 border-dashed border-[#FAFAFA]/25 gap-[0.5rem]'>
                                <Folder className="w-[30px] h-[30px] opacity-75"/>
                                <span className='text-[#FAFAFA]'>Create Group</span>
                            </button>
                        </div>
                    ) : groups.length > 0 && selectedGroup === null ? (
                        <div>
                            <span className='text-[#FAFAFA]'>Select ka muna tols</span>    
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-start w-full h-full gap-[0.5rem]'>
                            <LinkWrapper 
                                setOpenAddLinkModal={setAddLinkModalOpen}
                                setGroupModalOpen={setGroupModalOpen}
                                cards={cards}
                                selectedGroup={selectedGroup}
                            /> 
                        </div>
                    )}
                </div>
            </div>

            {groupModalOpen && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <GroupCreateModal
                        // add a close function here to close the modal
                        setCloseModal={setGroupModalOpen}
                        user={user}
                    />
                </div>
            )}

            {addLinkModalOpen && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <AddLinkModal
                        // add a close function here to close the modal
                        setCloseModal={setAddLinkModalOpen}
                        groups={groups}
                        user={user}
                        selectedGroup={selectedGroup}
                    />
                </div>
            )}
        </>
    )
}

export default Home