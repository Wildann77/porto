export interface NavItem {
  name: string
  href: `#${string}`
}

export interface ExperienceItem {
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
}

export interface ProjectItem {
  title: string
  description: string
  tags: string[]
  codeLink: string
  liveLink?: string
}

export interface ContactInfo {
  title: string
  value: string
  link?: string | null
  external?: boolean
}

export type FormStatus = "idle" | "loading" | "success" | "error"
