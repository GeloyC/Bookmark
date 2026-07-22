//hook
import React from "react";

// service


export const GroupEditModal = ({
    groupId,
    setSelectedGroupEditModal
}) => {

    console.log('Current group_id: ', groupId);
    console.log('GroupEditModal');

    return (
        <div className="flex flex-col items-start w-[600px] h-auto bg-[#191919] p-[2rem] pb-[2.5rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]">
            <span>Group ID: {groupId}</span>
            <button onClick={() => {setSelectedGroupEditModal(null); console.log('asdasdasd');}}>Close</button>
        </div>
    )
}