
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// icons
import Close from '/src/assets/Icons/close.svg?react';
import ArrowDown from '/src/assets/Icons/arrow-down.svg?react';

// service
import { createNewLink, deleteSelectedCard, updateLinkTitle } from '../../lib/card.service.js';


export const AddLinkModal = ({
    setCloseModal,
    user,
    selectedGroup,
    groupId,
    setToastMessage
}) => {


    // state for animation
    const [isClosing, setIsClosing] = useState(false);
    const [errorExistedMessage, setErrorExistedMessage] = useState('');

    const handleClose = () => {
        console.log("handleClose");
        setIsClosing(true);
    };

    const handleAnimationEnd = () => {
        console.log("animation end", isClosing);

        if (isClosing) {
            console.log("closing modal");
            setCloseModal(false);
        }
    };

    const [groupSelectionOpen, setGroupSelectionOpen] = useState(false);
    const [newLink, setNewLink] = useState('');

    const [loading, setLoading] = useState(false);
    
    const [initialTitle, setInitialTitle] = useState(null);
    const [linkId, setLinkId] = useState(null);
    const [newTitle, setNewTitle] = useState('');


    const selectGroup = (value) => { setGroupName(value) };
    const queryClient = useQueryClient();

    const handleCreateNewLink = useMutation({
        mutationFn: async({ 
            card_holder_id,
            group_name,
            group_id,
            link
        }) => {
            const response = await createNewLink(
                card_holder_id,
                group_id,
                link
            );

            const returnedTitle = response.data.title;
            const returnedLinkId = response.data.id;

            setInitialTitle(returnedTitle);
            setNewTitle(returnedTitle);
            setLinkId(returnedLinkId);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['cards']
            });


        }, 
        onError: (err) => {
            console.log('Error message', err.response?.data.message);
            setErrorExistedMessage(err.response?.data.message)
        }
    });


    const handleUpdateNewLink = useMutation({
        mutationFn: async ({ 
            id,
            title
        }) => {
            setLoading(true);
            try {
                console.log('New title: ', title);
                const updatedTitle = await updateLinkTitle(
                    id,
                    title
                );

                return updatedTitle;
            } finally {
                setLoading(false);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['groups', user.id]
            });
            queryClient.invalidateQueries({
                queryKey: ['cards']
            });

            // closes the modal - with animation
            handleClose();

            setToastMessage(`New link added to ${selectedGroup}`);
            setTimeout(()=>{setToastMessage(null);}, 3000);
            
        }
    });

    
    // clicking undo should remove the link data altogether
    const handleUndoSavedLink = useMutation({
        mutationFn: async (id) => {
            const response = await deleteSelectedCard(id);
            return response;
        }, 
        onSuccess: (response) => {
            console.log('Result: ', response);
            queryClient.invalidateQueries({
                queryKey: ['cards']
            });
            
            // closes the modal - with animation
            handleClose();
        }
    });




    return (
        <div className={`${isClosing ? 'modal-out' : 'modal-in'} flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]`}
        onAnimationEnd={()=>handleAnimationEnd()}>

            <div className="flex items-center justify-between w-full">
                <span className="text-[#FAFAFA] text-[24px] font-bold">ADD LINK</span>
                <button onClick={handleClose} className="flex items-center justify-center cursor-pointer rounded-full hover:bg-[#252525] active:bg-[#191919] p-1">
                    <Close className="w-[20px] h-[20px]" />
                </button>
            </div>

            <div className='flex flex-col w-full gap-[1rem]'>
                <span className='text-[#FAFAFA] text-[16x]'>You will be saving a new link to <strong className='text-[#8cd56a]'>{selectedGroup}</strong>.</span>

                <div className='flex flex-col w-full gap-3'>
                    
                    <input type="text" placeholder='Add a link here' value={newLink} onChange={(e)=>{
                        setNewLink(e.target.value);
                        setErrorExistedMessage('');
                    }} disabled={newTitle} className={`bg-[#252525] p-3 ${newTitle ? 'opacity-50' : 'border border-[#FAFAFA]/25'} ${errorExistedMessage && 'border-[#FF0000]'} rounded-[10px] text-[#FAFAFA] text-[16px] focus:outline-none focus:border-[#8cd56a]`}/>
                    
                    {newTitle && (
                        <div className='flex flex-col w-full gap-1'>
                            <span className='text-[#FAFAFA] text-[14px] opacity-80'>Edit title</span>

                            <input type="text" 
                            value={newTitle} 
                            onChange={(e) => setNewTitle(e.target.value)} 
                            className='bg-[#252525] p-3 border border-[#FAFAFA]/25 rounded-[10px] text-[#FAFAFA] text-[16px] focus:outline-none focus:border-[#8cd56a]'
                            />
                        </div>
                    )}

                    {errorExistedMessage && (
                        <span className='text-[#FF0000] text-center text-[16px] leading-none'>{errorExistedMessage}</span>
                    )}
                    
                </div>
            </div>

            {initialTitle == null ? (
                <div className='flex items-center gap-2 w-full'>
                    
                    <button 
                        onClick={() => handleCreateNewLink.mutate({
                            card_holder_id: user.id,
                            group_name: selectedGroup,
                            group_id: groupId,
                            link: newLink
                        })} disabled={handleCreateNewLink.isPending}
                        className='w-full text-center p-3 rounded-[15px] bg-[#71cb47] hover:bg-[#8cd56a] active:bg-[#71cb47] cursor-pointer'>
                        <span className='text-[#141414]'>{handleCreateNewLink.isPending ? 'Creating...' : 'Continue'}</span>
                    </button>
                    <button onClick={handleClose} className='w-full text-center p-3 rounded-[15px] bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 cursor-pointer'>
                        <span className='text-[#FAFAFA]'>Cancel</span>
                    </button>
                </div>
            ):(
                <div className='flex items-center gap-2 w-full'>
                    <button onClick={() => handleUpdateNewLink.mutate({
                        id: linkId,
                        title: newTitle
                    })}
                        className='w-full text-center p-3 rounded-[15px] bg-[#71cb47] hover:bg-[#8cd56a] active:bg-[#71cb47] cursor-pointer'>
                        <span className='text-[#141414]'>{handleUpdateNewLink.isPending ? 'Finishing...' : 'Done'}</span>
                    </button>
                    <button onClick={() => handleUndoSavedLink.mutate(linkId)} className='w-full text-center p-3 rounded-[15px] bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 cursor-pointer'>
                        <span className='text-[#FAFAFA]'>Undo</span>
                    </button>
                </div>
            )}

        </div>
    )
}