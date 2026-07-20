import { Link } from 'react-router-dom';

// icons
import Delete from '/src/assets/Icons/delete.svg?react';
import Copy from '/src/assets/Icons/copy.svg?react';

export const Card = ({ card }) => {

    return (
        <div key={card.date_created} className='group flex items-center justify-between w-full bg-[#191919] border border-[#252525]/50 rounded-[10px] min-h-[40px] overflow-hidden cursor-pointer transition-all duration-100'>
            <Link to={card.link} target='_blank' className='flex items-center gap-[1rem] bg-gradient-to-r hover:from-[#A8DF8E]/25 active:from-[#A8DF8E]/50 p-[0.5rem] px-[0.75rem] w-full cursor-pointer'>
                <span className='text-[#FAFAFA] max-w-[700px] truncate'>{card.title}</span>
                <span className='text-[14px] text-[#FAFAFA] opacity-50 whitespace-nowrap'>{new Date(card.date_created).toDateString()}</span>
            </Link>

            <div className='flex items-center gap-[0.5rem] opacity-0 group-hover:opacity-100 transition-all duration-100 px-2'>
                <button className='cursor-pointer opacity-25 hover:opacity-100 active:opacity-25 transition-all duration-100'>
                    <Copy className="w-[25px] h-[25px]" />
                </button>
                <button className='cursor-pointer opacity-25 hover:opacity-100 active:opacity-25 transition-all duration-100'>
                    <Delete className="w-[25px] h-[25px]" />
                </button>
            </div>
        </div>

    )
}