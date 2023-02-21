import { ref } from 'vue';

export function useCreateContact() {
    const createFormVisible = ref(false);

    function showCreateContact() {
        createFormVisible.value = true;
    }
    function closeCreateContact() {
        createFormVisible.value = false;
    }

    return {
        createFormVisible,
        showCreateContact,
        closeCreateContact
    };
}

export function useEditContact() {
    const editFormVisible = ref(false);
    const editedContactId = ref(null);

    function showEditContact(id) {
        editedContactId.value = id;
        editFormVisible.value = true;
    }
    function closeEditContact() {
        editedContactId.value = null;
        editFormVisible.value = false;
    }

    return {
        editFormVisible,
        editedContactId,
        showEditContact,
        closeEditContact
    };
}

export function useImportContacts() {
    const importFormVisible = ref(false);

    function showImportContacts() {
        importFormVisible.value = true;
    }
    function closeImportContacts() {
        importFormVisible.value = false;
    }

    return {
        importFormVisible,
        showImportContacts,
        closeImportContacts
    };
}
