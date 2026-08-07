// icons
import Add from '/src/assets/Icons/add.svg?react';

export const CreateGroupButton = ({
    openModal
}) => {
    return (
        <button onClick={openModal} className='flex items-center justify-start w-full px-2 py-2 bg-[#71cb47]/30 hover:bg-[#71cb47]/50 active:bg-[#71cb47]/30 rounded-[5px] cursor-pointer gap-[0.5rem]'>
            <Add className="size-4" />
            <span className='text-[#FAFAFA] text-[14px] font-bold'>Add Group</span>
        </button>
    )
}