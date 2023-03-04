<template>
    <div class="lang text-body-2">
        <label for="lang">{{ $t('chooseLang') }}</label>
        <div class="select-holder">
            <select v-model="$i18n.locale" id="lang">
                <option v-for="locale in lagnuages" :key="locale.key" :value="locale.key">
                    {{ locale.title }}
                </option>
            </select>
            <!-- 
				fake select
				в safari не работает text-align для select-элемента 
				из-за этого реализован костыль (https://codepen.io/samhtfc/pen/powQVWX)
				- реальный селект скрывается, от него берется возможность использовать список options
				- вывод выбранного варианта производится  в input (для которого text-align работает нормально) 
				- этот инпут абсолютно позиционируется относительно select'а, чтобы нажатие на него выводило список вариантов
			-->
            <input type="text" :value="fakeSelectCapture" disabled />
        </div>
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
        },
        fakeSelectCapture() {
            return this.lagnuages.find(lang => lang.key === this.$i18n.locale).title;
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

    .select-holder {
        position: relative;
        display: flex;
        align-items: center;

        select {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }

        input {
            text-align: center;
            width: 100%;
            pointer-events: none;

            padding: 0.25rem 1.5rem;
            border-radius: 6px;
            border: 1px solid #b2dfdb;
            color: #b2dfdb;
        }
    }
}
</style>
