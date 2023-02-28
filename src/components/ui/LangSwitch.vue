<template>
    <div class="lang text-body-2">
        <label for="lang">{{ $t('chooseLang') }}</label>
        <select v-model="$i18n.locale" id="lang">
            <option v-for="locale in lagnuages" :key="locale.key" :value="locale.key">
                {{ locale.title }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'LangSwitch',
    computed: {
        lagnuages() {
            return [
                {
                    title: this.$t('languages.ru'),
                    key: 'ru'
                },
                {
                    title: this.$t('languages.en'),
                    key: 'en'
                }
            ];
        }
    }
};
</script>

<style lang="scss" scoped>
.lang {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    label {
        color: #26a69a;
    }

    select {
        text-align: center;
        padding: 0.25rem 1.5rem;
        border-radius: 6px;
        border: 1px solid #b2dfdb;
        color: #b2dfdb;

        &:focus {
            outline: none;
            border-color: #26a69a;
            color: #26a69a;
        }
    }
}
</style>
