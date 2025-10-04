'use client';

import Image from "next/image";
import foto from "/public/images/foto2.png";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  const { t } = useTranslation('translation');

  return (
    <motion.section
      id="inicio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center w-full min-h-screen p-6 text-center"
    >
      <div className="max-w-3xl">
        <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden border-4 rounded-full shadow-lg md:w-40 md:h-40 border-primary">
          <Image
            src={foto}
            alt="Ryan Lira"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>

        <h1 className="mb-2 text-lg font-medium md:text-xl text-foreground">
          {t("hero.greeting")}
        </h1>

        <h2 className="mb-4 text-5xl font-bold leading-tight md:text-6xl text-foreground">
          {t("hero.title")}
        </h2>

        <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed md:text-xl text-muted-foreground">
          {t("hero.description")}
        </p>

        <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Link href="#projetos">
            <Button size="lg" className="text-lg cursor-pointer ">
              {t("hero.viewProjects")}
            </Button>
          </Link>
          <Link href="#contato">
            <Button size="lg" variant="outline" className="text-lg cursor-pointer border-primary text-primary hover:bg-primary/15">
              {t("hero.getContact")}
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}