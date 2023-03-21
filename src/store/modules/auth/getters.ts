export default {
    userMail(state): string {
        return state.userMail;
    },
    userId(state): string {
        return state.userId;
    },
    token(state): string {
        return state.token;
    },
    isAuth(state): boolean {
        return !!state.token;
    },
    didAutoLogout(state): boolean {
        return state.didAutoLogout;
    }
};
