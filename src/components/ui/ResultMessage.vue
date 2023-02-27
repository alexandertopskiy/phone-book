<template>
    <v-snackbar v-model="isVisible" :multi-line="multiline" :color="color" :timeout="timeout">
        {{ message }}

        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="closeSnackbar">
                {{ $t('commonUI.resultMessage.closeBtn') }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'ResultMessage',
    computed: {
        isVisible: {
            get() {
                return this.$store.getters['snackbar/isVisible'];
            },
            set() {
                this.$store.dispatch('snackbar/hideSnackbar');
            }
        },
        message() {
            return this.$store.getters['snackbar/text'];
        },
        color() {
            const type = this.$store.getters['snackbar/type'];
            if (type === 'failure') return 'red';
            if (type === 'success') return 'success';
            return null;
        },
        timeout() {
            return this.$store.getters['snackbar/timeout'];
        },
        multiline() {
            return this.$store.getters['snackbar/multiline'];
        }
    },
    methods: {
        closeSnackbar() {
            this.$store.dispatch('snackbar/hideSnackbar');
        }
    }
};
</script>
