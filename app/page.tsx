import type { Metadata } from "next"

import About from "@/components/about"
import Contact from "@/components/contact"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Hero from "@/components/hero"
import Projects from "@/components/projects"

export const metadata: Metadata = {
  title: "Wildan Haifan Jadid | Full Stack Software Engineer",
  description:
    "Portfolio of Wildan Haifan Jadid, a Full Stack Software Engineer based in Brebes, Indonesia, specializing in JavaScript, TypeScript, React.js, Node.js.",
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </div>
  )
}
