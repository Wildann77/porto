"use client"

import { motion } from "framer-motion"
import { Code2, Globe, Layers3, Server, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const features = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive, modern user interfaces using React, TypeScript, and Tailwind CSS.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Developing robust APIs and handling database integrations using Node.js and Express.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working efficiently in team environments to deliver high-quality, practical features.",
  },
  {
    icon: Globe,
    title: "Adaptability",
    description: "Quick to learn new tools and implement technical solutions for diverse product requirements.",
  },
]

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.15, once: true })
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
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-muted/25 py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="grain-overlay absolute inset-0 opacity-55" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div className="space-y-6" variants={itemVariants}>
            <span className="section-eyebrow">About</span>
            <h2 className="font-sans text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
              Building clean code and thoughtful designs.
            </h2>
            <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              I design and build functional web applications. Focused on clean code, responsive interfaces, and practical technical solutions.
            </p>
          </motion.div>

          <motion.div className="agency-surface rounded-lg p-5 md:p-6" variants={itemVariants}>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon

                return (
                  <Card key={feature.title} className="border-border/45 bg-background/35 shadow-none transition-transform duration-300 hover:-translate-y-1">
                    <CardContent className="space-y-5 p-5">
                      <div className="flex items-center justify-between">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Icon aria-hidden="true" className="h-6 w-6 text-primary" />
                        </div>
                        <Layers3 aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-sans text-xl font-bold">{feature.title}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
