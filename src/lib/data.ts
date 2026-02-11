import { Course, TeamMember } from "@/types";

export const courses: Course[] = [
  {
    id: "1",
    title: "Git Fundamentals",
    slug: "git-fundamentals",
    year: 2025,
    topic: "Version Control",
    description:
      "Master the fundamentals of Git version control. Learn how to track changes, collaborate with teams, and manage your codebase like a professional developer.",
    instructor: "Ahmed Hassan",
    slideType: "pdf",
    slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    resources: [
      { label: "Official Git Documentation", url: "https://git-scm.com/doc" },
      { label: "GitHub Guides", url: "https://guides.github.com" },
    ],
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Git",
        slideType: "pdf",
        slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        id: "1-2",
        title: "Branching & Merging",
        slideType: "pdf",
        slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        id: "1-3",
        title: "Collaboration with GitHub",
        slideType: "pdf",
        slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
  },
  {
    id: "2",
    title: "Linux Essentials",
    slug: "linux-essentials",
    year: 2025,
    topic: "Linux",
    description:
      "Get comfortable with the Linux command line. From basic navigation to shell scripting, this course covers everything you need to be productive in a Unix environment.",
    instructor: "Sara Ahmed",
    slideType: "external",
    slideUrl: "https://linuxcommand.org",
    resources: [
      { label: "Linux Command Line Basics", url: "https://linuxcommand.org" },
      { label: "The Linux Documentation Project", url: "https://tldp.org" },
    ],
    lessons: [
      {
        id: "2-1",
        title: "Terminal Basics",
        slideType: "external",
        slideUrl: "https://linuxcommand.org",
      },
      {
        id: "2-2",
        title: "File System & Permissions",
        slideType: "external",
        slideUrl: "https://linuxcommand.org",
      },
      {
        id: "2-3",
        title: "Shell Scripting",
        slideType: "external",
        slideUrl: "https://linuxcommand.org",
      },
    ],
  },
  {
    id: "3",
    title: "Build Systems & Automation",
    slug: "build-systems-automation",
    year: 2025,
    topic: "Build Systems",
    description:
      "Learn to automate your development workflow with modern build systems. From Makefiles to CI/CD pipelines, streamline your projects for maximum efficiency.",
    instructor: "Omar Khaled",
    slideType: "pdf",
    slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    resources: [
      { label: "GNU Make Manual", url: "https://www.gnu.org/software/make/manual/" },
      { label: "CMake Documentation", url: "https://cmake.org/documentation/" },
    ],
    lessons: [
      {
        id: "3-1",
        title: "Introduction to Make",
        slideType: "pdf",
        slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        id: "3-2",
        title: "CMake Basics",
        slideType: "pdf",
        slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
      {
        id: "3-3",
        title: "CI/CD Pipelines",
        slideType: "pdf",
        slideUrl: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      },
    ],
  },
  {
    id: "4",
    title: "Open Source Contribution",
    slug: "open-source-contribution",
    year: 2024,
    topic: "Open Source",
    description:
      "Discover how to find, contribute to, and maintain open source projects. Build your portfolio and make a real impact in the developer community.",
    instructor: "Lina Mahmoud",
    slideType: "external",
    slideUrl: "https://opensource.guide",
    resources: [
      { label: "Open Source Guides", url: "https://opensource.guide" },
      { label: "First Contributions", url: "https://firstcontributions.github.io" },
    ],
    lessons: [
      {
        id: "4-1",
        title: "Finding Projects",
        slideType: "external",
        slideUrl: "https://opensource.guide",
      },
      {
        id: "4-2",
        title: "Making Your First PR",
        slideType: "external",
        slideUrl: "https://opensource.guide",
      },
      {
        id: "4-3",
        title: "Maintaining Projects",
        slideType: "external",
        slideUrl: "https://opensource.guide",
      },
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Ahmed Hassan",
    role: "President",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sara Ahmed",
    role: "Vice President",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Omar Khaled",
    role: "Technical Lead",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Lina Mahmoud",
    role: "Events Coordinator",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
