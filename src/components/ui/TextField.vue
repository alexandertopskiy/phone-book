<template>
    <v-text-field
        density="compact"
        variant="solo"
        clearable
        single-line
        hide-details
        prepend-inner-icon="mdi-text-box-search-outline"
        label="Search a contact"
        placeholder="Search a contact"
        :value="enteredValue"
        @input="setSearchQuery($event.target.value)"
        @click:clear="setSearchQuery('')"
    ></v-text-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: mapGetters({ enteredValue: 'searchQuery' }),
    methods: mapActions(['setSearchQuery'])
};
</script>

<style></style>
