<template>
    <v-app-bar color="teal-lighten-1" v-if="isAuth">
        <v-app-bar-nav-icon @click="toggleDrawerVisibility" class="icon"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-sm-and-down">PhoneBook</v-toolbar-title>
        <h3 class="ms-4 text-subtitle-1">{{ $t('navBar.greeting') + userName }}!</h3>
        <v-spacer></v-spacer>

        <!-- Logout Button -->
        <v-btn @click="logout" v-if="xs" icon color="white">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn @click="logout" v-else color="white" variant="text">
            {{ $t('navBar.logout') }}
        </v-btn>
    </v-app-bar>
    <v-app-bar color="teal-lighten-1" v-else>
        <v-toolbar-title class="ms-0 text-center">PhoneBook</v-toolbar-title>
    </v-app-bar>

    <!-- Боковое Меню -->
    <v-navigation-drawer v-model="drawer" v-if="isAuth" width="300">
        <MenuList @close-menu="toggleDrawerVisibility" />
    </v-navigation-drawer>
</template>

<script setup lang="ts">
// components
import MenuList from './MenuList.vue';
// composables
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const store = useStore();
const router = useRouter();
const { xs } = useDisplay();

const drawer = ref(false);
const toggleDrawerVisibility = () => (drawer.value = !drawer.value);

const userName = computed(() => store.getters.userMail);
const isAuth = computed(() => store.getters.isAuth);

const logout = async function () {
    const message = await store.dispatch('logout');
    store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
    router.replace('/auth');
};
</script>
