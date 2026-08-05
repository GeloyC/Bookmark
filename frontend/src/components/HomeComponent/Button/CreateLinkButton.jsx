
import Add from '/src/assets/Icons/add.svg?react';

export const CreateLinkButton = ({
    openModal
}) => {

    return (
        <button onClick={openModal} className='flex items-center bg-[#71cb47] hover:bg-[#71cb47]/80 active:bg-[#71cb47]/25 p-2 rounded-[10px] cursor-pointer'>
            <Add className="size-5 opacity-90" />
            <span className='px-2 text-[#1414141] text-[16px] font-[500] opacity-90'>Add a link</span>
        </button>
    )
}