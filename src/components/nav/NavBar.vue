<template>
    <div>
        <v-app-bar color="teal-lighten-1">
            <v-app-bar-nav-icon @click="toggleDrawerVisibility"></v-app-bar-nav-icon>
            <!-- TODO: делать по центру для десктопа, прижимать к левому краю для планшетов, скрывать для мобилок -->
            <v-toolbar-title class="hidden-sm-and-down">PhoneBook App</v-toolbar-title>
        </v-app-bar>
        <!-- Боковое Меню -->
        <v-navigation-drawer v-model="drawer">
            <MenuList @close-menu="toggleDrawerVisibility" />
        </v-navigation-drawer>
    </div>
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
    methods: {
        toggleDrawerVisibility() {
            this.drawer = !this.drawer;
        }
    }
};
</script>
