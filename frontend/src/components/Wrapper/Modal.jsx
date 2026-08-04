
export const Modal = ({ children }) => {

    return (
        <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-[#141414]/50 backdrop-blur'>
            {children}
        </div>
    )
}