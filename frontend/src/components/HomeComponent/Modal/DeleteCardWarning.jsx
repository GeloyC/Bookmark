
import { useMutation, useQueryClient } from "@tanstack/react-query"

// service
import { deleteSelectedCard } from "../../../lib/card.service";

export const DeleteCardWarning = ({
    userId,
    cardId,
    cardTitle,
    closeModal,
    setDeleteToastMessage
}) => {
    
    const queryClient = useQueryClient();

    const handleDeleteLink = useMutation({
        mutationFn: async ({ id }) => {
            console.log('Selected ID: ', id);
            await deleteSelectedCard(id);
        }, onSuccess: () => {
            closeModal();

            queryClient.invalidateQueries({
                queryKey: ['cards']
            });
            queryClient.invalidateQueries({
                queryKey: ['groups', userId]
            });

            setDeleteToastMessage(`Link successfully deleted!`);
            setTimeout(()=>setDeleteToastMessage(null), 3000);
        }
    })

    console.log('cardId: ', cardId);

    return (
        <div className="modal-in flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">
            <div className="flex items-center w-full">
                <span className="text-[#FAFAFA] text-[24px] font-bold">Do you want to delete "{cardTitle}" card?</span>
            </div>

            <div className='flex items-center w-full gap-2'>
                <button onClick={()=>handleDeleteLink.mutate({id:cardId})} className='bg-[#B90000]/75 hover:bg-[#B90000] active:bg-[#B90000]/75 py-3 rounded-[10px] w-full cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Delete</span>
                </button>

                <button onClick={closeModal} className='bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525]/75 py-3 rounded-[10px] w-full cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Cancel</span>
                </button>
            </div>
        </div>
    )
}