import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useCourses } from "@/hooks/useCourses";
import { toast } from "sonner";
import { deleteCourse } from "@/lib/firebaseService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const CourseList = () => {
  const { data: courses = [], isLoading } = useCourses();
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteCourse(id);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    } catch (err) {
      toast.error("Failed to delete course");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-muted-foreground mt-1">
              Manage all courses and their lessons
            </p>
          </div>
          <Link
            to="/admin/courses/new"
            className="brutal-btn bg-primary text-primary-foreground flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="brutal-card p-6 h-24 animate-pulse bg-muted"
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="brutal-card p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">No courses yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first course to get started
            </p>
            <Link
              to="/admin/courses/new"
              className="brutal-btn bg-primary text-primary-foreground inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="brutal-card p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold truncate">{course.title}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded border-[2px] border-foreground bg-muted">
                      {course.year}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded border-[2px] border-foreground bg-primary/10 text-primary">
                      {course.topic}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.lessons.length} lessons · {course.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/admin/courses/${course.id}`}
                    className="brutal-btn bg-muted text-foreground !px-3 !py-2"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id, course.title)}
                    disabled={deleting === course.id}
                    className="brutal-btn bg-destructive/10 text-destructive !px-3 !py-2 disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === course.id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-destructive border-t-transparent rounded-full" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CourseList;
