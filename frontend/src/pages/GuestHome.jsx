
export const GuestHhome = ({
    setCreateAccountModalOpen
}) => {

    return (
        <>
            <div className="flex flex-col w-full items-center justify-start gap-[2rem] pt-[4rem] bg-[url('/public/background_pattern.png')] bg-fixed bg-[length:800px] h-full">
                <div className="flex flex-col items-center w-full justify-center">
                    <span className="text-[#71cb47] text-8xl leading-none font-bold">Save Your Links</span>
                    <span className="text-[#FAFAFA] text-8xl leading-none font-bold">Visit Them Later</span>
                </div>

                <p className="text-[22px] text-[#FAFAFA] text-center leading-none">
                    Create a group, paste your links, set a custom title for each then visit them all later
                </p>

                <div className="flex items-center w-full justify-center gap-2">
                    <button onClick={()=>setCreateAccountModalOpen(true)} className="px-6 py-3 bg-[#71cb47]/90 hover:bg-[#71cb47] active:bg-[#71cb47]/75 rounded-[10px] cursor-pointer transition-all duration-100">
                        <span className="text-[#141414] font-bold">Get Started</span>
                    </button>

                    <button className="px-6 py-3 bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525]/80 rounded-[10px] cursor-pointer transition-all duration-100">
                        <span className="text-[#FAFAFA] font-bold">How it Works</span>
                    </button>
                </div>

                <div className="rounded-[10px] bg-gradient-to-b from-[#FAFAFA]/25 to-transparent p-[2px] w-[75rem]">
                    <img src="/public/hero_image.png" alt="hero image" className="bg-transparent rounded-[10px]"/>
                </div>
            </div>
        </>
    )
}