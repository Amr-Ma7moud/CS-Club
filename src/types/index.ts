export interface Course {
  id: string;
  title: string;
  slug: string;
  year: number;
  topic: "Version Control" | "Linux" | "Build Systems" | "Open Source" | "Other";
  description: string;
  instructor: string;
  slideType: "pdf" | "external" | "google-drive";
  slideUrl: string;
  videoUrl?: string;
  resources: Resource[];
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  slideType: "pdf" | "external" | "google-drive";
  slideUrl: string;
}

export interface Resource {
  label: string;
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  order: number;
  image?: string;
  github?: string;
  linkedin?: string;
}
