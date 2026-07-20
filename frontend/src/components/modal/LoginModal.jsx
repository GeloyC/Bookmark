import { useState } from 'react';
import axios from 'axios'

// icons
import Close from '/src/assets/Icons/close.svg?react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginModal = ({
    setCloseModal
}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/user/v1/login`, {
                    username: username,
                    password: password
                }, 
                { withCredentials: true }
            );

            console.log(response.data);
            window.location.reload();
            
            return response.data;
        } catch (err) {
            console.log('Failed to login');
        }
    }

    return (
        <div className="flex flex-col items-start w-[400px] h-auto bg-[#191919] p-[2rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[2rem]" >
            <div className="flex items-center justify-between w-full">
                <span className="text-[20px] text-[#8cd56a] font-bold">LOG IN</span>
                <button onClick={() => setCloseModal(false)} className="flex items-center justify-center cursor-pointer rounded-full hover:bg-[#252525] active:bg-[#191919] p-1">
                    <Close className="w-[20px] h-[20px]" />
                </button>
            </div>

            <div className='flex flex-col gap-[1rem] w-full'>
                <div className='flex flex-col w-full item-start gap-1'>
                    <span className='text-[#FAFAFA] text-[14px]'>Username</span>
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className='p-[0.5rem] text-[#FAFAFA] rounded-[10px] bg-[#252525 ] focus:outline-none border border-[#FAFAFA]/25 focus:border-[#8cd56a]' />
                </div>

                <div className='flex flex-col w-full item-start gap-1'>
                    <span className='text-[#FAFAFA] text-[14px]'>Password</span>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='p-[0.5rem] text-[#FAFAFA] rounded-[10px] bg-[#252525 ] focus:outline-none border border-[#FAFAFA]/25 focus:border-[#8cd56a]' />
                </div>
            </div>

            <div className='flex flex-col w-full gap-2'>
                <button onClick={loginUser} className='flex items-center justify-center gap-2 bg-[#8cd56a] hover:bg-[#71cb47] active:bg-[#8cd56a] py-3 rounded-[10px] cursor-pointer'>
                    <span className='text-[#141414] text-[16px] font-bold'>Continue</span>
                </button>

                <button onClick={() => setCloseModal(false)} className='flex items-center justify-center gap-2 bg-[#252525] hover:bg-[#252525]/50 active:bg-[#252525] py-3 rounded-[10px] cursor-pointer'>
                    <span className='text-[#FAFAFA]'>Cancel</span>
                </button>
            </div>
        </div>
    )
}