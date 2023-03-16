<template>
    <v-app id="inspire">
        <!-- Navigation Bar -->
        <NavBar />

        <!-- Content -->
        <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>

        <!-- Dialog Modals -->
        <CreateContact
            v-if="createFormVisible && !didAutoLogout"
            :dialog="createFormVisible"
            @close="closeCreateContact"
        />
        <EditContact
            v-if="editFormVisible && !didAutoLogout"
            :dialog="editFormVisible"
            @close="closeEditContact"
            :id="editedContactId"
        />
        <ImportContacts
            v-if="importFormVisible && !didAutoLogout"
            :dialog="importFormVisible"
            @close="closeImportContacts"
        />
        <DeleteContact
            v-if="deleteFormVisible && !didAutoLogout"
            :dialog="deleteFormVisible"
            @close="closeDeleteContact"
            :id="deletedContactId"
        />

        <!-- Success/Failure Messages -->
        <ResultMessage />
    </v-app>
</template>

<script setup>
// components
import NavBar from '@/components/nav/NavBar.vue';
import CreateContact from '@/components/dialogs/CreateContact.vue';
import EditContact from '@/components/dialogs/EditContact.vue';
import ImportContacts from '@/components/dialogs/ImportContacts.vue';
import DeleteContact from '@/components/dialogs/DeleteContact.vue';
// composables
import { computed, provide, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { useCreateContact, useEditContact, useImportContacts, useDeleteContact } from '@/hooks/useModals.js';

const store = useStore();
const router = useRouter();
const { t, locale } = useI18n();

// onCreate: попытка авторизоваться, если в localStorage хранится токен и он еще не протух
store.dispatch('tryLogin');

// Модалки
const { createFormVisible, showCreateContact, closeCreateContact } = useCreateContact();
const { editFormVisible, editedContactId, showEditContact, closeEditContact } = useEditContact();
const { importFormVisible, showImportContacts, closeImportContacts } = useImportContacts();
const { deleteFormVisible, deletedContactId, showDeleteContact, closeDeleteContact } = useDeleteContact();
// прокидывем методы открытия модалок, чтобы сделать доступными из всех компонентов
provide('showCreateContact', showCreateContact);
provide('showEditContact', showEditContact);
provide('showImportContacts', showImportContacts);
provide('showDeleteContact', showDeleteContact);

// при протухании токена автоматически делать логаут
const didAutoLogout = computed(() => store.getters.didAutoLogout);
watch(didAutoLogout, (newValue, oldValue) => {
    if (newValue && newValue !== oldValue) {
        router.replace('/auth');
        store.dispatch('snackbar/showSnackbar', {
            message: t('auth.info.autoLogoutMessage'),
            type: 'success'
        });
    }
});

// при изменении языка сохранение выбора в localStorage
watch(locale, newValue => {
    localStorage.setItem('locale', newValue);
    store.dispatch('snackbar/showSnackbar', {
        message: t('i18n.message'),
        type: 'success'
    });
});

const isTouch = computed(() => useDisplay().platform.value.touch);
provide('isTouch', isTouch.value);
</script>

<style scoped>
/* Animation */
.route-enter-from {
    transform: translateY(30px);
    opacity: 0;
}
.route-enter-active {
    transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.route-leave-active {
    transition: all 0.3s ease-in;
}
.route-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}
</style>
