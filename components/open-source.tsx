import Link from "next/link"
import { Github, GitPullRequest, MoveUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const contributions = [
  {
    title: "DynamoDB Dashboard",
    description:
      "A web-based dashboard for visualizing and managing DynamoDB tables, with features for querying, filtering, and data manipulation.",
    tags: ["Vue.js", "DynamoDB", "AWS", "Developer Tools"],
    link: "https://github.com/kritish-dhaubanjar/dynamodb-dashboard",
  },
  {
    title: "Dev Auth Chrome Extension",
    description:
      "A Chrome extension to update authentication tokens for testing applications with different user roles on local development environments.",
    tags: ["JavaScript", "Chrome Extension", "Authentication", "Developer Tools"],
    link: "https://github.com/kritish-dhaubanjar/dev-auth-chrome-extension",
  },
  {
    title: "Nginxconfig.io by DigitalOcean",
    description:
      "Contributed to DigitalOcean's open-source NGINX configuration generator, which helps users create optimized NGINX server configurations.",
    tags: ["NGINX", "JavaScript", "DevOps", "Configuration"],
    link: "https://github.com/digitalocean/nginxconfig.io/commits?author=maskeynihal",
  },
]

export default function OpenSource() {
  return (
    <div id="open-source" className="agency-surface rounded-lg p-5 md:p-6">
      <div className="grid gap-5 border-b border-border/45 pb-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div className="space-y-3">
          <span className="section-eyebrow">Open Source</span>
          <h3 className="font-sans text-3xl font-black tracking-normal">Community-side craft</h3>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:justify-self-end">
          Small, useful contributions around developer tools, infrastructure, and practical product workflows.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {contributions.map((contribution, index) => (
          <Card key={contribution.title} className="h-full border-border/45 bg-background/35 shadow-none transition-transform duration-300 hover:-translate-y-1">
            <CardContent className="flex h-full flex-col p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-3">
                  <GitPullRequest aria-hidden="true" className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">PR 0{index + 1}</span>
              </div>
              <h4 className="font-sans text-lg font-bold leading-tight">{contribution.title}</h4>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{contribution.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {contribution.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" asChild className="mt-6 w-full rounded-full bg-background/35">
                <Link href={contribution.link} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" className="h-4 w-4" />
                  View on GitHub
                  <MoveUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
