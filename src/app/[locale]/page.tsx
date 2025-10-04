// src/app/[locale]/page.tsx
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";
import initTranslations from "@/lib/i18n";
import TranslationsProvider from "@/components/providers/TranslationsProvider";

const i18nNamespaces = ['translation'];

export default async function Home({ params }: { params: Promise<{ locale?: string }> }) {
  const locale = (await params).locale || 'pt'; 
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </TranslationsProvider>
  );
}