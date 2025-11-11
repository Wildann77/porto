import { Card, CardContent } from "@/components/ui/card";
import { Code2, Globe, Server, Users } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Full Stack Development",
      description: "Expertise in JavaScript, TypeScript, React.js, Node.js,",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "Cloud Solutions",
      description: "vercel,vps and for scalable and reliable deployments",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Team Leadership",
      description:
        "lead a team of 5 developers to successfully deliver projects on time",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Collaboration",
      description:
        "Have friends from different countries and cultures to work together effectively",
    },
  ];

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Me
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Software Engineer expertise as a Full Stack Developer,
                specializing in JavaScript, TypeScript, React.js, Node.js
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Skilled in building a good and scalable web application with a
                focus on performance and user experience. Experienced in cloud
                services, team leadership, and global collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
