import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const base_url = `http://localhost:5000`;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${base_url}/user/login`, { username, password });

            console.log('Successful loging for: ', response.data);

            let user = JSON.stringify(response.data);
            localStorage.setItem("user", user);

            navigate("/");

        } catch(err) {
            console.error('Failed to login: ', err);
        }
    }


    return (
        <div className='flex flex-col items-center justify-center w-full h-full p-[1rem] rounded-[15px]'>
            
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-4 p-4 w-[500px]'>
                    <label className='font-bold text-[24px] leading-tight'>LOGIN</label>

                    <div className='flex flex-col items-start w-full'>
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Username'
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            className='py-2 px-3 w-full border border-[#FFF]'/>
                    </div>

                    
                    <div className='flex flex-col items-start w-full'>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Password'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className='py-2 px-3 w-full border border-[#FFF]'/>
                    </div>

                    <div className='flex flex-col items-center gap-2'>
                        <button className='flex px-6 py-1 bg-[#FFF] text-[#141414] hover:bg-[#656565] cursor-pointer'>Login</button>
                        {/* <a href="" className='text-[14px] hover:underline'>Sign In instead?</a> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login