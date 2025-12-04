import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Card from './components/Card'
import Category from './components/Category'

import axios from 'axios'

// This is the HOME page
function App() {
  const base_url = `http://localhost:5000`;
  const user_id = JSON.parse(localStorage.getItem('user'));


  const [addLink, setAddLink] = useState(false);
  const [createCategory, setCreateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchCategory = async () => {
          const response = await axios.get(`${base_url}/category/${user_id?.id}`);
          setCategories(response.data);

          console.log(response.data)
      }

      fetchCategory();
  }, []);

  // Closes and opens adding link section
  const handleAddNewLink = () => {
    setAddLink((link) => !link)
  };

  // Closes and opens category creation section
  const handleCreateCategory = () => {
    setCreateCategory((cat) => !cat)
  };


  /// States for category
  const [categoryName, setCategoryName] = useState('');



  const createNewCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/category`, { 
        user_id: user_id?.id,
        category_name: categoryName,
      });
        
      if (response.data.Error != null) {
        setError(response.data.Error);
      }
      
      console.log('New created category: ', response.data);
      console.log('Input category: ', categoryName);

    } catch(err) {
      console.error('Error creating new category: ', err);
    }
  }


  const [newLink, setNewLink] = useState('');
  const [newLinkDesc, setNewLinkDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const AddNewLink = async (e) => {
    e.preventDefault();
// 
    try {
      const response = await axios.post(`${base_url}/card`, {
        card_holder_id: user_id?.id,
        category: selectedCategory,
        link: newLink,
        description: newLinkDesc
      })

      if (response.data.error != null) {
        setError(response.data.error);
      } else {
        window.location.reload();
      }

      console.log('Data: ', response.data)

    } catch(err) {
      console.error('Error adding new link: ', err);
    }
  }



  return (
    <div className='border-box'>
      <Navigation />
      {/* 
      TODO: 
        1. HOMEPAGE DESIGN
        2. GUIDES FOR USER
        3. CALL TO ACTIONS
      */}

      <div className=' relative flex flex-col justify-center items-center'>

        {/* 
          1. Add a button to add link 
          2. Choose what kind of link 
          3. Description of link
        */}

        <div className='flex flex-col w-full p-5 gap-5'>
          <div className='flex flex-row justify-between gap-2'>
            <div className='flex flex-row gap-2 items-center w-full'>


              {/* Category selection */}
              <Category />


              {!createCategory && (
                <button onClick={handleCreateCategory} className='border border-[#FFF] px-4 py-1 rounded-[5px] hover:bg-[#2A2A2A] active:bg-[#141414] cursor-pointer'>
                  Create New Category
                </button>
              )}

              {!addLink && (
                <button onClick={handleAddNewLink} className='border border-[#FFF] px-4 py-1 rounded-[5px] hover:bg-[#2A2A2A] active:bg-[#141414] cursor-pointer'>
                  Add Link
                </button>
              )}
            </div>

            {/* Search */}
            <div className='flex w-full'> 
              <input type="search" name="" id="" placeholder='Search for link title'
                className='border border-[#FFF] w-full p-1 px-2 rounded-[10px] text-[14px]'/>
            </div>
          </div>

          {/* Appears when creating a new category */}
          {createCategory && (
            <form onSubmit={createNewCategory} className='flex flex-col w-full bg-[#3A3A3A] p-4 border border-[#FFF] rounded-[15px]'>
              <label className='flex justify-center text-[18px] font-bold'>CREATE NEW CATEGORY</label>
              <div className='flex items-center gap-2'>
                <label className='font-bold'>Category</label>
                <input type="text" placeholder="Enter new category" value={categoryName} onChange={(e) => {setCategoryName(e.target.value); setError('')}}
                className='py-2 px-4 rounded-[10px] bg-[#141414] w-full'/>

                <div className='flex items-center gap-1'>
                  <button className='px-4 py-2 bg-[#FFF] rounded-[10px] text-[#141414] cursor-pointer hover:bg-[#656565] active:bg-[#FFF]'>Save</button>
                  <button onClick={handleCreateCategory} className='px-4 py-2 border border-[#FFF] rounded-[10px] text-[#FFF] cursor-pointer hover:bg-[#2A2A2A] active:bg-[#3A3A3A]'>Cancel</button>
                </div>
              </div>

              <label className={`flex justify-center p-4 w-full text-[#FF0000]`}>{error}</label>
            </form>
          )}

          {/* Appears when adding new link */}
          {addLink && (
            <div className='flex flex-col items-center w-full p-4 border border-[#FFF] bg-[#3A3A3A] rounded-[15px]'>
              <form onSubmit={AddNewLink} className='flex flex-col items-center gap-2 w-full'>
                <span className='text-[18px] font-bold'>ADD NEW LINK</span>

                <div className='flex w-full justify-between items-center gap-2'>
                  <div className='flex-2 flex-col items-start w-full'>
                    <label className='flex gap-2 items-center'>
                      <span>Link</span>
                      <span className='text-[14px] text-[#FF0000]'>{error}</span>
                    </label>
                    <input type="text" placeholder='Add link here'
                      value={newLink} onChange={(e) => {setNewLink(e.target.value); setError('')}}
                      className='flex p-2 px-4 bg-[#141414] text-[#FFF] rounded-[10px] w-full'/>
                  </div>

                  <div className='flex-1 flex-col items-start w-full'>
                    <label htmlFor="">Category</label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)}
                    className='flex p-2 px-4 bg-[#141414] text-[#FFF] rounded-[10px] w-full'>
                      <option hidden>Choose category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='flex flex-col items-start w-full'>
                  <label htmlFor="">Description</label>
                  <textarea rows={3} value={newLinkDesc} onChange={(e) => setNewLinkDesc(e.target.value)}
                    placeholder='Describe why you added this link'
                    className='flex p-2 px-4 bg-[#141414] text-[#FFF] rounded-[10px] w-full'></textarea>
                </div>

                <div className='flex gap-1 w-full justify-end'>
                  <button className='px-4 py-2 bg-[#FFF] text-[#141414] rounded-[10px] active:bg-[#3A3A3A] cursor-pointer'>Save</button>
                  <button type='button' onClick={handleAddNewLink} className='px-4 py-2 border border-[#FFF] rounded-[10px] active:bg-[#2A2A2A] cursor-pointer'>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* CARD LINK CONTAINER */}
          <div>
            <Card category={categories}/>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
