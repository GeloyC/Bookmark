
import Folder from '/src/assets/Icons/folder.svg?react';

export const CreateGroupButton = ({
    onClick
}) => {
    return (
        <button onClick={onClick} className="flex items-center  hover:bg-[#252525]/75 active:bg-[#252525]/25 p-2 rounded-[10px] cursor-pointer">
            <Folder className="size-5"/>
            <span className="px-2 font-[500] text-[#FAFAFA] whitespace-nowrap">Create a group</span>
        </button>
    )
}