import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// icons
import Delete from '/src/assets/Icons/delete.svg?react';
import Copy from '/src/assets/Icons/copy.svg?react';
import Check from '/src/assets/Icons/check.svg?react'
import Edit from '/src/assets/Icons/edit.svg?react'
import LinkIcon from '/src/assets/Icons/link.svg?react'

// service
import { deleteSelectedCard } from '../../../lib/card.service.js';

export const Card = ({ 
    card,
    openModal
}) => {


    const [isCopied, setIsCopied] = useState(null);

    const handleCopyLink = async (id, link) => {
        await navigator.clipboard.writeText(link);
        setIsCopied(id);

        console.log('Copied link: ', link);
        setTimeout(() => setIsCopied(null), 2000);
    }



    

    return (
        <div key={card.date_created} className='group flex items-center justify-between w-full bg-[#252525]/50 min-h-[40px] rounded-[5px] overflow-hidden cursor-pointer transition-all duration-100'>
            <Link to={card.link} target='_blank' title={card.link} className='grid grid-cols-[10%_90%] items-center hover:bg-[#252525]/50 active:bg-transparent px-[0.75rem] w-full h-full cursor-pointer transition-all duration-100'>
                <span className='text-[14px] text-[#FAFAFA] opacity-25 whitespace-nowrap'>{new Date(card.date_created).toDateString()}</span>
                
                <div className='flex items-center justify-start gap-[1rem] w-auto h-full'>
                    <LinkIcon className="size-5 opacity-75" />
                    <span className='group-hover:text-[#71cb47] text-[14px] text-[#FAFAFA] max-w-[600px] truncate'>{card.title}</span>

                    <span className='text-[#FAFAFA] text-[14px] opacity-25 max-w-[350px] truncate '>{card.link}</span>
                </div>
            </Link>

            <div className='flex items-center gap-[0.5rem] opacity-0 group-hover:opacity-100 transition-all duration-100 px-2 border-l border-l-[#71cb47]'>
                <button title='Edit' 
                onClick={()=>openModal('edit-link', card)} 
                className='cursor-pointer opacity-25 hover:opacity-100 active:opacity-25 transition-all duration-100'>
                    <Edit className="size-5" />
                </button>

                {isCopied === card.id ? (
                    <button className='opacity-50 transition-all duration-100'>
                        <Check className="size-5" />
                    </button>
                ) : (
                    <button title='Copy' onClick={() => handleCopyLink(card.id, card.link)} className='cursor-pointer opacity-25 hover:opacity-100 active:opacity-25 transition-all duration-100'>
                        <Copy className="size-5" />
                    </button>
                )}

                <button title='Delete' onClick={() => openModal('delete-link', card)} className='cursor-pointer opacity-25 hover:opacity-100 active:opacity-25 transition-all duration-100'>
                    <Delete className="size-5" />
                </button>
            </div>
        </div>

    )
}