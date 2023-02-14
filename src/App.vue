<template>
    <v-app id="inspire">
        <NavBar />
        <v-main>
            <h1>Phone Book App</h1>
        </v-main>
    </v-app>
</template>

<script>
import NavBar from '@/components/nav/NavBar.vue';

export default {
    components: {
        NavBar
    },
    data() {
        return {};
    }
};
</script>
