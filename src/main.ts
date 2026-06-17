import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import { i18n } from './i18n'

const savedLocale = window.localStorage.getItem('locale')
if (savedLocale && (i18n.global.availableLocales as string[]).includes(savedLocale)) {
  i18n.global.locale.value = savedLocale as (typeof i18n.global.availableLocales)[number]
}

document.documentElement.lang = i18n.global.locale.value

createApp(App).use(i18n).mount('#app')
