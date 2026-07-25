import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// service
import { deleteGroupByID } from '../../lib/group.service';

// icons
import Close from '/src/assets/Icons/close.svg?react';

export const DeleteGroupWarning = ({
    groupId,
    groupName,
    cardCount,
    setSelectedGroupDeleteModal
}) => {

    const queryClient = useQueryClient();
    const handleDeleteGroup = useMutation({
        mutationFn: async (id) => {
            const res = await deleteGroupByID(id);
            return res;
        },
        onSuccess: (res) => {
            console.log('Group deleted: ', res.data);
            setSelectedGroupDeleteModal(null);
            queryClient.invalidateQueries({
                queryKey: ['groups']
            })

            queryClient.invalidateQueries({
                queryKey: ['cards']
            })
        }
    });

    return (
        <div className="modal-in flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">
            <div className="flex items-center w-full">
                <span className="text-[#FAFAFA] text-[24px] font-bold">Do you want to delete "{groupName}" group?</span>
            </div>

            <div className='flex items-center w-full gap-2'>
                <button onClick={()=>handleDeleteGroup.mutate(groupId)} className='bg-[#B90000]/75 hover:bg-[#B90000] active:bg-[#B90000]/75 py-3 rounded-[10px] w-full cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Delete</span>
                </button>

                <button onClick={()=>setSelectedGroupDeleteModal(null)} className='bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525]/75 py-3 rounded-[10px] w-full cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Cancel</span>
                </button>
            </div>
        </div>
    )
}