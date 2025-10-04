'use client';

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

type Version = {
  title: string;
  href: string;
  thumb?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  versions: Version[];
};

export function PortalModal({ open, onClose, versions }: Props) {
  const { t } = useTranslation('translation');
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      const btn = document.querySelector('.time-machine-btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const translateX = centerX - (window.innerWidth / 2);
        const translateY = centerY - (window.innerHeight / 2);
        document.documentElement.style.setProperty('--initial-translate-x', `${translateX}px`);
        document.documentElement.style.setProperty('--initial-translate-y', `${translateY}px`);
      }
      setTimeout(() => setIsMounted(true), 50);
    }
  }, [open]);

  const handleClose = () => {
    setIsMounted(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  if (!open && !isClosing) return null;

  const VersionPreview = ({ href, title, thumb }: Version) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden transition-transform duration-300 rounded-lg shadow-sm bg-card/90 hover:scale-105 hover:shadow-md"
    >
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumb} alt={title} className="object-cover w-full h-32 md:h-40" />
      ) : (
        <div className="flex items-center justify-center w-full h-32 bg-muted md:h-40">
          <span className="text-muted-foreground">Preview Indisponível</span>
        </div>
      )}
      <div className="p-2 text-sm font-medium text-center text-foreground">
        {title}
      </div>
    </a>
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center portal-overlay ${isMounted ? 'mounted' : ''} ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="portal-backdrop" />

      <div className="portal-animation">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>

      <div
        className={`relative z-10 w-full max-w-md p-6 bg-background/80 rounded-2xl shadow-lg modal-content ${isMounted ? 'mounted' : ''} ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">
          {t("time-machine.title")}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground md:text-base">
          {t("time-machine.description")}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {versions.map((version, index) => (
            <VersionPreview key={index} {...version} />
          ))}
        </div>

        <Button
          onClick={handleClose}
          className="w-full px-4 py-2 mt-6 transition-colors rounded-lg cursor-pointer"
          aria-label="Fechar portal"
        >
          {t("time-machine.button")}
        </Button>
      </div>
    </div>
  );
}