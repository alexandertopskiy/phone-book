const snackbarModule = {
    namespaced: true,
    state() {
        return {
            isVisible: false,
            text: null,
            type: '', // type: success || failure
            timeout: 5000,
            multiline: false
        };
    },
    getters: {
        isVisible(state) {
            return state.isVisible;
        },
        text(state) {
            return state.text;
        },
        type(state) {
            return state.type;
        },
        timeout(state) {
            return state.timeout;
        },
        multiline(state) {
            return state.multiline;
        }
    },
    mutations: {
        showSnackbar(state, payload) {
            state.text = payload.message;
            state.multiline = payload.message.length > 50;
            state.type = payload.type;
            // если type - 'ошибка', то snackbar нужно закрыть вручную (если timeout не задан явно)
            state.timeout = payload.type === 'failure' ? -1 : payload.timeout ?? 5000;
            state.isVisible = true;
        },
        hideSnackbar(state) {
            state.isVisible = false;
        }
    },
    actions: {
        showSnackbar(context, payload) {
            context.commit('showSnackbar', payload);
        },
        hideSnackbar(context) {
            context.commit('hideSnackbar');
        }
    }
};

export default snackbarModule;
