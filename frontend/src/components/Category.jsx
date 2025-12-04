import React, { useState, useEffect } from 'react';
import axios from 'axios';

const category = () => {

    const base_url = `http://localhost:5000`;
    const user_id = JSON.parse(localStorage.getItem('user'));

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get(`${base_url}/category/${user_id?.id}`);
            setCategories(response.data);

            console.log(response.data)
        }

        fetchCategory();
    }, []);

    return (
        <div>
            {categories.length > 0 && (
                <select name="" id="link_category" className='text-[#141414] bg-[#FFF] w-[300px] px-3 py-1 rounded-[5px] cursor-pointer'>
                    {/* Add selection of category here */}
                    <option hidden>Select category</option>
                    {/* <option value="category_1">Category 1</option>
                    <option value="category_2">Category 2</option> */}
        
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.category_name}>{cat.category_name}</option> 
                    ))}
                </select>
            )}
        </div>
    )
}

export default category