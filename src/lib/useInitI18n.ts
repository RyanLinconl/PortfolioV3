'use client';

import { useMemo } from 'react';
import { initI18next } from './i18n';

export default function useInitI18n(): void {
  useMemo(() => {
    if (typeof window !== 'undefined') {
      initI18next();
    }
  }, []);
}