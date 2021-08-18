import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n"
import ru from "../locales/ru.json"
import en from "../locales/en.json"

function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context("../locales", true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages<VueMessageType> = {}

  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) messages[matched[1]] = locales(key).default
  })

  return messages
}

const messages = {
  "en": en,
  "ru": ru
}

export default createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  legacy: false,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "ru",
  messages
})
