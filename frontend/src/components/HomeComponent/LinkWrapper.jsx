
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
            <div className='flex flex-col items-center justify-center w-full min-h-[650px] gap-[0.5rem] p-[1rem] rounded-[10px]'>
                <span className='text-[#FAFAFA]'>
                    loading...
                </span>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-start w-full h-full gap-[0.5rem]'>
            <div className={`flex flex-col items-center justify-start w-full h-auto gap-[1rem] ${cards.length == 0 ? '' : 'bg-[#191919]'}  p-[1rem] rounded-[10px]`}>
                {cards.length >= 0 && (
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-[2rem]'>
                            <span className='text-[#8cd56a] text-[22px] font-bold'>{selectedGroup?.toUpperCase()}</span>
                            <span className='text-[#FAFAFA] opacity-50 leading-none'>Showing {cards.length} results</span>
                        </div>

                            <button onClick={() => setOpenAddLinkModal(true)}  title='Add Link' type='button' className='flex items-center justify-center gap-2 bg-[#252525] hover:bg-[#191919] active:bg-[#252525] h-[38px] w-[38px] p-1 border-1 border-dashed border-[#FAFAFA]/50 rounded-full cursor-pointer'>
                                <Add className="size-9 opacity-75"/>
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