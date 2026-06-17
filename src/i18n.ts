import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'
import th from './locales/th.json'
import zhHans from './locales/zh-Hans.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  missingWarn: true,
  fallbackWarn: true,
  messages: {
    en,
    ru,
    th,
    'zh-Hans': zhHans,
  },
})
