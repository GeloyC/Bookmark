import { useState } from "react"

// modal components
import { AddLinkModal } from "../HomeComponent/Modal/AddLinkModal"
import { CardEditModal } from "../HomeComponent/Modal/CardEditModal"
import { GroupCreateModal } from "../HomeComponent/Modal/GroupCreateModal"
import { GroupEditModal } from "../HomeComponent/Modal/GroupEditModal"
import { ManageGroupModal } from "../HomeComponent/Modal/ManageGroupModal"

// warning components
import { DeleteCardWarning } from "../HomeComponent/Modal/DeleteCardWarning"
import { DeleteGroupWarning } from "../HomeComponent/Modal/DeleteGroupWarning"

// wrapper component
import { Modal } from "./Modal"

export const ModalWrapper = ({
    user,
    group,
    modal,
    closeModal,
    
    setToastMessage,
    setEditToastMessage,
    setDeleteToastMessage
}) => {


    return (
        <>
            {modal.type === 'create-group' && (
                <Modal>
                    <GroupCreateModal 
                        userId={user?.id}
                        closeModal={()=>closeModal()}
                        setToastMessage={setToastMessage}
                    />
                </Modal> 
            )}

            {modal.type === 'create-link' && (
                <Modal>
                    <AddLinkModal 
                        userId={user?.id}
                        closeModal={()=>closeModal()}
                        groupName={modal?.payload}
                        groupId={group.id}
                        setToastMessage={setToastMessage}
                    />
                </Modal>
            )}

            {modal.type === 'edit-link' && (
                <Modal>
                    <CardEditModal 
                        card={modal.payload}
                        closeModal={()=>closeModal()}
                        setEditToastMessage={setEditToastMessage}
                    />
                </Modal>
            )}

            {modal.type === 'delete-link' && (
                <Modal>
                    <DeleteCardWarning 
                        userId={user?.id}
                        card={modal.payload}
                        closeModal={()=>closeModal()}
                        setDeleteToastMessage={setDeleteToastMessage}
                    />
                </Modal>
            )}

            {modal.type === 'manage-group' && (
                <Modal>
                    <ManageGroupModal 
                        closeModal={()=>closeModal()}
                    />
                </Modal>
            )}

        </>
    )
}