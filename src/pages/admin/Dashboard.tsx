import { Link } from "react-router-dom";
import { BookOpen, Users, Plus, FileText } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useCourses } from "@/hooks/useCourses";
import { useTeamMembers } from "@/hooks/useTeamMembers";

const Dashboard = () => {
  const { data: courses = [] } = useCourses();
  const { data: teamMembers = [] } = useTeamMembers();

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

  const stats = [
    {
      icon: BookOpen,
      label: "Courses",
      value: courses.length,
      to: "/admin/courses",
      color: "bg-primary",
    },
    {
      icon: FileText,
      label: "Lessons",
      value: totalLessons,
      to: "/admin/courses",
      color: "bg-secondary",
    },
    {
      icon: Users,
      label: "Team Members",
      value: teamMembers.length,
      to: "/admin/team",
      color: "bg-accent",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your CS Club content
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.to}
              className="brutal-card p-6 hover:shadow-[6px_6px_0px_0px] transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl border-[3px] border-foreground ${stat.color} text-primary-foreground flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/courses/new"
            className="brutal-card p-6 flex items-center gap-4 hover:shadow-[6px_6px_0px_0px] transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg border-[3px] border-foreground bg-primary text-primary-foreground flex items-center justify-center">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">Add New Course</p>
              <p className="text-sm text-muted-foreground">
                Create a new course with lessons and slides
              </p>
            </div>
          </Link>
          <Link
            to="/admin/team/new"
            className="brutal-card p-6 flex items-center gap-4 hover:shadow-[6px_6px_0px_0px] transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg border-[3px] border-foreground bg-secondary text-secondary-foreground flex items-center justify-center">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">Add Team Member</p>
              <p className="text-sm text-muted-foreground">
                Add a new member to the team page
              </p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
