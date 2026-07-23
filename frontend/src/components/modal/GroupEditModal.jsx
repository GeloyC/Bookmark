//hook
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// icon
import Close from '/src/assets/Icons/close.svg?react';
import { editGroupName } from "../../lib/group.service";

// service

export const GroupEditModal = ({
    groupId,
    setSelectedGroupEditModal,
    groupName
}) => {

    const [name, setName] = useState(groupName);
    console.log(name);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            console.log("Escape pressed");
            setSelectedGroupEditModal(null)
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
            console.log('Result: ', response);
            setSelectedGroupEditModal(null);
            queryClient.invalidateQueries({
                queryKey: ['groups']
            })
        }
    });


    return (
        <div tabIndex={-1} onKeyDown={handleKeyDown} className="flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">

            <div className="flex items-center justify-between w-full">
                <span className="text-[22px] text-[#FAFAFA] font-bold">Edit</span>

                <button onClick={()=>setSelectedGroupEditModal(null)} className="cursor-pointer rounded-full p-1 hover:bg-[#252525] active:bg-transparent">
                    <Close className="w-[20px] h-[20px]" />
                </button>
            </div>

            <div className="flex flex-col w-full gap-[1rem]">
                <span className="text-[#FAFAFA] text-[16px]">You will be renaming the group name {groupName}</span>

                <input type="text" id="group_name" 
                defaultValue={groupName} onBlur={(e)=>setName(e.target.value)}
                className="border border-[#252525] bg-[#252525] focus:outline-none focus:border-[#8cd56a] rounded-[10px] p-3 text-[#FAFAFA]"/>
            </div>

            <div className="flex items-center w-full gap-1">
                <button onClick={
                    () => handleEditGroupName.mutate({
                        id: groupId,
                        name: name
                    })
                    } className="w-full py-3 bg-[#71cb47]/75 hover:bg-[#71cb47] active:bg-[#71cb47]/75 rounded-[10px] cursor-pointer">
                    <span className="text-center text-[#141414]">Save</span>
                </button>

                
                <button onClick={()=>setSelectedGroupEditModal(null)} className="w-full py-3 bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525]/75 rounded-[10px] cursor-pointer">
                    <span className="text-center text-[#FAFAFA]">Cancel</span>
                </button>
            </div>

        </div>
    )
}