"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Skills from "@/components/skills-content"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { ExperienceItem } from "@/types"

const experiences: ExperienceItem[] = [
  {
    title: "Capstone Project",
    company: "Personal Project",
    period: "Jan 2025 - Present",
    location: "Tegal, Indonesia",
    achievements: [
      "Developing a full-stack application with React.js, Node.js, and MongoDB for personal task management.",
      "Implementing authentication, CRUD workflows, and responsive patterns for a seamless cross-device experience.",
      "Collaborating with a team on product planning, delivery, and communication cadence.",
    ],
  },
  {
    title: "Pengadian Masyarakat",
    company: "Rumah Hijau Nursey",
    period: "Aug 2023 - Dec 2023",
    location: "Tegal, Indonesia",
    achievements: [
      "Developed a website for Rumah Hijau Nursery to strengthen their online presence.",
      "Implemented responsive design principles for better accessibility across devices.",
      "Worked closely with stakeholders to translate feedback into practical improvements.",
    ],
  },
]

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.15, once: true })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.14, delayChildren: 0.1 },
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
      id="experience"
      ref={ref}
      className="py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <motion.div className="space-y-6 lg:sticky lg:top-28 lg:self-start" variants={itemVariants}>
            <span className="section-eyebrow">Experience</span>
            <h2 className="font-sans text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
              Systems, teams, and shipped interfaces.
            </h2>
            <p className="text-base leading-8 text-muted-foreground md:text-lg">
              A compact timeline of builds where engineering decisions, stakeholder feedback,
              and responsive UI craft had to meet in the same place.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div className="space-y-5" variants={containerVariants}>
              {experiences.map((experience, index) => (
                <motion.div
                  key={`${experience.title}-${experience.period}`}
                  className="timeline-item"
                  variants={itemVariants}
                >
                  <Card className="agency-surface overflow-hidden py-0 transition-transform duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="grid gap-0 md:grid-cols-[0.72fr_1.28fr]">
                        <div className="border-b border-border/45 bg-background/35 p-6 md:border-b-0 md:border-r">
                          <p className="text-xs uppercase text-muted-foreground">Case 0{index + 1}</p>
                          <h3 className="mt-4 font-sans text-2xl font-black">{experience.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{experience.company}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            <Badge variant="outline">{experience.period}</Badge>
                            <Badge variant="secondary" className="gap-1">
                              <MapPin aria-hidden="true" className="h-3 w-3" />
                              {experience.location}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-4">
                            {experience.achievements.map((achievement) => (
                              <li key={achievement} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                                <ArrowUpRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div id="skills" className="pt-8" variants={itemVariants}>
              <Skills />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
