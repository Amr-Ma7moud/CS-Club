import { useState, useMemo } from "react";
import { SearchIcon, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CourseCard } from "@/components/courses/CourseCard";
import { SearchInput } from "@/components/shared/SearchInput";
import { courses } from "@/lib/data";

const years = [2024, 2025];
const topics = ["Version Control", "Linux", "Build Systems", "Open Source"] as const;

const topicAr: Record<string, string> = {
  "Version Control": "التحكم بالإصدارات",
  Linux: "لينكس",
  "Build Systems": "أنظمة البناء",
  "Open Source": "مصادر مفتوحة",
};

const Courses = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
  }, [search, selectedYear, selectedTopic]);

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
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput value={search} onChange={setSearch} />
          <div className="flex flex-wrap gap-2">
            {/* Year filters */}
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                className={`brutal-btn !px-3 !py-1.5 text-xs ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground"
                }`}
              >
                {year}
              </button>
            ))}
            {/* Topic filters */}
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                className={`brutal-btn !px-3 !py-1.5 text-xs ${
                  selectedTopic === topic
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground"
                }`}
              >
                {language === "ar" ? topicAr[topic] : topic}
              </button>
            ))}
          </div>
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
                {language === "ar" ? topicAr[selectedTopic] : selectedTopic}
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
        {filtered.length > 0 ? (
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
