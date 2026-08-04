import { useState } from "react"

// modal components
import { AddLinkModal } from "../HomeComponent/Modal/AddLinkModal"
import { CardEditModal } from "../HomeComponent/Modal/CardEditModal"
import { GroupCreateModal } from "../HomeComponent/Modal/GroupCreateModal"
import { GroupEditModal } from "../HomeComponent/Modal/GroupEditModal"

// warning components
import { DeleteCardWarning } from "../HomeComponent/Modal/DeleteCardWarning"
import { DeleteGroupWarning } from "../HomeComponent/Modal/DeleteGroupWarning"

// wrapper component
import { Modal } from "./Modal"

export const ModalWrapper = ({
    user,
    groupIdSelected,
    groupNameSelected,
    cardIdEdit,
    cardTitleEdit,
    cardIdDelete,
    cardTitleDelete,

    createGroupModalOpen,
    setCreateGroupModalOpen,

    createLinkModalOpen,
    setCreateLinkModalOpen,
    selectedCardEditModal,
    setSelectedCardEditModal,
    selectedCardDeleteModal,
    setSelectedCardDeleteModal,

    setToastMessage,
    setEditToastMessage,
    setDeleteToastMessage
}) => {


    return (
        <>
            {createGroupModalOpen && (
                <Modal>
                    <GroupCreateModal 
                        userId={user?.id}
                        closeModal={()=>setCreateGroupModalOpen(false)}
                        setToastMessage={setToastMessage}
                    />
                </Modal> 
            )}

            {createLinkModalOpen && (
                <Modal>
                    <AddLinkModal 
                        userId={user?.id}
                        closeModal={()=>setCreateLinkModalOpen(false)}
                        groupName={groupNameSelected}
                        groupId={groupIdSelected}
                        setToastMessage={setToastMessage}
                    />
                </Modal>
            )}

            {selectedCardEditModal && (
                <Modal>
                    <CardEditModal 
                        cardId={cardIdEdit}
                        cardTitle={cardTitleEdit}
                        closeModal={()=>setSelectedCardEditModal(null)}
                        setEditToastMessage={setEditToastMessage}
                    />
                </Modal>
            )}

            {selectedCardDeleteModal && (
                <Modal>
                    <DeleteCardWarning 
                        userId={user?.id}
                        cardId={cardIdDelete}
                        cardTitle={cardTitleDelete}
                        closeModal={()=>setSelectedCardDeleteModal(null)}
                        setDeleteToastMessage={setDeleteToastMessage}
                    />
                </Modal>
            )}

        </>
    )
}