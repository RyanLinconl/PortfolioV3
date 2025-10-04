'use client'

import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { EllipsisVertical, Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function ProjectsSection() {
  const { t } = useTranslation('translation');
  const [filter, setFilter] = useState('all');

  const contentId = 'projects-popover';
  const triggerId = `${contentId}-trigger`;

  const projects = [
    {
      key: 'gamy',
      image: "/images/gamy.jpg",
      tech: ["Next.js", "React", "CSS Modules", "AI API"],
      live: "https://gamy-beta.vercel.app",
      code: "https://github.com/RyanLinconl/gamy",
      relevant: true,
    },
    {
      key: 'opuscheck',
      image: "/images/opuscheck.jpg",
      tech: ["TypeScript", "React", "SCSS", "CSS Modules"],
      live: "https://opus-check.vercel.app",
      code: "https://github.com/RyanLinconl/opusCheck",
      relevant: true,
    },
    {
      key: 'mikaeru',
      image: "/images/mikaeru.jpg",
      tech: ["Unity", "C#"],
      code: "https://github.com/RyanLinconl/mikaeru",
      relevant: true,
    },
    {
      key: 'webscraping',
      image: "/images/webscraping.jpg",
      tech: ["Python", "Selenium", "Pandas"],
      code: "https://github.com/RyanLinconl/WebScraping",
      relevant: true,
    },
    {
      key: 'rick-and-morty-api',
      image: "/images/rick-and-morty-api.jpg",
      tech: ["React", "HTML", "CSS"],
      live: "https://ryan-rick-and-morty.vercel.app",
      code: "https://github.com/RyanLinconl/Rick-and-Morty-Api",
      relevant: false,
    },
    {
      key: 'youtube-api',
      image: "/images/youtube-api.jpg",
      tech: ["HTML", "CSS", "JavaScript"],
      code: "https://github.com/RyanLinconl/youtube-api",
      relevant: false,
    },
    {
      key: 'projeto-sass-css',
      image: "/images/projeto-sass-css.jpg",
      tech: ["HTML", "CSS", "SASS"],
      live: "https://calmaria-spa-sass.vercel.app",
      code: "https://github.com/RyanLinconl/projeto-sass-css",
      relevant: false,
    },
    {
      key: 'minecraft-best-mods',
      image: "/images/minecraft-best-mods.jpg",
      tech: ["HTML", "CSS", "SwiperJS"],
      live: "https://minecraft-best-mods.vercel.app",
      code: "https://github.com/RyanLinconl/minecraft-best-mods",
      relevant: true,
    },
    {
      key: 'ping-pong',
      image: "/images/ping-pong.jpg",
      tech: ["JavaScript", "HTML", "CSS"],
      live: "https://ping-pong-two-theta.vercel.app",
      code: "https://github.com/RyanLinconl/ping-pong",
      relevant: false,
    },
    {
      key: 'atravessando-a-rua',
      image: "/images/atravessando-a-rua.jpg",
      tech: ["JavaScript", "HTML", "CSS"],
      live: "https://atravessando-a-rua.vercel.app",
      code: "https://github.com/RyanLinconl/atravessando-a-rua",
      relevant: false,
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'relevant') return project.relevant;
    if (filter === 'irrelevant') return !project.relevant;
    return true;
  });

  const FilterOption = ({ value, label }: { value: string, label: string }) => (
    <div
      className="flex items-center justify-between p-2 text-sm rounded-md cursor-pointer hover:bg-accent"
      onClick={() => setFilter(value)}
    >
      {label}
      {filter === value && <Check className="w-4 h-4" />}
    </div>
  );

  return (
    <section className="section-padding bg-background text-foreground" id="projetos">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-3xl font-bold md:text-4xl">{t("projects.title")}</h2>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={triggerId}
              aria-controls={contentId}
              aria-haspopup="dialog"
              variant="ghost"
              size="icon"
              className="ml-2 rounded-full cursor-pointer hover:bg-accent"
            >
              <EllipsisVertical className="w-6 h-6" />
            </Button>
          </PopoverTrigger>

          <PopoverContent id={contentId} aria-labelledby={triggerId} className="w-56 p-2 shadow-xl border-border bg-card">
            <FilterOption value="all" label={t("projects.showAll")} />
            <FilterOption value="relevant" label={t("projects.relevant")} />
            <FilterOption value="irrelevant" label={t("projects.lessRelevant")} />
          </PopoverContent>
        </Popover>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        key={filter}
        className="w-full max-w-sm mx-auto md:max-w-2xl lg:max-w-5xl"
      >
        <CarouselContent className="-ml-6">
          {filteredProjects.map((project) => (
            <CarouselItem key={project.key} className="pl-6 cursor-pointer basis-full md:basis-1/2">
              <div className="h-full p-1">
                <Card className="flex flex-col justify-between h-full overflow-hidden transition-all duration-300 border-border hover:shadow-lg hover:border-primary">
                  <CardHeader className="p-0">
                    <div className="overflow-hidden">
                      <Image
                        src={project.image}
                        alt={t(`projects.${project.key}.title`)}
                        width={600}
                        height={350}
                        className="object-cover w-full h-56 transition-transform duration-500 rounded-t-lg group-hover:scale-105"
                      />
                    </div>
                    <CardTitle className="p-4 text-2xl font-semibold select-none">{t(`projects.${project.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <p className="text-sm select-none text-muted-foreground">{t(`projects.${project.key}.description`)}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start justify-between gap-4 p-4 mt-auto sm:flex-row sm:items-center">
                    <div className="flex flex-wrap gap-2 select-none">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex self-end space-x-2 sm:self-auto">
                      {project.live && (
                        <Button size="sm" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">{t("projects.live")}</a>
                        </Button>
                      )}
                      {project.code && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.code} target="_blank" rel="noopener noreferrer">{t("projects.code")}</a>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </section>
  );
}