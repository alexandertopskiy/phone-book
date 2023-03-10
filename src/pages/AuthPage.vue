<template>
    <v-main class="bg-teal-lighten-3 d-flex flex-column justify-center">
        <v-container fluid class="text-center">
            <v-card max-width="500" class="mx-auto bg-teal-lighten-5" v-if="!isLoading">
                <!-- Auth Form -->
                <v-form
                    class="my-2 pa-2 px-4"
                    @submit.prevent="submitData"
                    validate-on="blur"
                    ref="form"
                    v-if="mode !== 'onboarding'"
                >
                    <!-- Email Field -->
                    <v-text-field
                        type="email"
                        v-model.trim="userMail"
                        :rules="emailRules"
                        :label="$t('auth.inputs.mail')"
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
                        :label="$t('auth.inputs.password')"
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

                        <LangSwitch class="lang-switch" />
                    </div>
                </v-form>

                <!-- Onboarding (when Register) -->
                <div class="my-2 pa-2 px-4" v-else>
                    <!-- Info -->
                    <div class="pa-4">
                        <h2>{{ $t('onboarding.title') }}</h2>
                        <p>{{ $t('onboarding.subtitle') }}</p>
                    </div>

                    <!-- Actions -->
                    <div class="actions">
                        <v-btn variant="tonal" color="teal" @click="addDefaultContacts">
                            {{ $t('onboarding.addBtnTitle') }}
                        </v-btn>
                        <v-btn variant="outlined" color="teal" @click="$router.replace('/')">
                            {{ $t('onboarding.noAddBtnTitle') }}
                        </v-btn>
                        <LangSwitch class="lang-switch" />
                    </div>
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
            mode: 'login',
            isLoading: false,
            // inputs
            userMail: '',
            userPassword: '',

            // inputs rules
            emailRules: [
                val => !!(val && val.trim()) || this.$t('auth.inputs.errors.fieldRequired'),
                val => !(val && val.trim()) || /.+@.+\..+/.test(val) || this.$t('auth.inputs.errors.emailInvalid')
            ],
            passwordRules: [val => !!(val && val.trim()) || this.$t('auth.inputs.errors.fieldRequired')]
        };
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? this.$t('auth.buttons.login') : this.$t('auth.buttons.signUp');
        },
        switchModeButtonCaption() {
            return this.mode === 'login' ? this.$t('auth.buttons.signUpInstead') : this.$t('auth.buttons.loginInstead');
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
                if (this.mode === 'login') {
                    message = await this.$store.dispatch('login', actionPayload);
                    this.$router.replace('/');
                } else {
                    message = await this.$store.dispatch('signUp', actionPayload);
                    this.mode = 'onboarding';
                }
                this.$store.dispatch('snackbar/showSnackbar', { message, type: 'success' });
            } catch (error) {
                this.$store.dispatch('snackbar/showSnackbar', { message: error.message, type: 'failure' });
            }

            this.isLoading = false;
        },
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signUp' : 'login';
        },
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
