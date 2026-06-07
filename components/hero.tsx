"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Wildann77",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wildan-haifan-jadid-1820222a8/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:boyblanco77@gmail.com",
    icon: Mail,
  },
]

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const reveal = (delay: number, y = 18) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.55, delay, ease: "easeOut" },
  })

  const handleScrollToAbout = () => {
    const element = document.getElementById("about")

    if (!element) {
      return
    }

    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    })
  }

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden bg-background"
    >
      <div className="editorial-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-none px-4 pb-8 pt-10 sm:px-8 md:px-10 lg:px-16">
        <div className="grid min-h-[calc(100dvh-4rem)] grid-rows-[auto_auto_1fr_auto] gap-8 md:hidden">
          <motion.div className="space-y-6" {...reveal(0)}>
            <p className="max-w-[650px] font-sans text-[clamp(1.65rem,2.75vw,3.05rem)] font-medium uppercase leading-[1.12] tracking-normal text-foreground">
              Full stack engineer blending creativity and usability into digital experiences
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon

                return (
                  <Button key={social.label} variant="outline" size="icon" className="rounded-full" asChild>
                    <Link href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="relative ml-auto w-full max-w-[315px]" {...reveal(0.1, 22)}>
            <div className="relative aspect-[1.04/1] overflow-hidden border border-border/25 bg-card shadow-lg">
              <Image
                src="/hero-wildan-portrait.webp"
                alt="Portrait of Wildan Haifan Jadid against a textured stone wall"
                fill
                priority
                sizes="88vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-primary/10 mix-blend-soft-light" />
            </div>
          </motion.div>

          <motion.p className="max-w-[330px] self-end text-base leading-snug text-foreground" {...reveal(0.18)}>
            Currently partnering with teams and collaborating on polished, reliable web products.
          </motion.p>

          <motion.div className="relative" {...reveal(0.26, 26)}>
            <h1 className="bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text font-sans text-[clamp(3.45rem,18vw,6.6rem)] font-black uppercase leading-[0.82] tracking-normal text-transparent">
              Wildan Haifan Jadid
            </h1>
          </motion.div>
        </div>

        <motion.p
          className="absolute left-10 top-[5.4rem] hidden max-w-[620px] font-sans text-[clamp(1.55rem,1.72vw,2.08rem)] font-medium uppercase leading-[1.12] tracking-normal text-foreground md:block lg:left-16 lg:top-[5.7rem]"
          {...reveal(0)}
        >
          Full stack engineer blending creativity and usability into digital experiences
        </motion.p>

        <motion.div
          className="absolute right-10 top-[5.15rem] hidden w-[clamp(17rem,18.2vw,19.75rem)] md:block lg:right-16 lg:top-[5.25rem]"
          {...reveal(0.1, 22)}
        >
          <div className="relative aspect-[1.04/1] overflow-hidden border border-border/25 bg-card shadow-lg">
            <Image
              src="/hero-wildan-portrait.webp"
              alt="Portrait of Wildan Haifan Jadid against a textured stone wall"
              fill
              priority
              sizes="(min-width: 1024px) 20vw, 18rem"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-primary/10 mix-blend-soft-light" />
          </div>
        </motion.div>

        <motion.p
          className="absolute bottom-[34vh] left-10 hidden max-w-[360px] text-[0.98rem] leading-snug text-foreground md:block lg:left-16"
          {...reveal(0.18)}
        >
          Currently partnering with clients
          <br />
          and collaborating with teams worldwide.
        </motion.p>

        <motion.div
          className="absolute right-10 top-[calc(5.15rem+clamp(17rem,18.2vw,19.75rem)+0.9rem)] hidden w-[clamp(17rem,18.2vw,19.75rem)] items-center justify-end gap-2 md:flex lg:right-16 lg:top-[calc(5.25rem+clamp(17rem,18.2vw,19.75rem)+0.9rem)]"
          {...reveal(0.2)}
          aria-label="Social links"
        >
          {socials.map((social) => {
            const Icon = social.icon

            return (
              <Button key={social.label} variant="ghost" size="icon" className="rounded-full bg-background/45 backdrop-blur-xl" asChild>
                <Link href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  <Icon aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              </Button>
            )
          })}
        </motion.div>

        <motion.div
          className="absolute bottom-[5.2rem] left-6 right-6 hidden md:block lg:left-12 lg:right-12 xl:left-16 xl:right-16"
          {...reveal(0.26, 26)}
        >
          <h1 className="bg-gradient-to-r from-foreground via-primary/75 to-foreground bg-clip-text font-sans text-[clamp(3.35rem,7.05vw,9.4rem)] font-black uppercase leading-[0.78] tracking-normal text-transparent whitespace-nowrap">
            Wildan Haifan Jadid
          </h1>
        </motion.div>

        <motion.button
          type="button"
          onClick={handleScrollToAbout}
          aria-label="Scroll to about section"
          className="absolute bottom-5 right-6 hidden items-center gap-2 rounded-full border border-border/55 bg-background/75 px-4 py-2 text-xs font-semibold uppercase text-foreground backdrop-blur-xl transition-colors hover:text-primary md:flex"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: 0.55 }}
        >
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
          Scroll
        </motion.button>

        <Button
          asChild
          className="absolute right-4 top-5 hidden rounded-full px-6 md:inline-flex lg:hidden"
          size="lg"
        >
          <Link href="#contact">
            Get in Touch
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
