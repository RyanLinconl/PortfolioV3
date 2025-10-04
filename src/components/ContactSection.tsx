/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PortalModal } from "@/components/portalModal";

export function ContactSection() {
  const { t } = useTranslation('translation');
  const [openPortal, setOpenPortal] = useState(false);

  const versions = [
    {
      title: t("time-machine.img-description1"),
      href: "https://ryan-lira.vercel.app",
      thumb: "images/portfolioV1.jpg"
    },
    {
      title: t("time-machine.img-description2"),
      href: "https://ryanlira.vercel.app/",
      thumb: "images/portfolioV2.jpg"
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen p-6 text-center" id="contato">
      <h2 className="mb-2 text-3xl font-bold">{t("contact.title")}</h2>
      <p className="mb-6 text-muted-foreground">{t("contact.description")}</p>
      <div className="flex justify-center mb-4 space-x-6">
        <a href="https://github.com/RyanLinconl" target="_blank" rel="noopener noreferrer">
          <BsGithub size={28} className="transition-colors duration-200 text-foreground hover:text-primary" />
        </a>
        <a href="https://www.linkedin.com/in/o-ryan-lira/" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size={28} className="transition-colors duration-200 text-foreground hover:text-primary" />
        </a>
        <a href="mailto:oryanlira@gmail.com" target="_blank" rel="noopener noreferrer">
          <Mail size={28} className="transition-colors duration-200 text-foreground hover:text-primary" />
        </a>
      </div>
      <p className="mb-4 text-foreground">oryanlira@gmail.com</p>
      <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
        {t("contact.email")}
      </Button>
      
      <div className="mt-8 md:mt-0 md:absolute md:left-8 md:bottom-8">
        <button
          onClick={() => setOpenPortal(true)}
          aria-label="Abrir portal para versões antigas"
          className="time-machine-btn focus:outline-none"
        >
          <img
            src="/images/delorian1.gif"
            alt="Máquina do tempo"
            draggable={false}
          />
        </button>
      </div>

      <PortalModal open={openPortal} onClose={() => setOpenPortal(false)} versions={versions} />
    </section>
  );
}