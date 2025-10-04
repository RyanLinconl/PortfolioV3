'use client';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';

interface TranslationsProviderProps {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources: any;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const i18nInstance = createInstance();

  i18nInstance.use(initReactI18next).init({
    lng: locale,
    resources,
    fallbackLng: 'pt',
    defaultNS: namespaces[0],
    ns: namespaces,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}