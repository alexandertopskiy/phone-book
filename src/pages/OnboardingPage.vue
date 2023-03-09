<template>
    <v-main class="bg-teal-lighten-3 d-flex flex-column justify-center">
        <v-container fluid class="text-center">
            <v-card max-width="500" class="mx-auto my-2 pa-2 px-4 bg-teal-lighten-5" v-if="!isLoading">
                <!-- Info -->
                <div class="pa-4">
                    <h2>Почти закончили!</h2>
                    <p>Хотите, чтобы мы сразу добавили важные контакты (скорая, полиция)?</p>
                </div>

                <!-- Actions -->
                <div class="actions mb-2">
                    <v-btn variant="tonal" color="teal" @click="addDefaultContacts"> Добавить </v-btn>
                    <v-btn variant="outlined" color="teal" @click="$router.push('/')"> Нет, спасибо </v-btn>
                    <LangSwitch class="lang-switch" />
                </div>
            </v-card>
            <div v-else>
                <BaseSpinner color="white" />
                <h2 class="mt-6 text-white">{{ $t('auth.info.loading') }}</h2>
            </div>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false
        };
    },
    methods: {
        async addDefaultContacts() {
            this.isLoading = true;

            await this.$store.dispatch('contacts/setDefaultContacts');
            this.$router.replace('/');

            this.isLoading = false;
        }
    }
};
</script>

<style scoped lang="scss">
.actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .lang-switch {
        align-self: center;
    }
}
</style>
