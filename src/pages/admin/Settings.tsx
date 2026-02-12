import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Settings, Save } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  getSiteSettings,
  updateSiteSettings,
} from "@/lib/firebaseService";
import { toast } from "sonner";

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [discord, setDiscord] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  useEffect(() => {
    (async () => {
      const settings = await getSiteSettings();
      setEmail(settings.email);
      setGithub(settings.github);
      setDiscord(settings.discord);
      setLinkedin(settings.linkedin);
      setTwitter(settings.twitter);
      setFetching(false);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSiteSettings({ email, github, discord, linkedin, twitter });
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  const fields = [
    { label: "Email Address", value: email, set: setEmail, placeholder: "csclub@university.edu", type: "email" },
    { label: "GitHub URL", value: github, set: setGithub, placeholder: "https://github.com/your-org", type: "url" },
    { label: "Discord Invite URL", value: discord, set: setDiscord, placeholder: "https://discord.gg/your-invite", type: "url" },
    { label: "LinkedIn URL", value: linkedin, set: setLinkedin, placeholder: "https://linkedin.com/company/your-club", type: "url" },
    { label: "Twitter / X URL", value: twitter, set: setTwitter, placeholder: "https://twitter.com/your-club", type: "url" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Settings className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">Site Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your club's social links and contact info. These appear on
            the Contact page and Footer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="brutal-card p-6 space-y-4">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-bold mb-1">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-[3px] border-foreground bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="brutal-btn bg-primary text-primary-foreground flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
