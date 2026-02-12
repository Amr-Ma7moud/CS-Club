import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User, BookOpen, Calendar, Share2, ExternalLink, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCourseBySlug } from "@/hooks/useCourses";
import { TopicBadge } from "@/components/shared/TopicBadge";
import { YearBadge } from "@/components/shared/YearBadge";
import { SlideViewer } from "@/components/courses/SlideViewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const { data: course, isLoading } = useCourseBySlug(slug);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-10 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="py-20 px-4 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/courses" className="brutal-btn bg-primary text-primary-foreground mt-4 inline-block">
          {t("course.back")}
        </Link>
      </main>
    );
  }

  const currentLesson = course.lessons.find((l) => l.id === activeLesson);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:v=|\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <main className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-foreground">{t("common.home")}</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-foreground">{t("nav.courses")}</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{course.title}</span>
        </nav>

        <Link to="/courses" className="text-sm font-bold text-primary hover:underline mb-4 inline-block">
          {t("course.back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <TopicBadge topic={course.topic} />
                <YearBadge year={course.year} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <User className="h-5 w-5" />
                <span>{course.instructor}</span>
              </div>
              <p className="text-muted-foreground">{course.description}</p>
            </div>

            {/* Slide Viewer */}
            {currentLesson && (
              <SlideViewer
                slideType={currentLesson.slideType}
                slideUrl={currentLesson.slideUrl}
                title={currentLesson.title}
                onClose={() => setActiveLesson(null)}
              />
            )}

            {/* Lessons */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t("course.lessons")}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {course.lessons.map((lesson, i) => (
                  <AccordionItem
                    key={lesson.id}
                    value={lesson.id}
                    className="brutal-card !border-b-[3px] overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="brutal-btn !px-2.5 !py-1 text-xs bg-primary text-primary-foreground !shadow-none">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-start">{lesson.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <button
                        onClick={() => setActiveLesson(lesson.id)}
                        className="brutal-btn bg-primary text-primary-foreground text-sm"
                      >
                        {t("course.viewSlides")}
                      </button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Resources */}
            {course.resources.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t("course.resources")}</h2>
                <div className="space-y-3">
                  {course.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-card p-4 flex items-center gap-3 group"
                    >
                      <ExternalLink className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">
                          {resource.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new URL(resource.url).hostname}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Video */}
            {course.videoUrl && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t("course.video")}</h2>
                <div className="brutal-card overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getVideoId(course.videoUrl)}`}
                      className="w-full h-full"
                      title={course.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="brutal-card p-6 sticky top-24 space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("course.instructor")}</p>
                  <p className="font-bold">{course.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("course.lessonsCount")}</p>
                  <p className="font-bold">{course.lessons.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t("courses.year")}</p>
                  <p className="font-bold">{course.year}</p>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="brutal-btn bg-secondary text-secondary-foreground w-full flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                {copied ? t("course.copied") : t("course.share")}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;
