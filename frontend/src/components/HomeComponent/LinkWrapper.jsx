
import { Link } from 'react-router-dom';

// component
import { Card } from './Cards/Card';

// icons
import Delete from '/src/assets/Icons/delete.svg?react';
import Copy from '/src/assets/Icons/copy.svg?react';
import Add from '/src/assets/Icons/add.svg?react';
import Folder from '/src/assets/Icons/folder.svg?react';


export const LinkWrapper = ({
    cards,
    setOpenAddLinkModal,
    selectedGroup,
    isCardsLoading,
    children
}) => {
    

    if (isCardsLoading) {
        return (
            <div className='fade-in flex flex-col items-center justify-center w-full min-h-[650px] gap-[0.5rem] p-[1rem] rounded-[10px]'>
                <span className='text-[#FAFAFA]'>
                    loading...
                </span>
            </div>
        )
    }

    return (
        <div className='fade-in flex flex-col items-center justify-start w-full h-full gap-[0.5rem]'>
            <div className={`flex flex-col items-center justify-start w-full h-auto gap-[1rem] ${cards.length <= 0 ? '' : 'bg-[#191919] border border-dashed border-[#71cb47]/15'}  p-[1rem] rounded-[10px] `}>
                {cards.length >= 1 && (
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-[1rem]'>
                            <span className='text-[#8cd56a] text-[22px] font-bold'>{selectedGroup?.toUpperCase()}</span>
                            <span className='text-[#FAFAFA] opacity-50 leading-none'>Showing {cards.length} results</span>
                        </div>

                            <button onClick={() => setOpenAddLinkModal(true)}  title='Add Link' type='button' className='flex items-center justify-center bg-[#71cb47]/75 hover:bg-[#71cb47] h-full active:bg-[#71cb47]/75 rounded-[10px] cursor-pointer'>
                                <Add className="size-6 pl-2"/>
                                <span className='px-1 pr-3 text-[15px] text-[#141414]/75 font-bold leading-none'>Add a Link</span>
                            </button>
                    </div>
                )}

                <div className='flex flex-col items-start w-full max-h-[650px] overflow-y-auto thin-scrollbar gap-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}