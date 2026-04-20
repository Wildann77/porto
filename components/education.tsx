"use client"

import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Layers3 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const focusAreas = [
  "Web Programming",
  "Mobile Programming",
  "Databases & SQL",
  "Software Engineering",
  "Software Testing",
  "Artificial Intelligence",
]

export default function Education() {
  const { ref, isInView } = useInView({ threshold: 0.15, once: true })
  const prefersReducedMotion = useReducedMotion()

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
      id="education"
      ref={ref}
      className="py-20 md:py-32"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" variants={itemVariants}>
          <div className="space-y-5">
            <span className="section-eyebrow">Education</span>
            <h2 className="font-sans text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
              Education & Foundations.
            </h2>
            <p className="text-base leading-8 text-muted-foreground md:text-lg">
              My academic background in computer engineering, focusing on core software concepts and analytical problem solving.
            </p>
          </div>

          <Card className="agency-surface overflow-hidden py-0">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[0.42fr_0.58fr]">
                <div className="flex min-h-64 flex-col justify-between border-b border-border/45 bg-background/35 p-6 md:border-b-0 md:border-r">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-primary/10 p-4">
                      <GraduationCap aria-hidden="true" className="h-8 w-8 text-primary" />
                    </div>
                    <Layers3 aria-hidden="true" className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Applied Bachelor (D4)</p>
                    <h3 className="mt-3 font-sans text-2xl font-black leading-tight">
                      Informatics Engineering
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-primary">GPA: 3.77 / 4.0</p>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="space-y-3">
                    <p className="text-sm uppercase text-muted-foreground">Universitas Harkat Negeri</p>
                    <p className="text-base leading-8 text-muted-foreground">
                      Studied key foundations of informatics engineering, focusing on building scalable systems, database design, and algorithmic problem solving.
                    </p>
                  </div>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {focusAreas.map((area) => (
                      <div key={area} className="metric-tile flex items-center gap-3">
                        <BookOpen aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}
