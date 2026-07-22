import axios from "axios";
import { BASE_URL } from "../config/api.js";

export const getGroupsById = async (group_holder_id) => {
    try {   
        const response = await axios.get(
            `${BASE_URL}/group/v1/all/${group_holder_id}`,
            { withCredentials: true }
        );

        return response.data.data;
    } catch (err) {
        throw err;
    }
}


export const createGroup = async (group_holder_id, name) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/group/v1`, 
            { 
                group_holder_id: group_holder_id,
                name: name
            },
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        throw err;
    }
}


export const deleteGroupByID = async (id) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/group/v1/${id}`,
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
        throw err;
    }
}