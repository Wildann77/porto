"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact Me", href: "#contact" },
]

function determineActiveSection() {
  const sections = navItems.map((item) => item.href.substring(1))
  const allSections = [...sections, "open-source", "skills"]

  for (let i = allSections.length - 1; i >= 0; i -= 1) {
    const section = document.getElementById(allSections[i])

    if (section) {
      const rect = section.getBoundingClientRect()

      if (rect.top <= 150 && rect.bottom >= 150) {
        const sectionId = allSections[i]

        if (sectionId === "open-source") return "projects"
        if (sectionId === "skills") return "experience"
        if (!sections.includes(sectionId)) return "home"

        return sectionId
      }
    }
  }

  return "home"
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 10 : false
  )
  const [activeSection, setActiveSection] = useState(() =>
    typeof document !== "undefined" ? determineActiveSection() : "home"
  )

  const handleScrollState = useCallback(() => {
    setScrolled(window.scrollY > 10)
    setActiveSection(determineActiveSection())
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScrollState)
    const frame = window.requestAnimationFrame(handleScrollState)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", handleScrollState)
    }
  }, [handleScrollState])

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault()
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(targetId)

      if (isOpen) {
        setIsOpen(false)
      }
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-[999] w-full transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out",
        scrolled
          ? "bg-background/78 shadow-sm backdrop-blur-xl"
          : "bg-background/62 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center" aria-label="Go to homepage">
          <span className="text-xs uppercase text-muted-foreground transition-colors group-hover:text-primary">
            Wildan
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-full border border-border/45 bg-background/58 p-1 shadow-sm backdrop-blur-xl transition-[background-color,border-color] duration-500 ease-out md:flex"
        >
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1)

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative"
              >
                {isActive ? (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                ) : null}
                <Link
                  href={item.href}
                  onClick={(event) => scrollToSection(event, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex rounded-full px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            className="rounded-full bg-background/55 backdrop-blur-xl transition-[background-color,border-color] duration-300"
          >
            <motion.span
              initial={false}
              animate={isOpen ? "open" : "closed"}
              variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </motion.span>
          </Button>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        className="overflow-hidden md:hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 pb-4 md:px-6">
          <nav
            aria-label="Main navigation"
            className="agency-surface flex flex-col gap-2 rounded-lg p-3"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(event) => scrollToSection(event, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
