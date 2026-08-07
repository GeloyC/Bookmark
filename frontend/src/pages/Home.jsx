import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';
import Add from '/src/assets/Icons/add.svg?react';

// components
import { GroupCreateModal } from '../components/HomeComponent/Modal/GroupCreateModal';
import { LinkWrapper } from '../components/Wrapper/LinkWrapper';
import { Card } from '../components/HomeComponent/Cards/Card';
import { NoCard } from '../components/HomeComponent/Cards/NoCard';
import { TopBar } from '../components/Wrapper/TopBar';
import { CreateLinkButton } from '../components/HomeComponent/Button/CreateLinkButton';
import { Toast } from '../components/Toast/Toast';
import { DeleteToast } from '../components/Toast/DeleteToast';
import { EditToast } from '../components/Toast/EditToast';
import { ModalWrapper } from '../components/Wrapper/ModalWrapper';
import { Onboarding } from '../components/Wrapper/OnBoarding';
import { SideBar } from '../components/SideBar/SideBar';


// context
import { useUserContext } from '../context/userContext';

// services
import { getGroupsById } from '../lib/group.service';
import { getLinksPerGroup } from '../lib/card.service';



const Home = () => {

    const user = useUserContext();

    const [modal, setModal] = useState({
        type: null,
        payload: null
    });
    
    const openModal = (type, payload = null) => {setModal({ type, payload })}
    const closeModal = () => {setModal({ type: null, payload: null })}
    
    const { groupId } = useParams();


    const { 
        data: groups = [], 
        error, isLoading: 
        isGroupsLoading, 
        isError 
    } = useQuery({
        queryKey: ['groups', user.id],
        queryFn: () => getGroupsById(user.id)
    })

    const groupSelected = groups.find(group => group.id === groupId);

    const { 
        data: cards = [], 
        isLoading: isCardsLoading 
    } = useQuery({
        queryKey: ['cards', groupId],
        queryFn: () => getLinksPerGroup(groupId),
        enabled: !!groupId
    });

    
    const [toastMessage, setToastMessage] = useState(null);
    const [deleteToastMessage, setDeleteToastMessage] = useState(null);
    const [editToastMessage, setEditToastMessage] = useState(null);

    const createLinkCondition = groupId && cards.length > 0;
    const showLinksCondition = groupId && cards.length >= 1;

    return (
        <>
            <div className="grid grid-cols-[15%_85%] h-screen w-full">

                <SideBar 
                    user={user}
                    groups={groups}
                    openModal={openModal}
                    selectedGroupId={groupId}
                    groupSelected={groupSelected}
                />
                        
                {groups.length > 0 ? (
                    <LinkWrapper 
                        cards={cards}
                        groupName={groupSelected?.name}
                        isCardsLoading={isCardsLoading}
                    >
                        <TopBar 
                            groupSelected={groupSelected}
                            openModal={()=> openModal('create-link', groupSelected?.name)}
                            createLinkCondition={groupId && cards.length > 0}
                        />

                        <div className='flex flex-col w-full max-h-[650px] overflow-y-auto thin-scrollbar gap-[0.3rem] py-[1rem]'>
                            {groupId && cards.length >= 1 ? (
                                cards.map(card => (
                                    <Card key={card.id}
                                        card={card}
                                        openModal={openModal}
                                    />
                                ))
                            ):(
                                <NoCard 
                                    selectedGroup={groupSelected}
                                    openModal={()=> openModal('create-link', groupSelected?.name)}
                                />
                            )}
                        </div>
                    </LinkWrapper>
                ):(
                    <Onboarding 
                        user={user}
                        openModal={openModal}
                    /> 
                )}
                

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