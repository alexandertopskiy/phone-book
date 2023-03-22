import { Contact } from '@/models/contact';

export default {
    searchQuery(state): string {
        return state.searchQuery;
    },
    contacts(state): Contact[] {
        return state.contacts;
    }
};
