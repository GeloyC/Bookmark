import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';
import Add from '/src/assets/Icons/add.svg?react';


// components
import { GroupCreateModal } from '../components/HomeComponent/Modal/GroupCreateModal';
import { GroupWrapper } from '../components/Wrapper/GroupWrapper';
import { LinkWrapper } from '../components/Wrapper/LinkWrapper';
import { AddLinkModal } from '../components/HomeComponent/Modal/AddLinkModal';
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
import { GroupEditModal } from '../components/HomeComponent/Modal/GroupEditModal';
import { CardEditModal } from '../components/HomeComponent/Modal/CardEditModal';
import { DeleteGroupWarning } from '../components/HomeComponent/Modal/DeleteGroupWarning';
import { DeleteCardWarning } from '../components/HomeComponent/Modal/DeleteCardWarning';
import { Toast } from '../components/Toast/Toast';
import { DeleteToast } from '../components/Toast/DeleteToast';
import { EditToast } from '../components/Toast/EditToast';
import { GroupSettings } from '../components/Wrapper/GroupSettings';
import { ModalWrapper } from '../components/Wrapper/ModalWrapper';


const Home = () => {

    const user = useUserContext();


    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const [createLinkModalOpen, setCreateLinkModalOpen] = useState(false);
    const [manageGroupModalOpen, setManageGroupModalOpen] = useState(false);

    const [modal, setModal] = useState({
        type: null,
        payload: null
    });

    const [chosenGroup, setChosenGroup] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const [selectedCardEditModal, setSelectedCardEditModal] = useState(null);
    const [selectedCardDeleteModal, setSelectedCardDeleteModal] = useState(null)

    const [toastMessage, setToastMessage] = useState(null);
    const [deleteToastMessage, setDeleteToastMessage] = useState(null);
    const [editToastMessage, setEditToastMessage] = useState(null);


    const { data: groups = [], error, isLoading: isGroupsLoading, isError } = useQuery({
        queryKey: ['groups', user.id],
        queryFn: () => getGroupsById(user.id)
    })

    const groupSelected = groups.find(group => group.id === chosenGroup);

    const { data: cards = [], isLoading:isCardsLoading } = useQuery({
        queryKey: ['cards', groupSelected?.id],
        queryFn: () => getLinksPerGroup(groupSelected?.id),
        enabled: !!groupSelected?.id
    });

    
    const selectedCardToEdit = cards.find(card => card.id === selectedCardEditModal);
    const selectedCardToDelete = cards.find(card => card.id === selectedCardDeleteModal);


    const openModal = (type, payload = null) => {setModal({ type, payload })}
    const closeModal = () => {setModal({ type: null, payload: null })}


    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen w-full gap-[1rem] px-[12rem]">

                {groups.length > 0 && (
                    <TopBar>
                        <GroupSelectection 
                            setChosenGroup={setChosenGroup}
                            groupSelected={groupSelected}
                            groups={groups}
                        />

                        <div className='flex items-center gap-2'>
                            <GroupSettings openModal={openModal} />

                            {chosenGroup && (
                                <CreateLinkButton 
                                    openModal={()=>openModal('create-link')}
                                />
                            )}
                        </div>
                    </TopBar>
                )}
            

                <LinkWrapper 
                    cards={cards}
                    groupName={groupSelected?.name}
                    isCardsLoading={isCardsLoading}
                >
                    {chosenGroup && cards.length >= 1 ? (
                        cards.map(card => (
                            <Card key={card.id}
                                card={card}
                                setSelectedCardDeleteModal={setSelectedCardDeleteModal}
                                openModal={openModal}
                            />
                        ))
                    ):(
                        <NoCard 
                            selectedGroup={groupSelected}
                            openModal={()=> openModal('create-link')}
                        />
                    )}
                </LinkWrapper>
            </div>

            <ModalWrapper
                user={user}
                group={groupSelected}

                // use this to close and open modal
                modal={modal}
                closeModal={closeModal}

                // toast
                setToastMessage={setToastMessage}
                setEditToastMessage={setEditToastMessage}
                setDeleteToastMessage={setDeleteToastMessage}
            />

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