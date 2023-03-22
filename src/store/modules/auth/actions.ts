import i18n from '@/i18n';
import { authUserRequest } from '@/services/api/authRequests.js';
import { setLocalStorageUser, getLocalStorageUser, resetLocalStorageUser } from '@/services/localStorage/user.js';

let timer: number;

export default {
    async auth(context, payload) {
        const mode = payload.mode === 'login' ? 'signInWithPassword' : 'signUp';
        const responseData = await authUserRequest(payload.email, payload.password, mode);

        // установка таймера для автологаута
        const expiresIn = +responseData.expiresIn * 1000; // time in ms: 3600s * 1000
        timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

        // сохранение в localStorage
        setLocalStorageUser(payload.email, responseData.localId, responseData.idToken, expiresIn);

        context.commit('setUser', {
            userMail: payload.email,
            userId: responseData.localId,
            token: responseData.idToken
        });

        return payload.mode === 'login'
            ? i18n.global.t('auth.info.success.login')
            : i18n.global.t('auth.info.success.signUp');
    },
    async login(context, payload) {
        return context.dispatch('auth', { ...payload, mode: 'login' });
    },
    async signUp(context, payload) {
        return context.dispatch('auth', { ...payload, mode: 'signUp' });
    },
    // auto login (if token/userId exist)
    tryLogin(context) {
        const { email, userId, token, tokenExpiration } = getLocalStorageUser();

        // установка таймера для автологаута
        const curDate = new Date().getTime();
        const expiresIn = +tokenExpiration - curDate;
        // если токен протухнет через 30 секунд, то нет смысла авторизовываться
        if (expiresIn <= 30000) return;
        timer = setTimeout(() => context.dispatch('autoLogout'), expiresIn);

        if (token && userId) context.commit('setUser', { userMail: email, userId, token });
    },
    logout(context) {
        resetLocalStorageUser();
        clearTimeout(timer);
        context.commit('setUser', { userMail: null, userId: null, token: null });
        return i18n.global.t('auth.info.logoutMessage');
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setDidAutoLogout');
    }
};
