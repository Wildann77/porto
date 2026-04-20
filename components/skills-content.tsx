import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const skillCategories = [
  {
    category: "Frontend",
    skills: ["JavaScript", "TypeScript", "React.js", "HTML/CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "PHP", "Laravel", "Express.js", "RESTful APIs"],
  },
  {
    category: "Database",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["GitHub Actions", "Vercel", "VPS"],
  },
  {
    category: "Tools & Methods",
    skills: ["Git", "Agile", "Scrum", "JIRA", "Figma"],
  },
  {
    category: "Exploration",
    skills: ["Python"],
  },
]

export default function SkillsContent() {
  return (
    <div className="agency-surface rounded-lg p-5 md:p-6">
      <div className="flex flex-col gap-3 border-b border-border/45 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="section-eyebrow">Skills</span>
          <h3 className="font-sans text-3xl font-black tracking-normal">Technical Skills</h3>
        </div>
        <p className="max-w-md text-sm leading-7 text-muted-foreground">
          A summary of languages, frameworks, databases, and tools I use to build applications.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => (
          <div key={category.category} className="skill-card">
            <Card className="h-full border-border/45 bg-background/35 shadow-none">
              <CardContent className="p-5">
                <h4 className="font-sans text-lg font-bold">{category.category}</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
