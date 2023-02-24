const authModule = {
    state() {
        return {
            userId: null,
            token: null
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
        isAuth(state) {
            return !!state.token;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.userId;
            state.token = payload.token;
        }
    },
    actions: {
        async auth(context, payload) {
            const apiKey = 'AIzaSyCJE9ddX-ky6IFAFgHOKDdYxMnbadjb9CI';
            const mode = payload.mode === 'login' ? 'signInWithPassword' : 'signUp';
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });
            const responseData = await response.json();

            if (!response.ok) {
                let errorMessage = 'Failed to Authenticate! ';
                switch (responseData.error?.message) {
                    // login errors messages
                    case 'EMAIL_NOT_FOUND':
                        errorMessage += 'User record with this email not found. Maybe you have been deleted.';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage += 'You entered incorrect password! Please, try again.';
                        break;
                    case 'USER_DISABLED':
                        errorMessage += 'The user account has been disabled by an administrator.';
                        break;

                    // signup errors messages
                    case 'EMAIL_EXISTS':
                        errorMessage += 'This email has been used already. Please, try another one';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage +=
                            'We have blocked all requests from this device due to unusual activity. Try again later.';
                        break;

                    // default error message
                    default:
                        errorMessage += 'Please, try again later.';
                        break;
                }

                throw new Error(responseData.message || errorMessage);
            }

            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('token', responseData.idToken);

            context.commit('setUser', {
                userId: responseData.localId,
                token: responseData.idToken
            });

            return (payload.mode === 'login' ? 'Авторизация' : 'Регистрация') + ' прошла успешно';
        },
        async login(context, payload) {
            return context.dispatch('auth', { ...payload, mode: 'login' });
        },
        async signUp(context, payload) {
            return context.dispatch('auth', { ...payload, mode: 'signUp' });
        },
        // auto login (if token/userId exist)
        tryLogin(context) {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (token && userId) {
                context.commit('setUser', {
                    userId: userId,
                    token: token
                });
            }
        },
    }
};

export default authModule;
