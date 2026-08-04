import { useState } from "react"
import { GroupSelectButton } from "../HomeComponent/Button/GroupSelectButton"
import { GroupItem } from "../HomeComponent/Button/GroupItem";

export const GroupSelectection = ({
    groups, 
    selectedGroup,
    setSelectedGroup,
    setSelectedGroupId
}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center z-10">
            <div className="relative flex gap-2">
                <GroupSelectButton
                    selectedGroup={selectedGroup}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                />

                {isOpen && (
                    <div className="fade-in absolute top-11 flex flex-col bg-[#141414] rounded-[8px] p-2 gap-2 border border-[#FAFAFA]/10">
                        {groups.map(group => (
                            <GroupItem key={group.id}
                                group={group}
                                onClick={() => {
                                    setSelectedGroup(group.name);
                                    setSelectedGroupId(group.id);
                                    setIsOpen(open => !open)
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}