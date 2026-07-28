import { BASE_URL } from "../config/api";
import axios from "axios";


export const createNewLink = async (
    card_holder_id,
    group_id,
    link
) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/card/v1/new`,
            {
                card_holder_id: card_holder_id,
                group_id: group_id,
                link: link
            },
            { withCredentials: true }
        );

        return response.data;

    } catch (err) {
        throw err;
    }
};


export const updateLinkTitle = async (
    id, 
    title
) => {
    try {
        if (!title) {
            console.log('Title not changed');
            return;
        }

        const response = await axios.patch(
            `${BASE_URL}/card/v1/${id}/title`, 
            { title: title },
            { withCredentials: true }
        );

        return response.data.data;
    } catch (err) {
        throw err;
    }
}


export const getLinksPerGroup = async ( group_id ) => {
    try {
        const cards = await axios.get(
            `${BASE_URL}/card/v1/links`,
            {
                params: {
                    group_id: group_id
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
        const response = await axios.delete(
            `${BASE_URL}/card/v1/${id}`,
            { withCredentials: true }
        );

        return response.data;

    } catch (err) {
        throw err;
    }
}