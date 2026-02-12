import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CourseList from "./pages/admin/CourseList";
import CourseForm from "./pages/admin/CourseForm";
import TeamList from "./pages/admin/TeamList";
import TeamForm from "./pages/admin/TeamForm";
import SettingsPage from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route
                  path="/*"
                  element={
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <div className="flex-1">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/courses" element={<Courses />} />
                          <Route
                            path="/courses/:slug"
                            element={<CourseDetail />}
                          />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                      <Footer />
                    </div>
                  }
                />

                {/* Admin routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses"
                  element={
                    <ProtectedRoute>
                      <CourseList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses/new"
                  element={
                    <ProtectedRoute>
                      <CourseForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses/:id"
                  element={
                    <ProtectedRoute>
                      <CourseForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/team"
                  element={
                    <ProtectedRoute>
                      <TeamList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/team/new"
                  element={
                    <ProtectedRoute>
                      <TeamForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/team/:id"
                  element={
                    <ProtectedRoute>
                      <TeamForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
