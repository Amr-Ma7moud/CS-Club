import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  addCourse,
  updateCourse,
  getCourseById,
} from "@/lib/firebaseService";
import { uploadToCloudinary } from "@/lib/cloudinaryService";
import { useQueryClient } from "@tanstack/react-query";
import type { Lesson, Resource } from "@/types";

const TOPICS = [
  "Version Control",
  "Linux",
  "Build Systems",
  "Open Source",
  "Other",
] as const;

const SLIDE_TYPES = ["pdf", "external", "google-drive"] as const;

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploading, setUploading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("Other");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [slideType, setSlideType] =
    useState<(typeof SLIDE_TYPES)[number]>("pdf");
  const [slideUrl, setSlideUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Load existing course for edit
  useEffect(() => {
    if (!id) return;
    (async () => {
      const course = await getCourseById(id);
      if (!course) {
        navigate("/admin/courses");
        return;
      }
      setTitle(course.title);
      setSlug(course.slug);
      setYear(course.year);
      setTopic(course.topic);
      setDescription(course.description);
      setInstructor(course.instructor);
      setSlideType(course.slideType);
      setSlideUrl(course.slideUrl);
      setVideoUrl(course.videoUrl || "");
      setResources(course.resources);
      setLessons(course.lessons);
      setFetching(false);
    })();
  }, [id, navigate]);

  // Auto-slug from title (only for new courses)
  useEffect(() => {
    if (!isEdit) setSlug(generateSlug(title));
  }, [title, isEdit]);

  const handleSlideUpload = async (
    file: File,
    setter: (url: string) => void
  ) => {
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, "slides");
      setter(result.secure_url);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };



  // Lesson helpers
  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        id: `lesson-${Date.now()}`,
        title: "",
        slideType: "pdf",
        slideUrl: "",
      },
    ]);
  };

  const updateLesson = (index: number, field: keyof Lesson, value: string) => {
    const updated = [...lessons];
    (updated[index] as any)[field] = value;
    setLessons(updated);
  };

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  // Resource helpers
  const addResource = () => {
    setResources([...resources, { label: "", url: "" }]);
  };

  const updateResource = (
    index: number,
    field: keyof Resource,
    value: string
  ) => {
    const updated = [...resources];
    updated[index][field] = value;
    setResources(updated);
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const courseData = {
      title,
      slug,
      year,
      topic,
      description,
      instructor,
      slideType,
      slideUrl,
      ...(videoUrl ? { videoUrl } : {}),
      resources: resources.filter((r) => r.label && r.url),
      lessons: lessons.filter((l) => l.title),
    };

    try {
      if (isEdit) {
        await updateCourse(id, courseData);
      } else {
        await addCourse(courseData as any);
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/admin/courses");
    } catch {
      alert("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Course" : "New Course"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit
              ? "Update course details and lessons"
              : "Create a new course with lessons and slides"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="brutal-card p-6 space-y-4">
            <h2 className="font-bold text-lg">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Git Fundamentals"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-muted text-muted-foreground font-medium"
                  readOnly={!isEdit}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Year *</label>
                <input
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Topic *</label>
                <select
                  value={topic}
                  onChange={(e) =>
                    setTopic(e.target.value as (typeof TOPICS)[number])
                  }
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Instructor *
                </label>
                <input
                  type="text"
                  required
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ahmed Hassan"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Description *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Course description..."
              />
            </div>
          </div>

          {/* Slides */}
          <div className="brutal-card p-6 space-y-4">
            <h2 className="font-bold text-lg">Course Slides</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Slide Type
                </label>
                <select
                  value={slideType}
                  onChange={(e) =>
                    setSlideType(
                      e.target.value as (typeof SLIDE_TYPES)[number]
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pdf">PDF</option>
                  <option value="external">External Link</option>
                  <option value="google-drive">Google Drive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Slide URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={slideUrl}
                    onChange={(e) => setSlideUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://..."
                  />
                  {slideType === "pdf" && (
                    <label className="brutal-btn bg-muted text-foreground cursor-pointer flex items-center gap-1 !px-3">
                      <Upload className="h-4 w-4" />
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleSlideUpload(file, setSlideUrl);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Video URL (optional)
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          {/* Lessons */}
          <div className="brutal-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">
                Lessons ({lessons.length})
              </h2>
              <button
                type="button"
                onClick={addLesson}
                className="brutal-btn bg-primary text-primary-foreground !px-3 !py-1.5 text-sm flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Lesson
              </button>
            </div>

            {lessons.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No lessons yet. Click "Add Lesson" to create one.
              </p>
            )}

            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="border-[2px] border-foreground/20 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">
                    Lesson {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLesson(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) =>
                    updateLesson(index, "title", e.target.value)
                  }
                  placeholder="Lesson title"
                  className="w-full px-4 py-2 rounded-lg border-[2px] border-foreground/30 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <select
                    value={lesson.slideType}
                    onChange={(e) =>
                      updateLesson(index, "slideType", e.target.value)
                    }
                    className="px-4 py-2 rounded-lg border-[2px] border-foreground/30 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pdf">PDF</option>
                    <option value="external">External Link</option>
                    <option value="google-drive">Google Drive</option>
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={lesson.slideUrl}
                      onChange={(e) =>
                        updateLesson(index, "slideUrl", e.target.value)
                      }
                      placeholder="Slide URL"
                      className="flex-1 px-4 py-2 rounded-lg border-[2px] border-foreground/30 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {lesson.slideType === "pdf" && (
                      <label className="brutal-btn bg-muted text-foreground cursor-pointer !px-3 !py-1.5">
                        <Upload className="h-3.5 w-3.5" />
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file)
                              handleSlideUpload(file, (url) =>
                                updateLesson(index, "slideUrl", url)
                              );
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="brutal-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">
                Resources ({resources.length})
              </h2>
              <button
                type="button"
                onClick={addResource}
                className="brutal-btn bg-primary text-primary-foreground !px-3 !py-1.5 text-sm flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Resource
              </button>
            </div>

            {resources.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No resources yet. Click "Add Resource" to create one.
              </p>
            )}

            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={resource.label}
                  onChange={(e) =>
                    updateResource(index, "label", e.target.value)
                  }
                  placeholder="Label"
                  className="flex-1 px-4 py-2 rounded-lg border-[2px] border-foreground/30 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="url"
                  value={resource.url}
                  onChange={(e) =>
                    updateResource(index, "url", e.target.value)
                  }
                  placeholder="https://..."
                  className="flex-1 px-4 py-2 rounded-lg border-[2px] border-foreground/30 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => removeResource(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload indicator */}
          {uploading && (
            <div className="brutal-card bg-primary/10 p-4 flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              <span className="font-medium text-sm">Uploading file to Cloudinary...</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading || uploading}
              className="brutal-btn bg-primary text-primary-foreground flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : null}
              {isEdit ? "Update Course" : "Create Course"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="brutal-btn bg-muted text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CourseForm;
