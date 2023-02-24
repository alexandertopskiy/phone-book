<template>
    <v-app id="inspire">
        <router-view></router-view>

        <!-- Success/Failure Messages -->
        <ResultMessage />
    </v-app>
</template>

<script>
import ResultMessage from '@/components/ui/ResultMessage.vue';
export default {
    components: { ResultMessage },
    created() {
        this.$store.dispatch('tryLogin');
    }
};
</script>
