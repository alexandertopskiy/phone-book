<template>
    <v-main class="bg-teal-lighten-3 d-flex flex-column justify-center">
        <v-container fluid class="text-center">
            <v-card max-width="600" class="py-10 mx-auto">
                <h1 class="my-4">{{ $t('notFound.title') }}</h1>
                <p class="my-2">{{ $t('notFound.subtitle') }}</p>
                <p class="my-2">
                    {{ $t('notFound.linkStart') }}
                    <router-link to="/contacts">{{ $t('notFound.linkEnd') }}</router-link>
                </p>
            </v-card>
        </v-container>
    </v-main>
</template>

<style scoped lang="scss">
a {
    text-decoration: none;
    color: #26a69a; // teal-lighten-1

    &:hover,
    &:active {
        color: #b2dfdb; // teal-lighten-4
    }
}
</style>
