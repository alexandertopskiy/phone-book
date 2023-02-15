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
        @input="setSearch"
    ></v-text-field>
</template>

<script>
export default {
    data() {
        return {
            enteredValue: ''
        };
    },
    methods: {
        setSearch(evt) {
            const value = evt.target.value;
            this.enteredValue = value;
            console.log(value);
        }
    }
};
</script>

<style></style>
