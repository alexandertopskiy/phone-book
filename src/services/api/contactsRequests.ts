import axios from 'axios';
import { Contact } from '@/models/contact';

const baseURL = process.env.VUE_APP_BASE_URL + '/contacts';

export const loadContactsRequest = async (userId: string, token: string) => {
    const url = `${baseURL}/${userId}.json?auth=${token}`;
    const { data } = await axios.get(url);

    return data;
};

export const registerContactRequest = async (userId: string, token: string, contactData: Contact) => {
    const url = `${baseURL}/${userId}.json?auth=${token}`;
    const { data } = await axios.post(url, contactData);

    return data;
};

export const removeContactRequest = async (userId: string, token: string, contactId: string) => {
    const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
    await axios.delete(url);

    return;
};

export const removeAllContactsRequest = async (userId: string, token: string) => {
    const url = `${baseURL}/${userId}.json?auth=${token}`;
    await axios.delete(url);

    return;
};

export const updateContactRequest = async (userId: string, token: string, contactId: string, newData) => {
    const url = `${baseURL}/${userId}/${contactId}.json?auth=${token}`;
    await axios.put(url, newData);

    return;
};
