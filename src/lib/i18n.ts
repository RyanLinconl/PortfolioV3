import i18next, { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from './i18nConfig';

export const initTranslations = async (
  locale: string,
  namespaces: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  i18nInstance?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources?: any
) => {

  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) => {
          return import(`../locales/${language}/${namespace}.json`);
        }
      )
    );
  } else {
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });


  return {
    i18n: i18nInstance,
    resources: resources || { [locale]: i18nInstance.services.resourceStore.data?.[locale] || {} },
    t: i18nInstance.t,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function initI18next(lng = 'pt', ns?: string) {
  const i18nInstance = createInstance();
  i18nInstance.use(initReactI18next).init({
    lng,
    resources: { pt: { translation: {} } },
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return i18nInstance;
}

export { i18next as i18n };

export default initTranslations;