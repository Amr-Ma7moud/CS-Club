import { Link } from "react-router-dom";
import { Code2, Github, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const { t } = useLanguage();
  const { data: settings } = useSiteSettings();

  return (
    <footer className="border-t-[3px] border-foreground bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <Code2 className="h-6 w-6 text-primary" />
              CS Club
            </div>
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold mb-3">{t("footer.links")}</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.home")}</Link>
              <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.courses")}</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.about")}</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.contact")}</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-3">{t("footer.social")}</h3>
            <div className="flex gap-3">
              {settings?.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="brutal-btn !px-3 !py-2 bg-card text-foreground">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {settings?.discord && (
                <a href={settings.discord} target="_blank" rel="noopener noreferrer" className="brutal-btn !px-3 !py-2 bg-card text-foreground">
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-foreground/20 mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CS Club. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
