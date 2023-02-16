# phone-book

## Bugs

-   v-toolbar не уменьшается на мобилках, как должно быть по [документации](https://vuetifyjs.com/en/components/toolbars/#usage)
-   v-toolbar-content не имеет дофолтных paddings, как во 2 версии Vuetify, исправлено глобальным стилем для **.v-toolbar\_\_content**
-   Для **v-text-field** в документации не описано, как реалзизовать **solo-inverted (Reduces element opacity until focused)** в 3 версии Vuetify
-   Предупреждение в консоли и долгое HMR (https://github.com/vuetifyjs/vuetify/issues/16661), пофикшено вручную как в коммите автора

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
