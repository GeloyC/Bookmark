
import { useState } from "react"
import { useNavigate } from "react-router-dom";

// icon
import Folder from '/src/assets/Icons/folder.svg?react'
import ThreeDots from '/src/assets/Icons/three-dots.svg?react';

export const GroupItem = ({
    group,
    isSelected,
    groupDropdown,
    setGroupDropdown,
    openModal
}) => {


    const handleShowDropdown = (id) => {
        setGroupDropdown(open => open === id ? null : id)
    }

    const navigate = useNavigate();


    return (
        <div className={`relative group flex items-center rounded-[5px] cursor-pointer ${isSelected && 'bg-[#252525]'} ${groupDropdown !== group.id && 'hover:bg-[#252525]/75'}`}>
            <label onClick={()=>{
                setGroupDropdown(null);
            }} htmlFor={`groupId_'${group.id}`} className="flex items-center w-full cursor-pointer active:bg-[#252525]/75 p-2 px-3">
                <input 
                    type="radio" 
                    name="group" 
                    id={`groupId_'${group.id}`} 
                    value={group.id} 
                    onChange={()=>{
                        navigate(`/${group.id}`);
                    }}
                    hidden
                />
                <Folder className="size-4 opacity-75"/>
                <span className="text-[#FAFAFA] text-[14px] opacity-75 px-2 max-w-[150px] truncate">{group.name}</span>
            </label>

            <button onClick={()=>handleShowDropdown(group.id)} className="group-hover:flex hidden cursor-pointer opacity-50 hover:opacity-100 active:opacity-50 px-1 transition-all duration-100">
                <ThreeDots className={`size-4 ${groupDropdown === group.id && 'rotate-90'} transition-all duration-100`} />
            </button>

            {groupDropdown === group.id && (
                <>
                    <div className="fixed inset-0" onClick={() => setGroupDropdown(null)} />
                    
                    <div className="absolute fade-in top-8 right-0 flex flex-col bg-[#191919] border border-[#FAFAFA]/15 p-1 rounded-[5px] z-10">
                        <button onClick={()=>{
                            openModal('rename-group',group);
                            setGroupDropdown(null);
                        }} className="flex px-2 py-1 hover:bg-[#252525] cursor-pointer active:bg-[#252525]/75">
                            <span className="text-[#FAFAFA] text-[14px] px-2">Rename</span>
                        </button>

                        <button onClick={()=>{
                            openModal('delete-group',group);
                            setGroupDropdown(null);
                        }} className="flex px-2 py-1 hover:bg-[#F72B2B]/25 cursor-pointer active:bg-[#F72B2B]/75">
                            <span className="text-[#FAFAFA] text-[14px] px-2">Delete</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}