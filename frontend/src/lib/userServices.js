import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('Url: ', BASE_URL);


export const getUser = async () => {
    try {
        const user = await axios.get(
            `${BASE_URL}/user/v1/profile`, {
                withCredentials: true
            }
        );

        return user.data;
    } catch (err) {

    }
}




export const logOutUser = async () => {
    try {
        const response = await axios.post(
            `${BASE_URL}/user/v1/logout`, {},
            { withCredentials: true }
        );
        
        window.location.reload();
        return response.data;
    } catch (err) {
        console.log('Failed to logout');
    }
}