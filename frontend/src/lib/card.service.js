import { BASE_URL } from "../config/api";
import axios from "axios";


export const createNewLink = async (
    card_holder_id,
    group_name,
    link
) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/card/v1/new`,
            {
                card_holder_id: card_holder_id,
                group_name: group_name,
                link: link
            },
            { withCredentials: true }
        );

        console.log(response.data);
        return response.data;

    } catch (err) {
        throw err;
    }
};


export const updateLinkById = async (
    id, 
    title
) => {
    console.log('Title: ', title);

    try {
        const response = await axios.put(
            `${BASE_URL}/card/v1/${id}/updatedLink`, 
            { title: title },
            { withCredentials: true }
        );

        return response.data.data;
    } catch (err) {
        throw err;
    }
}


export const getLinksPerGroup = async ( group_name ) => {
    try {
        const cards = await axios.get(
            `${BASE_URL}/card/v1/links`,
            {
                params: {
                    groups: group_name
                },
                withCredentials: true
            }
        );

        return cards.data.data;

    } catch (err) {
        throw err;
    }
};


export const deleteSelectedCard = async ( id ) => {
    try {
        console.log('Received id from frontend: ', id);

        const response = await axios.delete(
            `${BASE_URL}/card/v1/${id}`,
            { withCredentials: true }
        );

        return response.data;

    } catch (err) {
        throw err;
    }
}