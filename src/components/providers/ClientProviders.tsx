"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import TranslationsProvider from "@/components/providers/TranslationsProvider";

export function ClientProviders({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources: any;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        {children}
      </TranslationsProvider>
    </ThemeProvider>
  );
}

export { ThemeProvider };
