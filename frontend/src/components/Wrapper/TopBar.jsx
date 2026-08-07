// icon
import Folder from '/src/assets/Icons/folder.svg?react'

// component
import { CreateLinkButton } from '../HomeComponent/Button/CreateLinkButton'


export const TopBar = ({
    openModal,
    groupSelected,
    createLinkCondition
}) => {

    return (
        <div className='flex items-center justify-between w-full h-[35px]'>
            <div className="flex items-center gap-[0.75rem]">
                <Folder className="size-5 opacity-75" />
                <span className="text-[#FAFAFA] text-[18px] font-bold leadiing-tight">{groupSelected?.name}</span>
            </div>

            {createLinkCondition && (
                <CreateLinkButton 
                    openModal={openModal}
                />
            )}
        </div>
    )
}