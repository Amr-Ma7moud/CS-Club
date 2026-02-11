import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { key: "nav.home", path: "/" },
  { key: "nav.courses", path: "/courses" },
  { key: "nav.about", path: "/about" },
  { key: "nav.contact", path: "/contact" },
];

export function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b-[3px] border-foreground bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Code2 className="h-7 w-7 text-primary" />
          <span>CS Club</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                location.pathname === link.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="brutal-btn !px-3 !py-1.5 text-xs bg-secondary text-secondary-foreground"
          >
            {language === "en" ? "AR" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="brutal-btn !px-3 !py-1.5 bg-card text-foreground"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden brutal-btn !px-3 !py-1.5 bg-card text-foreground">
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "right" : "left"} className="border-[3px] border-foreground bg-background">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-bold text-xl">
                  <Code2 className="h-6 w-6 text-primary" />
                  CS Club
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl font-semibold border-2 border-foreground transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
