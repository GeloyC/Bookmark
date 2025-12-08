import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Card = ({links, fetchLink, fetchCategory}) => {

  const base_url = `http://localhost:5000`;
  const user_id = JSON.parse(localStorage.getItem('user'));

  const [isOpenLink, setIsOpenLink] = useState(null);
  const [linkDesc, setLinkDesc] = useState('');
  


  const deleteLink = async (card_id) => {
    try {
      const response = await axios.delete(`${base_url}/card/${card_id}`);

      console.log('Link deleted successfully!: ', response );
      fetchLink();
    } catch (err) {

    }
  }

  useEffect(() => {
    fetchCategory();
    fetchLink();
  }, []);


  

  const openLink = (card_id) => {
    setIsOpenLink(expandedLink => (expandedLink === card_id ? null : card_id));
  }


  return (
      <div className={`flex flex-col justify-between gap-1 w-full`}>
        {/* 
          Content of Card
          > Title 
          > Description (why I added the link)
          > Date created
          > Dropdown to show the: description
        */}
        {links ? (
          links.map((link, index) => (
            <div key={link.card_id} className={`py-2 px-4 ${isOpenLink === link.card_id ? 'pb-4 bg-[#464646]' : 'bg-[#2A2A2A]'} rounded-[10px] hover:bg-[#464646]`}>
              <div key={link.card_id} className='flex flex-row w-full justify-between'>
                <div className='flex flex-row gap-4 items-center'>
                  <a href={link.link} target="_blank" className='hover:underline'>{link.title}</a>
                  <span className='italic text-[#656565]'>{link.date_created}</span>
                </div>
                
                <div className='flex flex-row items-center gap-2 justify-center'>
                  {/* {isOpenLink === index &&   (
                    <select className='bg-[#141414] px-4 py-1 rounded-[10px]'
                      value={link.category} onChange={(e) => setSelectedCategory(e.target.value)}>
                      <option hidden>Change Category</option>
  
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                      ))}
                    </select>
                  )} */}

                  <label className='text-[14px] text-[#656565]'>{link.category}</label>
                  <button onClick={() => openLink(link.card_id)} className='hover:bg-[#656565] active:bg-[#2A2A2A] size-8 rounded-full cursor-pointer'>
                    {isOpenLink === link.card_id ? 'V' : '>'}
                  </button>
                </div>
              </div>
  
              {isOpenLink === link.card_id && (
                <div className='flex flex-col gap-1 w-full'>
                  <label htmlFor="link_description" className='text-[#656565] text-[14px]'>Description</label>
                  <textarea rows={2} value={link.description} onChange={(e) => setLinkDesc(e.target.value)} id="link_description"
                    className='text-[14px] text-[#b5b7b1]'></textarea>
  
                  <div className='flex w-full justify-end'>
                    <button onClick={() => deleteLink(link.card_id)} className='hover:bg-[#656565] active:bg-[#2A2A2A] px-4 py-1 rounded-full cursor-pointer'>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div key={''} className="flex items-center justify-center w-full p-4">
            <span>There are no links yet!</span>
          </div>
        )}
      </div>
  )
}

export default Card