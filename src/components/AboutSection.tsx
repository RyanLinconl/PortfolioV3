'use client';

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@/components/ui/timeline";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      duration: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, 
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }, 
  },
};

export function AboutSection() {
  const { t } = useTranslation('translation');

  const educationItems = t("about.education_items", { returnObjects: true });
  const itemsToRender: string[] = Array.isArray(educationItems) ? educationItems : [];

  return (
    <motion.section
      className="section-padding bg-background text-foreground"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      id="sobre"
    >
      <motion.h2
        className="mb-8 text-3xl font-bold md:text-4xl"
        variants={itemVariants}
      >
        {t("about.title", { defaultValue: "Sobre Mim" })}
      </motion.h2>
      <motion.div
        className="flex flex-col items-center gap-8 md:flex-row md:gap-12 md:items-start"
        variants={containerVariants}
      >
        <motion.div
          className="flex-shrink-0"
          variants={itemVariants}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <Image
            src="/images/foto1.png"
            alt="Ryan Lira"
            width={300}
            height={400}
            className="object-cover shadow-lg rounded-xl"
          />
        </motion.div>
        <motion.div className="flex-grow" variants={containerVariants}>
          <motion.p
            className="mb-6 text-base leading-relaxed md:text-lg text-muted-foreground"
            variants={itemVariants}
          >
            {t("about.bio", { defaultValue: "Sou um desenvolvedor full-stack com paixão por criar aplicações web inovadoras e amigáveis ao usuário. Minha jornada na tecnologia começou com uma fascinação por como o software pode resolver problemas do mundo real, e isso me impulsionou a dominar uma ampla gama de linguagens de programação e frameworks..." })}
          </motion.p>
          <motion.h3
            className="mb-4 text-2xl font-semibold"
            variants={itemVariants}
          >
            {t("about.experience", { defaultValue: "Experiência" })}
          </motion.h3>
          <motion.div className="mb-6" variants={containerVariants}>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <motion.div className="pt-0" variants={itemVariants}>
                  <TimelineContent>
                    {t("about.experience_item1")}
                  </TimelineContent>
                </motion.div>
              </TimelineItem>
            </Timeline>
          </motion.div>
          <motion.h3
            className="mb-4 text-2xl font-semibold"
            variants={itemVariants}
          >
            {t("about.education", { defaultValue: "Escolaridade" })}
          </motion.h3>
          <motion.div className="mb-6" variants={containerVariants}>
            <Timeline>
              {itemsToRender.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index < itemsToRender.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <motion.div className="pt-0" variants={itemVariants}>
                    <TimelineContent>{item}</TimelineContent>
                  </motion.div>
                </TimelineItem>
              ))}
              {itemsToRender.length === 0 && (
                <TimelineItem>
                  <TimelineContent>{t("about.education_error", { defaultValue: "Dados de escolaridade não carregados ou indisponíveis." })}</TimelineContent>
                </TimelineItem>
              )}
            </Timeline>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}