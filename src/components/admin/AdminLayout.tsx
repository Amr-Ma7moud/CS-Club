import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/courses", icon: BookOpen, label: "Courses" },
  { to: "/admin/team", icon: Users, label: "Team" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r-[3px] border-foreground flex flex-col transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b-[3px] border-foreground flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg border-[2px] border-foreground bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              CS
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-[3px] border-foreground space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
            <button
              onClick={logout}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b-[3px] border-foreground bg-card flex items-center px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold ml-3">Admin</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
