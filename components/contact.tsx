"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormState } from "@/hooks/useFormState"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { ContactInfo } from "@/types"

const contactInfo: ContactInfo[] = [
  {
    title: "Email",
    value: "boyblanco77@gmail.com",
    link: "mailto:boyblanco77@gmail.com",
  },
  {
    title: "Location",
    value: "Brebes, Indonesia",
    link: "https://maps.google.com/?q=Brebes,Indonesia",
    external: true,
  },
  {
    title: "Phone",
    value: "Available on request",
  },
]

const contactIcons = {
  Email: Mail,
  Location: MapPin,
  Phone: Phone,
} as const

export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true })
  const prefersReducedMotion = useReducedMotion()
  const { status, message, isLoading, handleSubmit } = useFormState({
    action: "https://formspree.io/f/xanoenzo",
  })

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
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-muted/25 py-20 md:py-32"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="grain-overlay absolute inset-0 opacity-60" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <motion.div className="space-y-7" variants={itemVariants}>
            <span className="section-eyebrow">Contact</span>
            <h2 className="font-sans text-4xl font-black leading-tight tracking-normal sm:text-5xl md:text-6xl">
              Get in touch.
            </h2>
            <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Feel free to reach out for collaborations, project inquiries, or just to say hello.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = contactIcons[info.title as keyof typeof contactIcons]

                return (
                  <Card key={info.title} className="border-border/45 bg-background/35 shadow-none">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h3 className="font-sans text-sm font-bold">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="break-words text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            target={info.external ? "_blank" : undefined}
                            rel={info.external ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="agency-surface overflow-hidden py-0">
              <CardContent className="p-5 md:p-6">
                <div className="mb-6 flex flex-col gap-3 border-b border-border/45 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Contact Form</p>
                    <h3 className="mt-2 font-sans text-2xl font-black">Send a message</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full bg-background/35" asChild>
                      <a href="https://github.com/Wildann77" target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden="true" className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-background/35" asChild>
                      <a
                        href="https://www.linkedin.com/in/wildan-haifan-jadid-1820222a8/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin aria-hidden="true" className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-background/35" asChild>
                      <a href="mailto:boyblanco77@gmail.com">
                        <Mail aria-hidden="true" className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </a>
                    </Button>
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" name="name" placeholder="Your name" autoComplete="name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" name="subject" placeholder="What are we building?" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me a bit about your idea, timeline, or team."
                      className="min-h-[180px]"
                      minLength={10}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Button type="submit" className="w-full rounded-full" disabled={isLoading} aria-busy={isLoading}>
                      {isLoading ? "Sending..." : "Send Message"}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Button>
                    {message ? (
                      <p
                        role={status === "error" ? "alert" : "status"}
                        aria-live="polite"
                        className={status === "error" ? "text-sm text-destructive" : "text-sm text-primary"}
                      >
                        {message}
                      </p>
                    ) : null}
                  </div>
                  <noscript>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      Please enable JavaScript to use the form, or email me directly.
                    </p>
                  </noscript>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
