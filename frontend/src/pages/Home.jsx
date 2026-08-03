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
import { Group } from '../components/HomeComponent/Group/Group';
import { Card } from '../components/HomeComponent/Cards/Card';
import { NoCard } from '../components/HomeComponent/Cards/NoCard';

// context
import { useUserContext } from '../context/userContext';

// services
import { getGroupsById } from '../lib/group.service';
import { getLinksPerGroup } from '../lib/card.service';

// components
import { GroupEditModal } from '../components/modal/GroupEditModal';
import { CardEditModal } from '../components/modal/CardEditModal';
import { DeleteGroupWarning } from '../components/modal/DeleteGroupWarning';
import { DeleteCardWarning } from '../components/modal/DeleteCardWarning';
import { Toast } from '../components/Toast/Toast';
import { DeleteToast } from '../components/Toast/DeleteToast';
import { EditToast } from '../components/Toast/EditToast';

const Home = () => {

    const user = useUserContext();
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);
    
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const [selectedGroupEditModal, setSelectedGroupEditModal] = useState(null);
    const [selectedGroupDeleteModal, setSelectedGroupDeleteModal] = useState(null);

    const [selectedCardEditModal, setSelectedCardEditModal] = useState(null);
    const [selectedCardDeleteModal, setSelectedCardDeleteModal] = useState(null)

    const [toastMessage, setToastMessage] = useState(null);
    const [deleteToastMessage, setDeleteToastMessage] = useState(null);
    const [editToastMessage, setEditToastMessage] = useState(null);


    const { data: groups = [], error, isLoading: isGroupsLoading, isError } = useQuery({
        queryKey: ['groups', user.id],
        queryFn: () => getGroupsById(user.id)
    });

    const selectedGroupToEdit = groups.find(g =>  g.id === selectedGroupEditModal);
    const selectedGroupToDelete = groups.find(group => group.id === selectedGroupDeleteModal);


    const { data: cards = [], isLoading:isCardsLoading } = useQuery({
        queryKey: ['cards', selectedGroupId],
        queryFn: () => getLinksPerGroup(selectedGroupId),
        enabled: !!selectedGroupId
    });

    const selectedCardToEdit = cards.find(card => card.id === selectedCardEditModal);
    const selectedCardToDelete = cards.find(card => card.id === selectedCardDeleteModal);


    return (
        <>
            <div className={`${groups.length <= 0 ? 'flex items-center justify-center h-screen w-full' : 'grid grid-cols-[1fr_4fr] h-full'}  rounded-[15px] gap-[1rem] px-[2rem]`}>


                { groups.length == 0 && (
                    <div className='flex items-center gap-[1rem]'>

                        {/* 
                            TODO:

                            THIS IS THE ONBOARDING BLOCK.
                            -- GREET THE USER
                            -- CREATE INSTRUCTION 
                        */}


                        <button onClick={() => setGroupModalOpen(true)} className='flex flex-col items-center justify-center bg-[#191919] hover:bg-[#1D1D1D] active:bg-[#191919] cursor-pointer p-[1rem] px-[1.5rem] rounded-[15px] border-2 border-dashed border-[#FAFAFA]/25 gap-[0.5rem]'>
                            <Folder className="size-7 opacity-75"/>
                            <span className='text-[#FAFAFA]'>Create a group</span>
                        </button>
                    </div>
                )}

                {groups.length > 0 && (
                    <GroupWrapper 
                        user={user}
                        setGroupModalOpen={setGroupModalOpen}
                    >
                        {groups.map(group => (
                            <Group key={group.id}
                                group={group}
                                selectedGroup={selectedGroup}
                                setSelectedGroup={setSelectedGroup}
                                setSelectedGroupId={setSelectedGroupId}
                                setSelectedGroupEditModal={setSelectedGroupEditModal}
                                setSelectedGroupDeleteModal={setSelectedGroupDeleteModal}
                            />
                        ))}
                    </GroupWrapper>
                )}

                {selectedGroup && (
                    <div className={`flex flex-col w-full h-full items-center justify-center rounded-[10px]`}>
                        {/* Show this if user has not created anything yet */}
                        <LinkWrapper 
                            cards={cards}
                            setOpenAddLinkModal={setAddLinkModalOpen}
                            selectedGroup={selectedGroup}
                            isCardsLoading={isCardsLoading}
                        >
                            {cards.length >= 1 ? (
                                cards.map(card => (
                                    <Card key={card.id}
                                        card={card}
                                        setSelectedCardEditModal={setSelectedCardEditModal}
                                        setSelectedCardDeleteModal={setSelectedCardDeleteModal}
                                    />
                                ))
                            ):(
                                <NoCard 
                                    setAddLinkModalOpen={setAddLinkModalOpen}
                                    selectedGroup={selectedGroup}
                                />
                            )}
                        </LinkWrapper>
                    </div>
                )}
            </div>

            {groupModalOpen && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <GroupCreateModal
                        // add a close function here to close the modal
                        setCloseModal={setGroupModalOpen}
                        user={user}
                        setToastMessage={setToastMessage}
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
                        setToastMessage={setToastMessage}
                    />
                </div>
            )}

            {selectedGroupEditModal &&  (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <GroupEditModal
                        // add a close function here to close the modal
                        userId={user.id}
                        groupId={selectedGroupToEdit?.id}
                        groupName={selectedGroupToEdit?.name}
                        setSelectedGroupEditModal={setSelectedGroupEditModal}
                        setEditToastMessage={setEditToastMessage}
                        setSelectedGroup={setSelectedGroup}
                    />
                </div>
            )}

            {selectedGroupDeleteModal && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <DeleteGroupWarning
                        // add a close function here to close the modal
                        userId={user.id}
                        groupId={selectedGroupToDelete?.id}
                        groupName={selectedGroupToDelete?.name}
                        cardCount={selectedGroupToDelete?.card_count}
                        setSelectedGroup={setSelectedGroup}
                        setSelectedGroupDeleteModal={setSelectedGroupDeleteModal}
                        setDeleteToastMessage={setDeleteToastMessage}
                    />
                </div>
            )}

            {selectedCardEditModal && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <CardEditModal 
                        cardId={selectedCardToEdit?.id}
                        cardTitle={selectedCardToEdit?.title}
                        setSelectedCardEditModal={setSelectedCardEditModal}
                        setEditToastMessage={setEditToastMessage}
                    />
                </div>
            )}

            {selectedCardDeleteModal && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <DeleteCardWarning 
                        userId={user.id}
                        cardId={selectedCardToDelete?.id}
                        cardTitle={selectedCardToDelete?.title}
                        setSelectedCardDeleteModal={setSelectedCardDeleteModal}
                        setDeleteToastMessage={setDeleteToastMessage}
                    />
                </div>
            )}

            {toastMessage && ( 
                <div className='fixed bottom-6 right-6'>
                    <Toast 
                        message={toastMessage}
                        setToastMessage={setToastMessage}
                    />
                </div>
            )}

            {deleteToastMessage && ( 
                <div className='fixed bottom-6 right-6'>
                    <DeleteToast 
                        deleteToastMessage={deleteToastMessage}
                        setDeleteToastMessage={setDeleteToastMessage}
                    />
                </div>
            )}


            {editToastMessage && ( 
                <div className='fixed bottom-6 right-6'>
                    <EditToast 
                        editToastMessage={editToastMessage}
                        setEditToastMessage={setEditToastMessage}
                    />
                </div>
            )}
        </>
    )
}

export default Home