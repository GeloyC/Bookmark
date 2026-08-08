
// icons
import Add from '/src/assets/Icons/add.svg?react';


export const NoCard = ({ 
    // setCreateLinkModalOpen,
    // selectedGroup,
    selectedGroup,
    openModal
}) => {

    return (
        <div className='fade-in flex flex-col items-center justify-center w-full max-h-[650px] gap-[1.5rem]'>
            <div className='flex flex-col justify-center items-center gap-[1rem]'>
                <span className='text-[#71cb47] text-[20px] leading-none'>'{selectedGroup?.name}' group is empty</span>

                <span className='text-[#FAFAFA]/50 w-[450px] text-center text-[16px]'>
                    Start by adding a link that relates to the group. Make sure to customize a title for the link, it gives you context later on when you decide to visit it later 
                </span>
            </div>
            <button onClick={() => openModal('create-link', selectedGroup?.name)} className='flex items-center p-[0.3rem] px-[0.5rem] rounded-[10px] bg-[#71cb47]/50 hover:bg-[#71cb47]/75 active:bg-[#71cb47]/50 cursor-pointer'>
                <Add className="size-4" />
                <span className='text-[#FAFAFA] text-[16px] px-[0.3rem]'>Add Link</span>
            </button>
        </div>
    )
}