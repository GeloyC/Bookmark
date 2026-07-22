
import { Link } from 'react-router-dom';

// component
import { Card } from './Cards/Card';

// icons
import Delete from '/src/assets/Icons/delete.svg?react';
import Copy from '/src/assets/Icons/copy.svg?react';
import Add from '/src/assets/Icons/add.svg?react';
import Folder from '/src/assets/Icons/folder.svg?react';


export const LinkWrapper = ({
    setOpenAddLinkModal,
    cards,
    selectedGroup
}) => {


    return (
        <div className='flex flex-col items-center justify-start w-full h-full gap-[0.5rem] bg-[#191919] p-[1rem] rounded-[10px]'>
            {cards.length > 0 && (
                <div className='flex items-center justify-between w-full'>
                    <span className='text-[#FAFAFA] opacity-50 leading-none'>Showing {cards.length} results</span>

                        <button onClick={() => setOpenAddLinkModal(true)}  title='Add Link' type='button' className='flex items-center justify-center gap-2 bg-[#252525] hover:bg-[#191919] active:bg-[#252525] h-[40px] px-2 border-1 border-dashed border-[#FAFAFA]/50 rounded-full cursor-pointer'>
                            <Add className="w-[25px] h-[25px] opacity-75"/>
                        </button>
                </div>
            )}

            <div className='flex flex-col items-start w-full h-[650px] overflow-y-auto thin-scrollbar gap-2'>
                {cards.length > 0 ? (
                    cards.map(card => (
                        <Card key={card.id} card={card}/>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center w-full h-full gap-[1rem]'>
                        <span className='text-[#FAFAFA] text-[18px] opacity-50'>There are no saved links yet. Save a link today.</span>
                        <button onClick={() => setOpenAddLinkModal(true)} className='flex items-center border-2 border-dashed border-[#FAFAFA]/25 p-[1rem] rounded-full bg-[#191919] hover:bg-[#252525]/75 active:bg-[#191919] cursor-pointer'>
                            <Add className="w-[30px] h-[30px] opacity-75" />
                            <span className='text-[#FAFAFA] text-[18px] opacity-75 px-[1rem]'>Add Link</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}