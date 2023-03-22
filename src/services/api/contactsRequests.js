import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL + '/contacts';

export const loadContactsRequest = async (userId, token) => {
    const url = `${baseURL}/${userId}.json?auth=${token}`;
    const { data } = await axios.get(url);

    return data;
};

export const registerContactRequest = async (userId, token, contactData) => {
    const url = `${baseURL}/${userId}.json?auth=${token}`;
    const { data } = await axios.post(url, contactData);

    return data;
};

export const removeContactRequest = async (userId, token, contactId) => {
    const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
    await axios.delete(url);

    return;
};

export const removeAllContactsRequest = async (userId, token) => {
    const url = `${baseURL}/${userId}.json?auth=${token}`;
    await axios.delete(url);

    return;
};

export const updateContactRequest = async (userId, token, contactId, newData) => {
    const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
    await axios.put(url, newData);

    return;
};
