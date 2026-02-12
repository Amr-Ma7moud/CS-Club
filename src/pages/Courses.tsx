import { useState, useMemo } from "react";
import { SearchIcon, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CourseCard } from "@/components/courses/CourseCard";
import { SearchInput } from "@/components/shared/SearchInput";
import { useCourses } from "@/hooks/useCourses";

const topicAr: Record<string, string> = {
  "Version Control": "التحكم بالإصدارات",
  Linux: "لينكس",
  "Build Systems": "أنظمة البناء",
  "Open Source": "مصادر مفتوحة",
  Other: "أخرى",
};

const Courses = () => {
  const { t, language } = useLanguage();
  const { data: courses = [], isLoading } = useCourses();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Derive filter options from actual data
  const years = useMemo(
    () => [...new Set(courses.map((c) => c.year))].sort((a, b) => b - a),
    [courses]
  );

  const topics = useMemo(
    () => [...new Set(courses.map((c) => c.topic))].sort(),
    [courses]
  );

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchYear = !selectedYear || c.year === selectedYear;
      const matchTopic = !selectedTopic || c.topic === selectedTopic;
      return matchSearch && matchYear && matchTopic;
    });
  }, [courses, search, selectedYear, selectedTopic]);

  const hasFilters = search || selectedYear || selectedTopic;

  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("courses.title")}</h1>
          <p className="text-muted-foreground">{t("courses.subtitle")}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {t("courses.showing")} {filtered.length} {t("courses.coursesLabel")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          {years.length > 0 && (
            <select
              value={selectedYear ?? ""}
              onChange={(e) =>
                setSelectedYear(e.target.value ? Number(e.target.value) : null)
              }
              className="px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20stroke%3D%22%23333%22%20stroke-width%3D%222%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-8"
            >
              <option value="">
                {language === "ar" ? "كل السنوات" : "All Years"}
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
          {topics.length > 0 && (
            <select
              value={selectedTopic ?? ""}
              onChange={(e) =>
                setSelectedTopic(e.target.value || null)
              }
              className="px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22%20stroke%3D%22%23333%22%20stroke-width%3D%222%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-8"
            >
              <option value="">
                {language === "ar" ? "كل المواضيع" : "All Topics"}
              </option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {language === "ar" ? topicAr[topic] || topic : topic}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {search && (
              <span className="inline-flex items-center gap-1 rounded-lg border-2 border-foreground bg-muted px-3 py-1 text-xs font-bold">
                "{search}"
                <button onClick={() => setSearch("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {selectedYear && (
              <span className="inline-flex items-center gap-1 rounded-lg border-2 border-foreground bg-muted px-3 py-1 text-xs font-bold">
                {selectedYear}
                <button onClick={() => setSelectedYear(null)}><X className="h-3 w-3" /></button>
              </span>
            )}
            {selectedTopic && (
              <span className="inline-flex items-center gap-1 rounded-lg border-2 border-foreground bg-muted px-3 py-1 text-xs font-bold">
                {language === "ar" ? topicAr[selectedTopic] || selectedTopic : selectedTopic}
                <button onClick={() => setSelectedTopic(null)}><X className="h-3 w-3" /></button>
              </span>
            )}
            <button
              onClick={() => {
                setSearch("");
                setSelectedYear(null);
                setSelectedTopic(null);
              }}
              className="text-xs font-bold text-primary hover:underline"
            >
              {t("courses.clear")}
            </button>
          </div>
        )}

        {/* Course grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="brutal-card p-6 h-48 animate-pulse bg-muted" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="brutal-card p-12 text-center">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">{t("courses.empty")}</h3>
            <p className="text-sm text-muted-foreground">{t("courses.emptyDesc")}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Courses;
