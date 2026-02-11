import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Course } from "@/types";
import { TopicBadge } from "@/components/shared/TopicBadge";
import { YearBadge } from "@/components/shared/YearBadge";
import { useLanguage } from "@/contexts/LanguageContext";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { t } = useLanguage();

  return (
    <Link to={`/courses/${course.slug}`} className="block group">
      <div className="brutal-card p-6 h-full flex flex-col gap-3 bg-card">
        <div className="flex flex-wrap gap-2">
          <TopicBadge topic={course.topic} />
          <YearBadge year={course.year} />
        </div>
        <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {course.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t-2 border-foreground/20">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {course.instructor}
          </span>
          <span className="text-sm font-bold text-primary">
            {t("card.viewCourse")}
          </span>
        </div>
      </div>
    </Link>
  );
}
