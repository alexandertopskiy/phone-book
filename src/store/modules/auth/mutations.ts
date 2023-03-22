export default {
    setUser(state, payload) {
        state.userMail = payload.userMail;
        state.userId = payload.userId;
        state.token = payload.token;
        state.didAutoLogout = false;
    },
    setDidAutoLogout(state) {
        state.didAutoLogout = true;
    }
};
