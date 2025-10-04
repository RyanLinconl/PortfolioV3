'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Cloud, GitBranch, Container, Users, MessageCircle, Lightbulb, Brain, BicepsFlexed, Telescope } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SkillsSection() {
  const { t } = useTranslation('translation');

  return (
    <section className="mb-12 section-padding bg-background text-foreground" id="habilidades">
      <h2 className="mb-2 text-3xl font-bold">{t("skills.title")}</h2>
      <p className="mb-6 text-muted-foreground">{t("skills.subtitle")}</p>

      <h3 className="mb-2 text-xl font-semibold">{t("skills.frontend")}</h3>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        <Card className="card"><CardContent className="flex items-center"><Code className="mr-2" /> Next.js</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Code className="mr-2" /> React</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Code className="mr-2" /> TailwindCss</CardContent></Card>
      </div>

      <h3 className="mb-2 text-xl font-semibold">{t("skills.backend")}</h3>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        <Card className="card"><CardContent className="flex items-center"><Database className="mr-2" /> Node.js</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Database className="mr-2" /> Python</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Database className="mr-2" /> Databases</CardContent></Card>
      </div>

      <h3 className="mb-2 text-xl font-semibold">{t("skills.tools")}</h3>
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        <Card className="card"><CardContent className="flex items-center"><GitBranch className="mr-2" /> Git</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Container className="mr-2" /> Docker</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Cloud className="mr-2" /> Cloud Services</CardContent></Card>
      </div>

      <h3 className="mb-2 text-xl font-semibold">{t("skills.softskills.title")}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="card"><CardContent className="flex items-center"><Brain className="mr-2" /> {t("skills.softskills.skill1")}</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><MessageCircle className="mr-2" /> {t("skills.softskills.skill2")}</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Users className="mr-2" /> {t("skills.softskills.skill3")}</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Lightbulb className="mr-2" /> {t("skills.softskills.skill4")}</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><BicepsFlexed className="mr-2" /> {t("skills.softskills.skill5")}</CardContent></Card>
        <Card className="card"><CardContent className="flex items-center"><Telescope className="mr-2" /> {t("skills.softskills.skill6")}</CardContent></Card>
      </div>
    </section>
  );
}
