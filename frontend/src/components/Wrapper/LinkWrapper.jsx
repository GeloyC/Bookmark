// component
import { NoSelectedGroup } from '../HomeComponent/Group/NoSelectedGroup';
import { GroupsLoading } from '../HomeComponent/Group/GroupsLoading';

export const LinkWrapper = ({
    groupName,
    isCardsLoading,
    children
}) => {
    

    if (isCardsLoading) return <GroupsLoading />
    if (!groupName) return <NoSelectedGroup />

    return (
        <div className='fade-in flex flex-col items-center justify-start w-full h-full gap-[1rem] px-[2rem] py-[1rem]'>
            {children}
        </div>
    )
}