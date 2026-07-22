import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import Close from '/src/assets/Icons/close.svg?react';
import Edit from '/src/assets/Icons/edit.svg?react';

// service
import { deleteGroupByID, getGroupsById } from '../../lib/group.service';
import { Group } from './Group/Group';

export const GroupWrapper = ({
    user, // passed from useUserContext from /Home.jsx
    groups, // passed from /Home.jsx,
    selectedGroup,
    setSelectedGroup, // passed this setState from /Home.jsx
    setSelectedGroupId,
    setGroupModalOpen,
    handleOpenGroupEditModal
}) => {

    const queryClient = useQueryClient();
    const handleDeleteGroup = useMutation({
        mutationFn: async (id) => {
            const res = await deleteGroupByID(id);
            return res;
        },
        onSuccess: (res) => {
            console.log('Group deleted: ', res.data);
            queryClient.invalidateQueries({
                queryKey: ['groups']
            })

            queryClient.invalidateQueries({
                queryKey: ['cards']
            })
        }
    });


    const handleSelectGroupId = (id) => {
        setSelectedGroupId(prev => prev === id ? null : id);
        console.log('Selected group id: ', id);
    }   



    return (
        <div className='flex flex-col items-start gap-1 w-full h-full rounded-t-[10px] '>

            <div className='flex w-full items-center justify-between pb-1'>
                <span className='text-[#8cd56a]'>Groups</span>

                <button onClick={() => setGroupModalOpen(true)} title='Create Group' className='flex items-center justify-center gap-2 opacity-50 hover:opacity-100 active:opacity-50 rounded-full cursor-pointer transition-all duration-100'>
                    <Folder className="w-[25px] h-[25px] opacity-75"/>
                </button>
            </div>
            
            <div className='flex flex-col w-full max-h-[700px] overflow-y-auto overflow-x-hidden thin-scrollbar gap-1'>
                {groups.map(group => (
                    <Group key={group.id}
                        group={group}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                        handleSelectGroupId={handleSelectGroupId}
                        handleDeleteGroup={() => handleDeleteGroup.mutate(group.id)}
                        handleOpenGroupEditModal={handleOpenGroupEditModal}
                    />
                ))}
            </div>
        </div>
    )
}