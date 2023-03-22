import i18n from '@/i18n';
import axios from 'axios';

export const authUserRequest = async (email: string, password: string, mode: string) => {
    try {
        const url = `${process.env.VUE_APP_AUTH_BASE_URL}:${mode}?key=${process.env.VUE_APP_AUTH_API_KEY}`;
        const { data } = await axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        });

        return data;
    } catch (error) {
        let errorMessage = i18n.global.t('auth.info.errors.errorMessage');
        const message = error.response?.data?.error?.message;

        switch (message) {
            // login errors messages
            case 'EMAIL_NOT_FOUND':
                errorMessage += i18n.global.t('auth.info.errors.login.EMAIL_NOT_FOUND');
                break;
            case 'INVALID_PASSWORD':
                errorMessage += i18n.global.t('auth.info.errors.login.INVALID_PASSWORD');
                break;
            case 'USER_DISABLED':
                errorMessage += i18n.global.t('auth.info.errors.login.USER_DISABLED');
                break;

            // signup errors messages
            case 'EMAIL_EXISTS':
                errorMessage += i18n.global.t('auth.info.errors.signUp.EMAIL_EXISTS');
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage += i18n.global.t('auth.info.errors.signUp.TOO_MANY_ATTEMPTS_TRY_LATER');
                break;

            // default error message
            default:
                errorMessage += i18n.global.t('auth.info.errors.defaultMessage');
                break;
        }

        throw new Error(errorMessage);
    }
};
