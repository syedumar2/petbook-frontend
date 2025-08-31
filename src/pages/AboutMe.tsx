import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function AboutMe() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Intro */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-2">
          <h1 className="text-2xl font-bold">👤 About Me</h1>
          <p>
            Hi, I’m <span className="font-semibold">[Your Name]</span>, a passionate developer exploring the world of
            full-stack development. I enjoy building practical, user-friendly applications and experimenting with
            new technologies.
          </p>
          <p>
            This project — <span className="font-semibold">Pet Adoption Platform</span> — is part of my journey to learn
            and apply real-world concepts like React, Spring Boot, WebSockets, and SQL databases.
          </p>
        </CardContent>
      </Card>

      {/* Tech Interests */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-2">
          <h2 className="text-xl font-semibold">💻 Tech Interests</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Java & Spring Boot for scalable backends</li>
            <li>React & TypeScript for modern frontends</li>
            <li>Exploring AI-powered apps and mobile development</li>
            <li>Databases (MySQL, PostgreSQL) & Cloud deployment</li>
          </ul>
        </CardContent>
      </Card>

      {/* Mission */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-2">
          <h2 className="text-xl font-semibold">🌍 My Mission</h2>
          <p>
            I want to create apps that <span className="font-semibold">solve real-world problems</span>, make technology
            more accessible, and help people connect — whether it’s finding a pet a loving home or making communication
            easier.
          </p>
        </CardContent>
      </Card>

      {/* Links */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">🔗 Links</h2>
          <div className="flex space-x-4">
            <Button variant="outline" asChild>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:yourname@example.com">
                <Mail className="mr-2 h-4 w-4" /> Email
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="shadow-md rounded-2xl border-red-200 bg-red-50">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-red-700">⚠️ Disclaimer</h2>
          <p className="text-sm text-red-600 mt-2">
            This is a learning project. While I strive to make it functional and useful, I’m not responsible for
            external adoption outcomes, third-party communications, or misuse of this platform.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
