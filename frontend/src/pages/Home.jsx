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
import { GroupWrapper } from '../components/Wrapper/GroupWrapper';
import { LinkWrapper } from '../components/HomeComponent/LinkWrapper';
import { AddLinkModal } from '../components/modal/AddLinkModal';
import { Group } from '../components/HomeComponent/Group/Group';
import { Card } from '../components/HomeComponent/Cards/Card';
import { NoCard } from '../components/HomeComponent/Cards/NoCard';
import { TopBar } from '../components/Wrapper/TopBar';
import { GroupSelectection } from '../components/Wrapper/GroupSelection';
import { CreateLinkButton } from '../components/HomeComponent/Button/CreateLinkButton';



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
import { GroupSettings } from '../components/Wrapper/GroupSettings';


const Home = () => {

    const user = useUserContext();

    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const [createLinkModalOpen, setCreateLinkModalOpen] = useState(false);
    const [manageGroupModalOpen, setManageGroupModalOpen] = useState(false);
    
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
            <div className="flex flex-col items-center justify-start h-screen w-full gap-[1rem] px-[12rem]">

                {/* {groups.length > 0 && (
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
                )} */}

                    {groups.length > 0 && (
                        <TopBar>
                            <GroupSelectection 
                                setSelectedGroup={setSelectedGroup}
                                setSelectedGroupId={setSelectedGroupId}
                                selectedGroup={selectedGroup}
                                groups={groups}
                            />

                            <div className='flex items-center gap-2'>
                                <GroupSettings
                                    setCreateGroupModalOpen={setCreateGroupModalOpen}
                                    setManageGroupModalOpen={setManageGroupModalOpen}
                                />

                                {selectedGroup && (
                                    <CreateLinkButton 
                                        setCreateLinkModalOpen={setCreateLinkModalOpen}
                                    />
                                )}
                            </div>
                        </TopBar>
                    )}
                

                    <LinkWrapper 
                        cards={cards}
                        setCreateLinkModalOpen={setCreateLinkModalOpen}
                        selectedGroup={selectedGroup}
                        isCardsLoading={isCardsLoading}
                    >
                        {selectedGroup && cards.length >= 1 ? (
                            cards.map(card => (
                                <Card key={card.id}
                                    card={card}
                                    setSelectedCardEditModal={setSelectedCardEditModal}
                                    setSelectedCardDeleteModal={setSelectedCardDeleteModal}
                                />
                            ))
                        ):(
                            <NoCard 
                                setCreateLinkModalOpen={setCreateLinkModalOpen}
                                selectedGroup={selectedGroup}
                            />
                        )}
                    </LinkWrapper>
                
            </div>

            {createGroupModalOpen && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <GroupCreateModal
                        // add a close function here to close the modal
                        setCloseModal={setCreateGroupModalOpen}
                        user={user}
                        setToastMessage={setToastMessage}
                    />
                </div>
            )}

            {createLinkModalOpen && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
                    <AddLinkModal
                        // add a close function here to close the modal
                        setCloseModal={setCreateLinkModalOpen}
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