import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import OpenSource from "./open-source";
import { title } from "process";
import { Description } from "@headlessui/react";

export default function Projects() {
  const projects = [
    {
      title: "Movie App",
      description:
        "A web application that allows users to browse and search for movies using the Rset API. Built with React.js, Tailwind CSS, and Axios.",
      tags: ["JavaScript", "React.js", "Tailwind CSS", "Rest API"],
      codeLink: "https://github.com/Wildann77/MovieApp",
      liveLink: "https://movie-app-nu-green.vercel.app/",
    },
    {
      title: "SocialDigtial",
      description:
        "A web application social media platform that allows users to connect, share content, and interact with each other. Built with NextJs",
      tags: ["JavaScript", "Next.js", "Tailwind CSS", "Firebase"],
      codeLink: "https://github.com/Wildann77/SocialDigital",
      liveLink: "https://social-digital.vercel.app/",
    },
    {
      title: "Ppm Rumah Hijau",
      description:
        "a simple e-commerce website for selling plants and gardening supplies.",
      tags: ["JavaScript", "React.js", "CSS", "Firebase"],
      codeLink: "https://github.com/Wildann77/ppm_rumah_hijau",
      liveLink: "https://ppm-rumah-hijau.vercel.app/",
    },
    {
      title: "Project Management Mern",
      description:
        "A web application that allows users to manage their projects using the Rset API. Built with React.js, Tailwind CSS, and Axios.",
      tags: ["JavaScript", "React.js", "Tailwind CSS", "Rest API"],
      codeLink: "https://github.com/Wildann77/project_management_mern",
      liveLink: "https://project-management-mern-gamma.vercel.app/",
    },
    {
      title: "E-commerce Mern",
      description: "a web application that allows users to browse and purchase products using the Rset API. Built with React.js, Tailwind CSS, and Axios.",
      tags: ["JavaScript", "React.js", "Tailwind CSS", "Rest API"],
      codeLink: "https://github.com/Wildann77/E-Commerce_Mern",
      liveLink: "https://e-commerce-mern-kohl.vercel.app/",
    },
    {
      title: "Mern Chat",
      description: "A web application that allows users to chat with each other using the Rset API. Built with React.js, Tailwind CSS, and Axios.",
      tags: ["JavaScript", "React.js", "Tailwind CSS", "Rest API"],
      codeLink: "https://github.com/Wildann77/mern_chat",
      liveLink: "https://mern-chat-khaki-one.vercel.app/",
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my personal and professional projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="project-content flex-1 flex flex-col p-5">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">
                      {project.description}
                    </p>
                    <div className="project-tags mt-3">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links mt-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-1 h-4 w-4" /> Code
                        </Link>
                      </Button>
                      {project.liveLink && (
                        <Button size="sm" variant="outline" asChild>
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-1 h-4 w-4" /> Live
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Include Open Source section directly under Projects */}
          <div className="mt-20">
            {/* <OpenSource /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
