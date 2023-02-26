<template>
    <v-app-bar color="teal-lighten-1" v-if="isAuth">
        <v-app-bar-nav-icon @click="toggleDrawerVisibility" class="icon"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-sm-and-down">PhoneBook</v-toolbar-title>
        <!-- v-if="userName" - чтобы не было блика при логауте -->
        <h3 class="ms-md-4 text-subtitle-1">Hello, {{ userName }}!</h3>
        <v-spacer></v-spacer>
        <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-app-bar color="teal-lighten-1" v-else>
        <v-toolbar-title class="text-center">PhoneBook</v-toolbar-title>
    </v-app-bar>

    <!-- Боковое Меню -->
    <v-navigation-drawer v-model="drawer" v-if="isAuth">
        <MenuList @close-menu="toggleDrawerVisibility" />
    </v-navigation-drawer>
</template>

<script>
import MenuList from './MenuList.vue';

export default {
    components: {
        MenuList
    },
    data() {
        return {
            // true: opened, false: closed, null: opened on desktop, closed on mobile
            drawer: false
        };
    },
    computed: {
        userName() {
            return this.$store.getters.userMail;
        },
        isAuth() {
            return this.$store.getters.isAuth;
        }
    },
    methods: {
        toggleDrawerVisibility() {
            this.drawer = !this.drawer;
        },
        async logout() {
            const message = await this.$store.dispatch('logout');
            this.$store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
            this.$router.replace('/auth');
        }
    }
};
</script>
