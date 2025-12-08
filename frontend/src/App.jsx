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
  const [categoryName, setCategoryName] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');

  const [error, setError] = useState('');
  const [inompleteError, setIncompleteError] = useState('');

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');
  const [newLinkDesc, setNewLinkDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [emptyMessage, setEmptyMessage] = useState('');

  // Closes and opens adding link section
  const handleAddNewLink = () => {
    setAddLink((link) => !link)
  };

  // Closes and opens category creation section
  const handleCreateCategory = () => {
    setCreateCategory((cat) => !cat)

    // reset the input when canceling the process
    setCategoryName('');
    setError('');
    setSucessMessage('');
  };


  /// States for category


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

      fetchCategory();
      setSucessMessage(response.data.message);
      setCategoryName('');

    } catch(err) {
      console.error('Error creating new category: ', err);
    }
  }


  // fetches category right after creating new category
  const fetchCategory = async () => {
      const response = await axios.get(`${base_url}/category/${user_id?.id}`);
      setCategories(response.data);

      // console.log('Category: ', response.data)
  }
      


  const AddNewLink = async (e) => {
    e.preventDefault();
// 
    if (newLink == '' || newLinkDesc == '' || !categories) {
      setIncompleteError('Please complete all the required fields to add new link.');
      console.log('Fields missing!');

      return;
    } 


    try {
      const response = await axios.post(`${base_url}/card`, {
        card_holder_id: user_id?.id,
        category: selectedCategory,
        link: newLink,
        description: newLinkDesc
      })
      
      if (response.data.error != null) {
        setError(response.data.error);
      } 

      fetchLinks();

      setNewLink('');
      setNewLinkDesc('');
      // setCategories([3]);

      handleAddNewLink()

    } catch(err) {
      console.error('Error adding new link: ', err);
    }
  }



  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${base_url}/card/${user_id?.id}/list`);
      if (response.data.success) {
        setLinks(response.data.data); 
        setError(""); 
      } else {
        setLinks([]);
        setError(response.data.message || "No links available.");
      }


      // console.log(response.data.data)
    } catch(err) {
      console.error('Client: Error fetching links: ', err);
      setError("Failed to fetch links from server.");
      setLinks([]);
    } 
  }


  useEffect(() => {
    fetchCategory()
  }, []);



  const linkFilter = links.filter((link) => {
    const isTitleMatch = link.title?.toLowerCase().includes(searchFilter.toLowerCase());
    const isCategoryMatch = categoryFilter === "all" || link.category === categoryFilter;

    return isTitleMatch && isCategoryMatch;
  });


  useEffect(() => {
    if (linkFilter.length === 0) {
      if (categoryFilter !== "all" && !searchFilter) {
        setEmptyMessage(`No results found for category: ${categoryFilter}`);
      } else if (searchFilter) {
        setEmptyMessage(`No results found for: "${searchFilter}".`);
      } else {
        setEmptyMessage("No results found.");
      }
    } else {
      setEmptyMessage("");
    }
  }, [linkFilter, categoryFilter, searchFilter]);




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
              {/* <Category categories={categories}/> */}
              <div>
                  {categories.length > 0 && (
                      <select name="link_category" id="link_category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                      className='text-[#141414] bg-[#FFF] w-[300px] px-3 py-1 rounded-[5px] cursor-pointer'>
                          {/* Add selection of category here */}
                          <option value='all'>All categories</option>
                          {/* <option value="category_1">Category 1</option>
                          <option value="category_2">Category 2</option> */}
              
                          {categories.map((cat) => (
                              <option key={cat.id} value={cat.category_name}>{cat.category_name}</option> 
                          ))}
                      </select>
                  )}
              </div>


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
                value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}
                className='border border-[#FFF] w-full p-1 px-2 rounded-[10px] text-[14px]'/>
            </div>
          </div>

          {/* Appears when creating a new category */}
          {createCategory && (
            <form onSubmit={createNewCategory} className='flex flex-col w-full bg-[#3A3A3A] p-4 border border-[#FFF] rounded-[15px]'>
              <label className='flex justify-center text-[18px] font-bold'>CREATE NEW CATEGORY</label>
              <div className='flex items-center gap-2'>
                <label className='font-bold'>Category</label>
                <input type="text" placeholder="Enter new category" value={categoryName} onChange={(e) => {setCategoryName(e.target.value); setError('')}} required
                className='py-2 px-4 rounded-[10px] bg-[#141414] w-full'/>

                <div className='flex items-center gap-1'>
                  {categoryName && (
                    <button className='px-4 py-2 bg-[#FFF] rounded-[10px] text-[#141414] cursor-pointer hover:bg-[#656565] active:bg-[#FFF]'>Save</button>
                  )}
                  <button onClick={handleCreateCategory} className='px-4 py-2 border border-[#FFF] rounded-[10px] text-[#FFF] cursor-pointer hover:bg-[#2A2A2A] active:bg-[#3A3A3A]'>Cancel</button>
                </div>
              </div>

              {sucessMessage && (
                <label className='flex w-full items-center justify-center p-3 text-[#FFF600]'>{sucessMessage}</label>
              )}

              {error && (
                <label className='flex w-full items-center justify-center p-3 text-[#FF0000]'>{error}</label>
              )}
            </form>
          )}

          {/* Appears when adding new link */}
          {addLink && (
            <div className='flex flex-col items-center w-full p-4 border border-[#656565] bg-[#3A3A3A] rounded-[15px]'>
              <form onSubmit={AddNewLink} className='flex flex-col items-center gap-2 w-full'>
                <span className='text-[18px] font-bold'>ADD NEW LINK</span>

                <div className='flex w-full justify-between items-center gap-2'>
                  <div className='flex-2 flex-col items-start w-full'>
                    <label className='flex gap-2 items-center'>
                      <span>Link</span>
                    </label>
                    <input type="text" placeholder='Add link here' 
                      value={newLink} onChange={(e) => {setNewLink(e.target.value); setError('')}}
                      className='flex p-2 px-4 bg-[#141414] text-[#FFF] rounded-[10px] w-full'/>
                  </div>

                  <div className='flex-1 flex-col items-start w-full'>
                    <label htmlFor="">Category</label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} 
                    className={`flex p-2 px-4 bg-[#141414] text-[#FFF] rounded-[10px] w-full`}>
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

                {error || inompleteError && (
                  <label className={`flex justify-center p-1 w-full text-[#FF0000]`}>{error || inompleteError}</label>
                )}

                  <div className='flex gap-1 w-full justify-end'>
                    {newLink === '' || newLinkDesc === '' || (
                      <button className='px-4 py-2 bg-[#FFF] text-[#141414] rounded-[10px] active:bg-[#3A3A3A] cursor-pointer'>Save</button>
                    )}
                    <button type='button' onClick={handleAddNewLink} className='px-4 py-2 border border-[#FFF] rounded-[10px] active:bg-[#2A2A2A] cursor-pointer'>Cancel</button>
                  </div>
              </form>
            </div>
          )}

          {/* CARD LINK CONTAINER */}
          <div className='flex w-full justify-start items-center'>
            { emptyMessage ? (
              <label className='flex w-full justify-center items-center p-4'>{emptyMessage}</label>
            ) : (
              <Card 
                links={linkFilter}
                fetchLink={fetchLinks}
                fetchCategory={fetchCategory}
              />
            )}
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
