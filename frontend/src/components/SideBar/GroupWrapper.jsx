

export const GroupWrapper = ({
    children,
}) => {

    return (
        <div className="relative flex flex-col gap-[0.2rem]">
            {children}
        </div>
    )
}