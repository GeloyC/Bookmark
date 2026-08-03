import { useEffect, useState } from 'react';
import axios from 'axios';

// icons
import Close from '/src/assets/Icons/close.svg?react';
import Check from '/src/assets/Icons/check.svg?react'


export const CreateAccountModal = ({
    setCloseModal,
    setLoginModalOpen
}) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);


    const [success, setSuccess] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);

    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [loading, setLoading] = useState(false);

    const [count, setCount] = useState(3);

    const timerCount = () => {
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (count === 0) {
            setAccountCreated(false);
            setCloseModal(false);

            window.location.reload();
        }
    }, [count]);

    const handleSignUp = async () => {
        setLoading(true);

        try {
            const payload = {
                name: name,
                username: username,
                password: password
            }

            const response = await axios.post(
                `http://localhost:5000/user/v1/signup`, 
                payload, 
                { withCredentials: true }
            );

            console.log('Response result: ', response.data);

            setAccountCreated(true);
            setName('');
            setUsername('');
            setPassword('');
            
            timerCount();
            return response.data;

        } catch (err) {
            setNameError(err.response?.data.nameError);
            setUsernameError(err.response?.data.usernameError);
        } finally {
            setLoading(false);
        }
    }


    if (accountCreated) {
        return (
            <div className='relative flex flex-col items-center justify-center w-[500px] h-auto bg-[#191919] p-[2rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[1rem]'>
                <button onClick={() => setCloseModal(false)} className='absolute top-5 right-5 flex items-center justify-center cursor-pointer'>
                    <Close className="w-[20px] h-[20px]" />
                </button>

                <Check className="w-[75px] h-[75px] rounded-full border border-[#8cd56a]/50 p-4" />

                <span className='text-[22px] text-[#FAFAFA]'>Account successfully Created!</span>

                <span className='text-[#FAFAFA]'>{count}</span>
            </div>
        )
    }


    return (
        <div role='dialog' className="relative modal-in flex flex-col items-start w-[400px] h-auto bg-[#191919] p-[3rem] rounded-[15px] border border-[#FAFAFA]/15 gap-[2rem]">
            <button onClick={() => setCloseModal(false)} className="absolute top-3 right-3 cursor-pointer rounded-full hover:bg-[#252525] active:bg-[#191919] p-1">
                <Close className="w-[20px] h-[20px]" />
            </button>
            <div className="flex flex-col items-center w-full gap-[1rem]">
                <img src="/src/assets/logo/link_saver_logo.png" alt="logo" className='w-[40px] h-[40px]'/>
                <span className="text-[22px] text-[#8cd56a] text-center font-bold w-full">CREATE YOUR ACCOUNT</span>
            </div>

            <div className='flex flex-col w-full items-start gap-[0.5rem]'>
                <div className='flex flex-col w-full gap-1'>
                    <span className='text-[#FAFAFA] text-[14px] opacity-75'>Name</span>
                    <input type="text" value={name} onChange={(e)=>{
                        setName(e.target.value);
                        setNameError('');
                    }} className={`p-2 text-[#FAFAFA] border ${nameError ? "border-[#F72B2B]" : "border-[#FAFAFA]/25"} rounded-[10px] focus:outline-none focus:border-[#8cd56a]`}/>

                    <span className='text-[12px] text-center text-[#F72B2B]'>{nameError}</span>
                </div>

                <div className='flex flex-col w-full gap-1'>
                    <span className='text-[#FAFAFA] text-[14px] opacity-75'>Username</span>
                    <input type="text" value={username} onChange={(e)=>{
                        setUsername(e.target.value)
                        setUsernameError('');
                    }}
                    className={`p-2 text-[#FAFAFA] border rounded-[10px] focus:outline-none focus:border-[#8cd56a] ${usernameError ? 'border-[#F72B2B]' : 'border-[#FAFAFA]/25'}`} />

                    <span className='text-[12px] text-center text-[#F72B2B]'>{usernameError}</span>
                </div>

                <div className='flex flex-col w-full gap-1'>
                    <div className='flex items-center justify-between'>
                        <span className='text-[#FAFAFA] text-[14px] opacity-75'>Password</span>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" name="show_password" id="show_password" className='cursor-pointer size-3' onChange={()=>setShowPassword(prev=>!prev)}/>
                            <label htmlFor="show_password" className={`cursor-pointer text-[12px] text-[#FAFAFA]`}>Show</label>
                        </div>
                    </div>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} className='p-2 text-[#FAFAFA] border border-[#FAFAFA]/25 rounded-[10px] focus:outline-none focus:border-[#8cd56a]' />
                </div>
            </div>

            <div className='flex flex-col w-full gap-2 pt-3'>
                <button onClick={handleSignUp} className='flex items-center justify-center gap-2 bg-[#8cd56a] hover:bg-[#71cb47] active:bg-[#8cd56a] py-3 rounded-[10px] cursor-pointer'>
                    <span className='text-[#141414] text-[16px] font-bold'>{loading ? 'Creating...' : 'Create'}</span>
                </button>

                <div className='flex items-center justify-center w-full gap-1'>
                    <span className='text-[#FAFAFA] text-[14px]'>Already have an account?</span>
                    <button onClick={()=>{
                        setLoginModalOpen(true);
                        setCloseModal(false);
                    }} className='text-[#71cb47] text-[14px] underline hover:text-[#71cb47]/75 active:text-[#71cb47] cursor-pointer'>Login instead</button>
                </div>
            </div>
        </div>
    )
}