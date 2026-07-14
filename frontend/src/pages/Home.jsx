import React, { useState } from 'react'

import Navigation from '../components/Navigation'

// icons
import Folder from '/src/assets/Icons/folder.svg?react';
import { GroupCreateModal } from '../components/modal/GroupCreateModal';

const Home = () => {

    const [groupModalOpen, setGroupModalOpen] = useState(false);

    return (
        <>
            <div className='flex flex-col w-full h-screen bg-[#141414] px-[2rem] xl:px-[16rem] py-[2rem] gap-[1rem]'>
                <Navigation />

                <div className='flex flex-col items-center justify-center w-full h-full p-[1rem] rounded-[15px]'>
                    <div className='flex flex-col w-full h-full items-center justify-center'>
                        <div className='flex items-center gap-[1rem]'>
                            <button onClick={() => setGroupModalOpen(true)} className='flex flex-col items-center justify-center bg-[#191919] hover:bg-[#1D1D1D] active:bg-[#191919] cursor-pointer p-[1rem] px-[1.5rem] rounded-[15px] border-2 border-dashed border-[#FAFAFA]/25 gap-[0.5rem]'>
                                <Folder className="w-[30px] h-[30px] opacity-75"/>
                                <span className='text-[#FAFAFA]'>Create Group</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {groupModalOpen && (
                <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur-[10px]'>
                    <GroupCreateModal
                        // add a close function here to close the modal
                        setCloseModal={setGroupModalOpen}
                    />
                </div>
            )}
        </>
    )
}

export default Home