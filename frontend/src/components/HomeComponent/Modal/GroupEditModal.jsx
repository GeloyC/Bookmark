//hook
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// icon
import Close from '/src/assets/Icons/close.svg?react';
import { editGroupName } from "../../../lib/group.service";

// service

export const GroupEditModal = ({
    userId,
    group,
    closeModal,
    groupName,
    setEditToastMessage
}) => {

    console.log('Group Edit Modal', group);
    const [name, setName] = useState(group?.name);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            console.log("Escape pressed");
            closeModal()
        }
    };


    const queryClient = useQueryClient();

    const handleEditGroupName = useMutation({
        mutationFn: async ({id, name}) => {
            const response = await editGroupName(
                id, 
                name
            );

            return response;
        }, onSuccess: (response) => {
            closeModal();
            queryClient.invalidateQueries({
                queryKey: ['groups', userId]
            })

            setEditToastMessage(`Group title updated successfully!`);
            setTimeout(()=>setEditToastMessage(null), 3000)
        }
    });


    return (
        <div tabIndex={-1} onKeyDown={handleKeyDown} className="modal-in flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">

            <div className="flex items-center justify-between w-full">
                <span className="text-[28px] text-[#71cb47] font-bold">Rename group '{group?.name}' ?</span>
            </div>

            <div className="flex flex-col w-full gap-[1.5rem]">
                <span className="text-[#FAFAFA] text-[16px] opacity-75">You will be renaming the group name {group?.name}</span>

                <input type="text" id="group_name" 
                defaultValue={group?.name} onBlur={(e)=>setName(e.target.value)}
                className="border border-[#252525] bg-[#252525] focus:outline-none focus:border-[#8cd56a] rounded-[10px] p-3 text-[#FAFAFA]"/>
            </div>

            <div className="flex items-center w-full gap-1">
                <button onClick={
                    () => handleEditGroupName.mutate({
                        id: group.id,
                        name: name
                    })} disabled={handleEditGroupName.isPending}
                    className="w-full py-3 bg-[#71cb47]/75 hover:bg-[#71cb47] active:bg-[#71cb47]/75 rounded-[10px] cursor-pointer">
                    <span className="text-center text-[#141414]">{handleEditGroupName.isPending ? 'Saving' : 'Save'}</span>
                </button>

                
                <button onClick={closeModal} className="w-full py-3 bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525]/75 rounded-[10px] cursor-pointer">
                    <span className="text-center text-[#FAFAFA]">Cancel</span>
                </button>
            </div>

        </div>
    )
}