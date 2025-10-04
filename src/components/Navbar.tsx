'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'next-themes';
import { Home, User, Folder, Mail, Moon, Sun, Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Lang = { code: string; name: string; flag: string };

const LANGS: Lang[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const FALLBACK = {
  nav: {
    home: 'Início',
    about: 'Sobre',
    skills: 'Habilidades',
    projects: 'Projetos',
    contact: 'Contato',
    theme: 'Tema',
  },
};

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t, i18n } = useTranslation('translation');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<string>('pt');
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const TOP_OFFSET = 60;

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 10) {
      setVisible(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY.current && currentScrollY > TOP_OFFSET) {
      setVisible(false);
    } else if (currentScrollY < lastScrollY.current) {
      setVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
      if (saved && ['pt', 'en', 'es'].includes(saved)) {
        setCurrentLang(saved);
        void i18n.changeLanguage(saved);
        return;
      }
      const nav = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : undefined;
      if (nav && ['pt', 'en', 'es'].includes(nav)) {
        setCurrentLang(nav);
        void i18n.changeLanguage(nav);
      }
    } catch { }
  }, [i18n]);

  function tr(key: string): string {
    if (!mounted) {
      const parts = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (parts.length === 2 && (FALLBACK as any)[parts[0]]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (FALLBACK as any)[parts[0]][parts[1]] ?? key;
      }
      return key;
    }
    return t(key);
  }

  const toggleTheme = () => {
    const effective = resolvedTheme ?? theme;
    setTheme(effective === 'dark' ? 'light' : 'dark');
  };

  const isDark = mounted ? (resolvedTheme ?? theme) === 'dark' : false;

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
      setVisible(true);
    } else {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onKeyDown]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-40 transform transition-transform duration-300 ease-in-out shadow-sm bg-background text-foreground ${visible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="#inicio" className="text-lg font-bold transition-colors duration-200 text-primary hover:text-primary/90">
              RL
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-2 px-3 py-1 transition-colors rounded-md cursor-pointer select-none hover:bg-accent"
                type="button"
              >
                <span className="text-lg" aria-hidden>
                  {mounted ? LANGS.find((l) => l.code === currentLang)?.flag : ' '}
                </span>
                <span className="hidden text-sm sm:inline">{mounted ? LANGS.find((l) => l.code === currentLang)?.name : ''}</span>
              </button>

              {langOpen && (
                <ul className="absolute right-0 z-50 py-2 mt-2 rounded-md shadow-lg cursor-pointer w-36 bg-background ring-1 ring-black/5" role="listbox">
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <LanguageItem
                        code={l.code}
                        name={l.name}
                        flag={l.flag}
                        onSelected={(code) => {
                          setCurrentLang(code);
                          setLangOpen(false);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!isOpen && (
              <Button variant="ghost" size="icon" className="w-8 h-8 cursor-pointer" onClick={() => setIsOpen(true)} aria-label="Abrir menu">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {isOpen && (
              <>
                <motion.div
                  key="nav-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                />
                <motion.aside
                  key="nav-panel"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="fixed right-0 top-0 bottom-0 z-60 w-full sm:w-[360px] max-w-[95vw] bg-background shadow-xl flex flex-col"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navegação"
                >
                  <div className="flex items-center justify-between p-4">
                    <h3 className="text-lg font-semibold">Menu</h3>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full cursor-pointer" onClick={() => setIsOpen(false)} aria-label="Fechar menu">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col px-6 pt-2 space-y-2">
                      <Link href="#inicio" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 -ml-2 transition-colors rounded-md hover:bg-accent">
                        <Home className="w-5 h-5" />
                        <span className="text-base">{tr('nav.home')}</span>
                      </Link>
                      <Link href="#sobre" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 -ml-2 transition-colors rounded-md hover:bg-accent">
                        <User className="w-5 h-5" />
                        <span className="text-base">{tr('nav.about')}</span>
                      </Link>
                      <Link href="#habilidades" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 -ml-2 transition-colors rounded-md hover:bg-accent">
                        <Code className="w-5 h-5" />
                        <span className="text-base">{tr('nav.skills')}</span>
                      </Link>
                      <Link href="#projetos" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 -ml-2 transition-colors rounded-md hover:bg-accent">
                        <Folder className="w-5 h-5" />
                        <span className="text-base">{tr('nav.projects')}</span>
                      </Link>
                      <Link href="#contato" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-2 -ml-2 transition-colors rounded-md hover:bg-accent">
                        <Mail className="w-5 h-5" />
                        <span className="text-base">{tr('nav.contact')}</span>
                      </Link>
                    </nav>
                  </div>
                  <div className="px-6 py-3 mb-20">
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                      <div className="flex items-center gap-2">
                        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        <span className="text-sm font-medium">{tr('nav.theme')}</span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        aria-pressed={isDark}
                        aria-label="Alternar tema claro/escuro"
                        className="relative inline-flex items-center w-10 h-6 rounded-full cursor-pointer hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span aria-hidden className={`absolute inset-0 rounded-full transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-border'}`} />
                        <span className={`relative z-10 inline-block h-4 w-4 transform rounded-full bg-background transition will-change-transform ${isDark ? 'translate-x-5' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function LanguageItem({ code, name, flag, onSelected }: { code: string; name: string; flag: string; onSelected: (code: string) => void }) {
  const { i18n } = useTranslation('translation');
  const router = useRouter();

  async function handleClick(): Promise<void> {
    try {
      if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(code);
      }
      router.replace(`/${code}`);
      if (typeof window !== 'undefined') localStorage.setItem('i18nextLng', code);
      onSelected(code);
    } catch (err: unknown) {
      console.error('Language change error:', err);
    }
  }

  return (
    <button onClick={handleClick} className="flex items-center w-full gap-2 px-3 py-2 text-left rounded-md cursor-pointer hover:bg-accent" type="button">
      <span className="text-lg" aria-hidden>
        {flag}
      </span>
      <span className="text-sm">{name}</span>
    </button>
  );
}