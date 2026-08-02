
// icons
import Add from '/src/assets/Icons/add.svg?react';


export const NoCard = ({ setAddLinkModalOpen }) => {

    return (
        <div className='flex flex-col items-center justify-center w-full h-[650px] gap-[1rem]'>
            <span className='text-[#FAFAFA] text-[18px] opacity-50'>There are no saved links yet. Save a link today.</span>
            <button onClick={() => setAddLinkModalOpen(true)} className='flex items-center border-2 border-dashed border-[#FAFAFA]/25 p-[1rem] rounded-full bg-[#191919] hover:bg-[#252525]/75 active:bg-[#191919] cursor-pointer'>
                <Add className="w-[30px] h-[30px] opacity-75" />
                <span className='text-[#FAFAFA] text-[18px] opacity-75 px-[1rem]'>Add Link</span>
            </button>
        </div>
    )
}