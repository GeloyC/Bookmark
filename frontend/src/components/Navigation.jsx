import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

// import '../styling/Navigation.css'

const Navigation = () => {
  const base_url = `http://localhost:5000`;

  const [user, setUser] = useState([]);
  const [showExit, setShowExit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUser = async () => {
        const user_id = JSON.parse(localStorage.getItem('user'));
        console.log('id: ', user_id?.id)

        try {
            const response = await axios.get(`${base_url}/user/${user_id?.id}`)
            setUser(response.data.username)

            console.log('Current user: ', response.data.username)
        } catch (err) {
            console.error('Failed to fetch user: ', err)
        }       
    };

    fetchUser();
  }, []);


  const displayExitButton = () => {
    setShowExit(prev => !prev);
  }

  const ExitUser = () => {
    localStorage.removeItem('user');
    window.location.reload();
    navigate('/');
  }

  return (
    <div className='flex flex-row justify-between items-center px-[20px] border-box border-b-[#656565] border-b'>
        <Link to="/" className=''>
            {/* LOGO HERE */}
            BOOKMARK BY ANGELO
        </Link>
        <div className='flex flex-row items-center'>
            <div className='flex items-center border-r border-r-[#3A3A3A]'>
              <Link to="/" className='flex items-center hover:bg-[#2A2A2A] h-full w-full p-4'>Home</Link>
              <Link to="/help" className='flex items-center hover:bg-[#2A2A2A] h-full p-4'>Help</Link>
            </div>

            {!user ? (
              <div className='flex items-center'>
                <Link to="/login" className='flex items-center font-bold h-full w-full hover:bg-[#2A2A2A] p-4'>Login</Link>
                <Link className='flex items-center bg-[#FFF] text-[#141414] font-bold h-full w-full hover:bg-[#656565] p-4'>Join</Link>
              </div>

            ) : (
              <div className='relative flex items-center'>
                <div className='flex items-center'>
                  <label className='flex items-center w-full p-4'>{user}</label>
                  <button onClick={displayExitButton} className='flex items-center justify-center size-8 p-4 cursor-pointer hover:bg-[#2A2A2A] active:bg-[#141414] rounded-full'>
                    {!showExit ? '>' : 'v'}
                  </button>
                </div>

                {showExit && (
                  <button onClick={ExitUser} className='absolute top-14 flex items-center justify-start p-4 w-full text-[14px] bg-[#2A2A2A] cursor-pointer whitespace-nowrap hover:bg-[#656565] active:bg-[#141414] border border-[#FFF] z-10'>
                    Exit
                  </button>
                )}
              </div>
            )}

        </div>

    </div>
  )
}

export default Navigation