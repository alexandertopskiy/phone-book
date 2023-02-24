<template>
    <v-main class="bg-teal-lighten-3 d-flex flex-column justify-center">
        <v-container fluid class="text-center">
            <!-- <v-card max-width="600" class="py-10 mx-auto">
                <h1 class="my-4">Page not found</h1>
                <p class="my-2">This page doesn't exist yet</p>
                <p class="my-2">
                    Maybe you wanna check
                    <router-link to="/contacts">contacts list?</router-link>
                </p>
            </v-card> -->

            <v-card max-width="400" class="mx-auto bg-teal-lighten-5" v-if="!isLoading">
                <v-form class="my-2 pa-2 px-4" @submit.prevent="submitData" validate-on="blur" ref="form">
                    <!-- Email Field -->
                    <v-text-field
                        type="email"
                        v-model.trim="userMail"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        class="pb-2"
                        variant="solo"
                        autocomplete="email"
                    ></v-text-field>

                    <!-- Password Field -->
                    <v-text-field
                        type="password"
                        v-model.trim="userPassword"
                        :rules="passwordRules"
                        label="Password"
                        required
                        class="pb-2"
                        variant="solo"
                        autocomplete="current-password"
                    ></v-text-field>

                    <!-- Actions -->
                    <div class="actions">
                        <!-- Main Action -->
                        <v-btn variant="tonal" color="teal" type="submit" :disabled="!hasEnteredData">
                            {{ submitButtonCaption }}
                        </v-btn>
                        <v-btn variant="outlined" color="teal" type="button" @click="switchAuthMode">
                            {{ switchModeButtonCaption }}
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
            <div v-else>
                <BaseSpinner color="white" />
                <h2 class="mt-6 text-white">Loading...</h2>
            </div>
        </v-container>
    </v-main>
</template>

<script>
import BaseSpinner from '@/components/ui/BaseSpinner.vue';

export default {
    components: {
        BaseSpinner
    },
    data() {
        return {
            mode: 'login',
            isLoading: false,
            // inputs
            userMail: '',
            userPassword: '',

            // inputs rules
            emailRules: [
                val => !!(val && val.trim()) || 'E-mail is required.',
                val => !(val && val.trim()) || /.+@.+\..+/.test(val) || 'E-mail must be valid.'
            ],
            passwordRules: [val => !!(val && val.trim()) || 'Password is required.']
        };
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? 'Login' : 'Sign Up';
        },
        switchModeButtonCaption() {
            return (this.mode === 'login' ? 'Sign Up' : 'Login') + ' Instead';
        },
        hasEnteredData() {
            return !!this.userMail && !!this.userPassword;
        }
    },
    methods: {
        async submitData() {
            const { valid } = await this.$refs.form.validate();
            if (!valid) return;

            this.isLoading = true;

            const actionPayload = { email: this.userMail, password: this.userPassword };
            try {
                let message;
                if (this.mode === 'login') message = await this.$store.dispatch('login', actionPayload);
                else message = await this.$store.dispatch('signUp', actionPayload);

                this.$store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
                this.$router.replace('/');
            } catch (error) {
                this.$store.dispatch('snackbar/showSnackbar', { message: error.message, type: 'failure' });
            }

            this.isLoading = false;
        },
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signUp' : 'login';
        }
    }
};
</script>

<style scoped>
.actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
}
</style>
