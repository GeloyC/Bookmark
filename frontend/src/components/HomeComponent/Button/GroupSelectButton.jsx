
import ArrowDown from '/src/assets/Icons/arrow-down.svg?react'

export const GroupSelectButton = ({
    selectedGroup,
    setIsOpen,
    isOpen
}) => {

    return (
        <div className="flex items-center">
            <button onClick={()=>setIsOpen(open => !open)}
                className="flex items-center bg-[#252525]/50 hover:bg-[#252525] active:bg-[#252525]/50 text-[#FAFAFA] cursor-pointer font-[500] py-2 px-3 rounded-[10px]"
            >
                <span className='px-2 text-[16px]'>{
                    selectedGroup
                        ? selectedGroup.charAt(0).toUpperCase() + selectedGroup.slice(1)
                        : "Select a group"
                }</span>
                <ArrowDown className={`size-6 ${isOpen ? '-rotate-90' : ''} transition-all duration-100`} />
            </button>
        </div>
    )
}