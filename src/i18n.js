import { createI18n } from 'vue-i18n';

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key).default;
        }
    });
    return messages;
}

// считывание сохраненного в localStorage языка
const savedLocal = localStorage.getItem('locale');

export default createI18n({
    legacy: false,
    globalInjection: true,
    // если в localStorage ничего нет, то считывание из env (если и там нет, то 'en')
    locale: savedLocal || process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
});
