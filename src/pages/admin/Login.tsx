import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const { login, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");

  if (user) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
      setMode("login");
    } catch {
      setError("Failed to send reset email. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="brutal-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl border-[3px] border-foreground bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Admin Login" : "Reset Password"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login"
              ? "CS Club Dashboard"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="brutal-card bg-destructive/10 border-destructive text-destructive p-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@csclub.edu"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutal-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("reset");
              }}
              className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && (
              <div className="brutal-card bg-destructive/10 border-destructive text-destructive p-3 text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="reset-email" className="block text-sm font-bold mb-1">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@csclub.edu"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutal-btn bg-primary text-primary-foreground w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                "Send Reset Link"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("login");
              }}
              className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors font-medium flex items-center justify-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to login
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Login;
