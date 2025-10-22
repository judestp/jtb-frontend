'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '@/locales/en/common.json';
import jaCommon from '@/locales/ja/common.json';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: enCommon },
        ja: { common: jaCommon },
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'ja'],
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['htmlTag', 'navigator', 'cookie', 'localStorage'],
        caches: ['localStorage'],
      },
      returnEmptyString: false,
    });
}

export default i18n;


