
export const GroupItem = ({
    group,
    onClick
}) => {

    return (
        <button onClick={onClick} className="flex items-center justify-start gap-2 hover:bg-[#252525]/75 active:bg-transparent p-2  rounded-[7px] cursor-pointer">
            <span className="flex items-center justify-center text-[#71cb47] text-[14px] bg-[#71cb47]/15 font-bold opacity-90 leading-none rounded-[5px] size-5">{group.card_count}</span>
            <span className="text-[#FAFAFA] text-[16px] whitespace-nowrap">
                {group.name}
            </span>
        </button>
    )
}