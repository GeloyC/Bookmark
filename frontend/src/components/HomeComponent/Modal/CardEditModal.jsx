import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// icon
import Close from '/src/assets/Icons/close.svg?react';
import { updateLinkTitle } from "../../../lib/card.service.js";


export const CardEditModal = ({
    card,
    closeModal,
    setEditToastMessage
}) => {

    const [originalTitle, setOriginalTitle] = useState(card.title);
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState('');

    const queryClient = useQueryClient();

    const handleRenameLinkTitle = useMutation({
        mutationFn: async ({id, title}) => {

            if (title === originalTitle) {
                setError('Title is not changed');
                setTimeout(() => setError(''), 1500);
                return;
            }

            const response = await updateLinkTitle(
                id,
                title
            );

            return response;

        }, onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['cards']
            });
            closeModal();
            setEditToastMessage('Link title updated successfully!');
            setTimeout(()=>setEditToastMessage(null), 3000);
        }
    });


    return (
        <div className="modal-in flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">
            <div className="flex items-center justify-between w-full">
                <span className="text-[#FAFAFA] text-[24px] font-bold">Rename '{card.title?.split('').splice(0,40)}...' ?</span>
            </div>

            <span className="text-[#FAFAFA] opacity-75">
                Choose a new title that better reflects the content of the link. A clear and descriptive name makes it easier to find later.
            </span>

            <input type="text" 
                defaultValue={card.title} onBlur={(e)=>setNewTitle(e.target.value)}
                className="w-full bg-[#252525] border border-[#252525] p-3 text-[#FAFAFA] rounded-[10px]
                focus:outline-none focus:border-[#8cd56a]"
            />

            {error && <span className="text-[#FAFAFA]">{error}</span>}

            <div className="flex items-center w-full gap-1">
                <button onClick={()=>{
                    handleRenameLinkTitle.mutate({
                        id: card.id,
                        title: newTitle
                    })
                }} disabled={handleRenameLinkTitle.isPening} className="bg-[#8cd56a]/75 py-3 hover:bg-[#8cd56a] active:bg-[#8cd56a]/75 w-full rounded-[10px] cursor-pointer">
                    <span className="text-[#141414]">{handleRenameLinkTitle.isPening ? 'Saving...' : 'Save'}</span>
                </button>

                <button onClick={closeModal} className="bg-[#252525]/75 py-3 hover:bg-[#252525] active:bg-[#252525]/75 w-full rounded-[10px] cursor-pointer">
                    <span className="text-[#FAFAFA]">Cancel</span>
                </button>
            </div>
        </div>
    )
}