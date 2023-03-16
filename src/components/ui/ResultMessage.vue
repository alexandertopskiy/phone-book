<template>
    <v-snackbar v-model="isVisible" :multi-line="multiline" :color="color" :timeout="timeout">
        {{ message }}

        <template v-slot:actions>
            <v-btn @click="closeSnackbar" class="d-none d-sm-block" color="white" variant="text">
                {{ $t('commonUI.resultMessage.closeBtn') }}
            </v-btn>
            <v-btn @click="closeSnackbar" class="d-block d-sm-none" icon color="white">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'ResultMessage'
};
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// computed
const isVisible = computed({
    get() {
        return store.getters['snackbar/isVisible'];
    },
    set() {
        store.dispatch('snackbar/hideSnackbar');
    }
});
const message = computed(() => store.getters['snackbar/text']);
const timeout = computed(() => store.getters['snackbar/timeout']);
const multiline = computed(() => store.getters['snackbar/multiline']);
const color = computed(() => {
    const type = store.getters['snackbar/type'];
    if (type === 'failure') return 'red';
    if (type === 'success') return 'success';
    return null;
});

// methods
const closeSnackbar = () => store.dispatch('snackbar/hideSnackbar');
</script>

<style>
div.v-snackbar:not(.v-snackbar--absolute) {
    height: 100% !important;
}

div.v-snackbar .v-snackbar__wrapper {
    min-width: 0px;
    max-width: 300px;
}
</style>
