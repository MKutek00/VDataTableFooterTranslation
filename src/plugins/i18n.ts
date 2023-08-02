import locales from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';
import { en, pl } from 'vuetify/locale';

const messages = {
  en: { $vuetify: en, ...locales['en'] },
  pl: { $vuetify: pl, ...locales['pl'] }
};

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  useScope: 'global',

  locale: 'en',
  fallbackLocale: 'en',
  messages: messages
});

export function getLocale(): string {
  return i18n.global.locale.value;
}

export function changeLanguage(newLocale: string): void {
  if (!['en', 'pl', 'sr'].includes(newLocale)) {
    console.error('Invalid locale:', newLocale);
    return;
  }
  i18n.global.locale.value = newLocale as 'en' | 'pl';
}
