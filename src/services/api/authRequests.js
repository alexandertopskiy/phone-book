import axios from 'axios';

export const authUserRequest = async (email, password, mode) => {
    const url = `${process.env.VUE_APP_AUTH_BASE_URL}:${mode}?key=${process.env.VUE_APP_AUTH_API_KEY}`;
    const { data } = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });

    return data;
};
