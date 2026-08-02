import { useState } from 'react';


// icons
import Copy from '/src/assets/Icons/copy.svg?react';
import Check from '/src/assets/Icons/check.svg?react'
import { Link } from 'react-router-dom';


export const GuestHhome = ({
    setCreateAccountModalOpen
}) => {

    const [isCopied, setIsCopied] = useState(false);
    const handleCopyLink = async (link) => {
        await navigator.clipboard.writeText(link);
        setIsCopied(true);

        console.log('Copied link: ', link);
        setTimeout(() => setIsCopied(false), 2000);
    }
    

    return (
        <>
            <section className="flex flex-col w-full items-center justify-start gap-[2rem] pt-[4rem] pb-[2rem] px-[16rem] h-full">
                <div className="flex flex-col items-center w-full justify-center">
                    <span className="text-[#FAFAFA] text-8xl leading-none font-bold">Save Your Links,</span>
                    <span className="text-[#FAFAFA] text-8xl leading-none font-bold">Visit Them Later</span>
                </div>

                <p className="text-[22px] text-[#FAFAFA] text-center leading-none">
                    Paste your links, organize them into groups, customize every title, and access them whenever you need
                </p>

                <div className="flex items-center w-full justify-center gap-2">
                    <button onClick={()=>setCreateAccountModalOpen(true)} className="px-6 py-3 bg-[#71cb47]/90 hover:bg-[#71cb47] active:bg-[#71cb47]/75 rounded-[10px] cursor-pointer transition-all duration-100">
                        <span className="text-[#141414] font-bold">Get Started</span>
                    </button>

                    <a href="#explore_section" className="px-6 py-3 bg-[#252525]/75 hover:bg-[#252525] active:bg-[#252525]/80 rounded-[10px] cursor-pointer transition-all duration-100">
                        <span className="text-[#FAFAFA] font-bold">Explore More</span>
                    </a>
                </div>

                <div className="rounded-[10px] bg-gradient-to-b from-[#FAFAFA]/25 to-transparent p-[2px] max-w-[75rem]">
                    <img src="/hero_image.png" alt="hero image" className="bg-transparent rounded-[10px]"/>
                </div>
            </section>


            <section id="explore_section" className="flex flex-col justify-center w-full h-full py-[5rem] px-[16rem] gap-[2rem] bg-[url('/background_pattern.png')] bg-fixed bg-[length:800px]">
                <span className="text-left text-[#FAFAFA] text-[50px] font-bold">
                    Link management made simple.
                </span>

                <div className="flex justify-center items-center w-full h-full">
                    <div className="flex flex-col justify-between w-[600px] h-full pr-[1rem] gap-[1rem]">
                        <div className="flex flex-col w-full gap-[1rem]">
                            <span className="text-[#71cb47] text-[24px] font-bold">Organize your links by Group</span>
                            <span className="text-[#FAFAFA] opacity-75">Categorize your links by groups. Keep related links together to make them easier to manager and revisit later.</span>
                        </div>
                        <div className="flex w-full rounded-[15px] overflow-hidden">
                            <img src="/create_group.png" alt="create group modal image" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between w-[600px] h-full pl-[1rem] gap-[1rem]">
                        <div className="flex flex-col w-full gap-[1rem]">
                            <span className="text-[#71cb47] text-[24px] font-bold">Customize a title for each Link</span>
                            <span className="text-[#FAFAFA] opacity-75">
                                Replace generic webpage titles with names you'll actually recognize. Make your bookmarks easier to find by using custom titles.
                            </span>
                        </div>

                        <div className="flex w-full rounded-[15px] overflow-hidden">
                            <img src="/add_link.png" alt="add link modal image"/>
                        </div>
                    </div>
                </div>
            </section>


            <section className="flex flex-col w-full items-center justify-center bg-[#141414] min-h-[300px] px-[16rem]">
                <span className="text-[#FAFAFA] text-[46px] font-bold">Get Started Today</span>

                <div className="flex items-center w-full justify-center gap-2">
                    <button onClick={()=>setCreateAccountModalOpen(true)} className="px-6 py-3 bg-[#71cb47]/90 hover:bg-[#71cb47] active:bg-[#71cb47]/75 rounded-[10px] cursor-pointer transition-all duration-100">
                        <span className="text-[#141414] font-bold">Get Started</span>
                    </button>
                </div>
            </section>

            <footer className="flex items-start justify-between w-full px-[16rem] border border-t-[#FAFAFA]/10 py-[1rem]">
                <div className="flex items-center w-full gap-[1rem]">
                    <img src="/src/assets/logo/link_saver_logo.png" alt="logo" className="size-5"/>
                    <span className="text-[#FAFAFA] text-[14px] opacity-50 leading-tight">
                        This is a personal project created to enrich my knowledge on building application with CRUD features.
                    </span>
                </div>

                <div className="flex items-center gap-[0.5rem]">
                    <span className="text-right text-[#71cb47] text-[12px] whitespace-nowrap bg-[#71cb47]/25 rounded-full p-0.5 px-2">Hire me</span>

                    <div className="flex gap-[0.3rem]">
                        <span className="text-right text-[#71cb47] text-[14px] whitespace-nowrap">
                            angelocabangal01@gmail.com
                        </span>
                        
                        {!isCopied ? (
                            <button onClick={()=>handleCopyLink('angelocabangal01@gmail.com')} className="cursor-pointer opacity-75 hover:opacity-100 active:opacity-75 transition-all duration-100">
                                <Copy className="size-5 opacity-50"/>
                            </button>
                        ):(
                            <button className="cursor-pointer opacity-75 hover:opacity-100 active:opacity-75 transition-all duration-100">
                                <Check className="size-4"/>
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        </>
    )
}