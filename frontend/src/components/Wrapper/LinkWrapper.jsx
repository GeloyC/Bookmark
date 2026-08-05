// component
import { NoSelectedGroup } from '../HomeComponent/Group/NoSelectedGroup';
import { GroupsLoading } from '../HomeComponent/Group/GroupsLoading';

export const LinkWrapper = ({
    cards,
    groupName,
    isCardsLoading,
    children
}) => {
    

    if (isCardsLoading) return <GroupsLoading />
    if (!groupName) return <NoSelectedGroup />

    return (
        <div className='fade-in flex flex-col items-center justify-start w-full h-full gap-[0.5rem]'>
            <div className='flex flex-col items-start w-full max-h-[650px] overflow-y-auto thin-scrollbar gap-2'>
                {children}
            </div>
        </div>
    )
}