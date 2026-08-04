
import { useState } from "react"  

// icons
import Menu from '/src/assets/Icons/three-dots.svg?react';

// component
import { ManageGroupButton } from "../HomeComponent/Button/ManageGroupButton";
import { CreateGroupButton } from '../HomeComponent/Button/CreateGroupButton';


export const GroupSettings = ({
    setCreateGroupModalOpen,
    setManageGroupModalOpen
}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex">
            <button onClick={()=>setIsOpen(open => !open)} className="bg-[#252525] p-2.5 rounded-full cursor-pointer hover:bg-[#252525]/75 active:bg-[#252525]/25">
                <Menu className={`size-5 ${isOpen && "rotate-90"} transition-all duration-100`} />
            </button>
            
            {isOpen && (
                <div className="fade-in absolute top-10 right-0 flex flex-col gap-2 p-2 w-auto bg-[#141414] rounded-[10px] border border-[#FAFAFA]/10">
                    <CreateGroupButton 
                        setCreateGroupModalOpen={setCreateGroupModalOpen}
                    />

                    <ManageGroupButton 
                        setManageGroupModalOpen={setManageGroupModalOpen}
                    />
                </div>
            )}
        </div>
    )
}