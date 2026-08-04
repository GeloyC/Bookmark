
// icon
import Setting from '/src/assets/Icons/settings.svg?react'

export const ManageGroupButton = ({
    setManageGroupModalOpen
}) => {

    return (
        <button onClick={()=>setManageGroupModalOpen(open=>!open)} className="flex items-center  hover:bg-[#252525]/75 active:bg-[#252525]/25 p-2 rounded-[10px] cursor-pointer">
            <Setting className="size-5" />
            <span className="px-2 font-[500] text-[#FAFAFA] whitespace-nowrap">Manage Group</span>
        </button>
    )
}