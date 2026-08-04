
export const TopBar = ({children}) => {

    return (
        <div className='flex items-center justify-between w-full border-b border-dashed border-b-[#FAFAFA]/15 pb-[1rem]'>
            {children}
        </div>
    )
}