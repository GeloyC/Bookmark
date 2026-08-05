import { useState } from 'react';
import { useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';

// icon
import Close from '/src/assets/Icons/close.svg?react';

// service
import { createGroup } from '../../../lib/group.service.js';


export const GroupCreateModal = ({
    userId,
    closeModal, 
    setToastMessage
}) =>{

    const [groupName, setGroupName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const queryClient = useQueryClient();

    const createGroupMutation = useMutation({
        mutationFn: () => createGroup( userId,groupName),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['groups', userId]
            });
            setGroupName('');
            closeModal();
            setToastMessage('Group created successfuly!')
            setTimeout(() => setToastMessage(null), 3000);
        }, 
        onError: (err) => {
            setErrorMessage(err.response?.data.message);
        }
    });

    
    return (
        <div className={`modal-in flex flex-col items-start w-[500px] bg-[#191919] p-[2rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1.5rem] ${createGroupMutation.isPending && 'opacity-50'}`}>
            <span className="text-[#FAFAFA] text-[24px] font-bold leading-none">New Group</span>

            <div className='flex flex-col w-full items-center justify-center gap-[1rem]'>
                <input type="text" placeholder='Ex. YouTube Links' value={groupName} onChange={(e)=>{
                    setGroupName(e.target.value);
                    setErrorMessage('');
                }}
                className={`flex w-full text-[#FAFAFA] p-3 bg-[#252525] rounded-[10px] focus:outline-none border ${errorMessage ? 'border-[#FF0000]' : 'border-[#252525]'} focus:border-[#A8DF8E] transition-all duration-100`}/>

                {errorMessage && (
                    <span className='text-[#FF0000]'>{errorMessage}</span>
                )}

                <div className='flex items-center gap-1 w-full'>
                    <button onClick={() => createGroupMutation.mutate()} disabled={createGroupMutation.isPending} className='w-full py-[0.5rem] rounded-[10px] bg-[#8cd56a] hover:bg-[#A8DF8E] active:bg-[#8cd56a] cursor-pointer'>
                        <span className='text-center text-[16px] text-[#191919] font-bold'>{createGroupMutation.isPending ? 'Creating...' : 'Create'}</span>
                    </button>
                    <button onClick={closeModal} className='w-full py-[0.5rem] rounded-[10px] bg-[#191919] hover:bg-[#252525] active:bg-[#191919] cursor-pointer'>
                        <span className='text-center text-[16px] text-[#FAFAFA] font-bold'>Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    )
}