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
    },
    computed: {
        didAutoLogout() {
            return this.$store.getters.didAutoLogout;
        }
    },
    watch: {
        didAutoLogout(curVal, oldVal) {
            if (curVal && curVal !== oldVal) {
                this.$router.replace('/auth');
                this.$store.dispatch('snackbar/showSnackbar', {
                    message: 'Ваша сессия истекла, авторизуйтесь заново!',
                    type: 'success'
                });
            }
        }
    }
};
</script>
