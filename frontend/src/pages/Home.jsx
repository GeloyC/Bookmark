import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';
import Add from '/src/assets/Icons/add.svg?react';


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
import { GroupEditModal } from '../components/modal/GroupEditModal';

const Home = () => {

    const user = useUserContext();
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);


    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroupEditModal, setSelectedGroupEditModal] = useState(null);

    const { data: groups = [], error, isLoading, isError } = useQuery({
        queryKey: ['groups', user.id],
        queryFn: () => getGroupsById(user.id)
    });

    const selectedGroupToEdit = groups.find(g => { return g.id === selectedGroupEditModal });


    const { data: cards = [] } = useQuery({
        queryKey: ['cards', selectedGroup],
        queryFn: () => getLinksPerGroup(
            selectedGroup
        ),
        enabled: !!selectedGroup
    });

    const handleOpenGroupEditModal = (id) => {
        setSelectedGroupEditModal(prev => prev === id ? null : id)
    };


    

    return (
        <>
            <div className='grid grid-cols-[1fr_4fr] w-full h-auto rounded-[15px] px-[1rem] gap-[1rem]'>

                {/* TABS of category */}
                <div className='flex flex-col items-center justify-between w-full h-auto gap-1'>
                    <GroupWrapper 
                        user={user}
                        groups={groups}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        setGroupModalOpen={setGroupModalOpen}
                        setSelectedGroupId={setSelectedGroupId}
                        handleOpenGroupEditModal={handleOpenGroupEditModal}
                    />

                </div>

                <div className={`flex flex-col w-full h-full items-center justify-center rounded-[10px] pl-4} `}>
                    {/* Show this if user has not created anything yet */}
                    {groups.length <= 0 && !user ? (
                        <div className='flex items-center gap-[1rem]'>
                            <button onClick={() => setGroupModalOpen(true)} className='flex flex-col items-center justify-center bg-[#191919] hover:bg-[#1D1D1D] active:bg-[#191919] cursor-pointer p-[1rem] px-[1.5rem] rounded-[15px] border-2 border-dashed border-[#FAFAFA]/25 gap-[0.5rem]'>
                                <Folder className="w-[30px] h-[30px] opacity-75"/>
                                <span className='text-[#FAFAFA]'>Create Group</span>
                            </button>
                        </div>
                    ) : groups.length > 0 && selectedGroup === null ? (
                        <div className='flex flex-col items-center justify-center w-full min-h-[700px]'>
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
                        user={user}
                        selectedGroup={selectedGroup}
                        groupId={selectedGroupId}
                    />
                </div>
            )}

            {selectedGroupEditModal &&  (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <GroupEditModal
                        // add a close function here to close the modal
                        groupId={selectedGroupToEdit?.id}
                        groupName={selectedGroupToEdit?.name}
                        setSelectedGroupEditModal={setSelectedGroupEditModal}
                    />
                </div>
            )}
        </>
    )
}

export default Home