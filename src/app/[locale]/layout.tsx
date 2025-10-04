import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import initTranslations from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18nConfig";
import { Navbar } from "@/components/Navbar";
import { ChatbotFloatingButton } from "@/components/ChatbotFloatingButton";

const inter = Inter({ subsets: ["latin"] });
const i18nNamespaces = ["translation"];

const isRtlLocale = (locale: string) => ["ar", "he", "fa", "ur"].includes(locale);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale } = await params;
  return {
    title: "Ryan Lira",
    description: "Desenvolvedor Full Stack",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let resources;
  try {
    ({ resources } = await initTranslations(locale, i18nNamespaces));
  } catch (err) {
    console.error("[layout] Erro ao inicializar traduções:", err);
    ({ resources } = await initTranslations(defaultLocale, i18nNamespaces));
  }

  // Não renderize <html>/<body> aqui — apenas um wrapper com lang/dir
  return (
    <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
      <div lang={locale} dir={isRtlLocale(locale) ? "rtl" : "ltr"} className={inter.className}>
        <Navbar />
        {children}
        <ChatbotFloatingButton />
      </div>
    </TranslationsProvider>
  );
}
