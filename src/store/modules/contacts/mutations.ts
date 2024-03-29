export default {
    setSearchQuery(state, payload) {
        state.searchQuery = payload;
    },
    setContacts(state, payload) {
        state.contacts = payload;
    },
    registerContact(state, payload) {
        state.contacts.push(payload);
    },
    removeContact(state, index: number) {
        state.contacts.splice(index, 1);
    },
    removeAllContacts(state) {
        state.contacts = [];
    },
    updateContact(state, payload) {
        state.contacts[payload.index] = payload.data;
    }
};
