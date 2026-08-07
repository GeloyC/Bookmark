
import Add from '/src/assets/Icons/add.svg?react';

export const CreateLinkButton = ({
    openModal
}) => {

    return (
        <button onClick={openModal} className='flex items-center bg-[#71cb47]/30 hover:bg-[#71cb47]/50 active:bg-[#71cb47]/30 px-3 h-full rounded-[5px] cursor-pointer gap-1'>
            <Add className="size-4" />
            <span className='pr-1 text-[#FAFAFA] text-[14px] font-[500] opacity-90'>Add Link</span>
        </button>
    )
}