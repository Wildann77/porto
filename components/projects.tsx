"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

// import OpenSource from "@/components/open-source"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { ProjectItem } from "@/types"

const projects: ProjectItem[] = [
  {
    title: "Real-Time Sports Dashboard",
    description:
      "A high-frequency live sports update system using WebSockets, Go goroutines, and an interactive React interface.",
    tags: ["Go", "WebSockets", "React.js", "TypeScript", "Tailwind CSS"],
    codeLink: "https://github.com/Wildann77",
  },
  {
    title: "Bunda Care Ecosystem",
    description:
      "A digital tracking ecosystem for mother and toddler health, with mobile and web platforms sharing a centralized database.",
    tags: ["Node.js", "Express.js", "MongoDB", "Flutter", "Tailwind CSS"],
    codeLink: "https://github.com/Wildann77",
  },
  {
    title: "Go Microservices",
    description:
      "A prototype microservices architecture built with Go, utilizing GraphQL API gates and RabbitMQ for message brokers.",
    tags: ["Go", "GraphQL", "RabbitMQ", "Docker"],
    codeLink: "https://github.com/Wildann77",
  },
  {
    title: "Muhammadiyah Bulakamba",
    description:
      "A headless organization profile built with MySQL and React to manage administrative data, organization news, and public portals.",
    tags: ["TypeScript", "Express.js", "MySQL", "React.js", "CSS Modules"],
    codeLink: "https://github.com/Wildann77",
  },
  {
    title: "Decoupled JWT Auth",
    description:
      "A modular standalone authentication system with bcrypt hashing, token validation, and secure route protection.",
    tags: ["TypeScript", "Node.js", "Express.js", "JWT", "React.js"],
    codeLink: "https://github.com/Wildann77",
  },
  {
    title: "Movie App",
    description:
      "Search and browse movies using a clean, responsive interface powered by a third-party API.",
    tags: ["JavaScript", "React.js", "Tailwind CSS", "REST API"],
    codeLink: "https://github.com/Wildann77/MovieApp",
    liveLink: "https://movie-app-nu-green.vercel.app/",
  },
]

function ProjectPreview({ index, title }: { index: number; title: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/45 bg-muted/35 p-4">
      <div className="absolute inset-0 grain-overlay opacity-75" />
      <div className="relative flex items-center justify-between text-xs text-muted-foreground">
        <span>Case 0{index + 1}</span>
        <span>{title.split(" ")[0]}</span>
      </div>
      <div className="relative mt-12 space-y-3">
        <div className="h-3 w-2/3 rounded-full bg-primary/45" />
        <div className="h-3 w-1/2 rounded-full bg-secondary/45" />
        <div className="grid grid-cols-3 gap-2 pt-4">
          <div className="h-20 rounded-lg bg-background/55" />
          <div className="h-20 rounded-lg bg-card/75" />
          <div className="h-20 rounded-lg bg-primary/20" />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: "easeOut" },
    },
  }

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="relative overflow-hidden bg-muted/25 py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="editorial-grid absolute inset-0 opacity-40" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <motion.div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end" variants={itemVariants}>
            <div className="space-y-4">
              <span className="section-eyebrow">Projects</span>
              <h2 className="font-sans text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
                Projects I&apos;ve Built.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground md:justify-self-end md:text-lg">
              A collection of personal projects exploring frontend interfaces, full-stack functionality, and API integrations.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-5 lg:grid-cols-3" variants={containerVariants}>
            {projects.map((project, index) => {
              return (
                <motion.div
                  key={project.title}
                  className="project-card"
                  variants={itemVariants}
                >
                  <Card className="agency-surface h-full overflow-hidden py-0">
                    <CardContent className="flex h-full flex-col p-0">
                      <div className="p-5">
                        <ProjectPreview index={index} title={project.title} />
                      </div>
                      <div className="flex flex-1 flex-col border-t border-border/45 p-5 md:border-l md:border-t-0 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">Live case study</p>
                            <h3 className="mt-2 font-sans text-2xl font-black leading-tight">{project.title}</h3>
                          </div>
                          <span className="rounded-full border border-border/45 px-3 py-1 text-xs text-muted-foreground">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button size="sm" variant="outline" className="rounded-full bg-background/35" asChild>
                            <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                              <Github aria-hidden="true" className="h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                          {project.liveLink ? (
                            <Button size="sm" className="rounded-full" asChild>
                              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                                Live
                              </Link>
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* <motion.div className="pt-10" variants={itemVariants}>
            <OpenSource />
          </motion.div> */}
        </div>
      </div>
    </motion.section>
  )
}
