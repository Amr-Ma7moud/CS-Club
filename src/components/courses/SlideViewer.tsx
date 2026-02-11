import { useState } from "react";
import { Maximize2, Minimize2, ExternalLink, Download, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SlideViewerProps {
  slideType: "pdf" | "external" | "google-drive";
  slideUrl: string;
  title: string;
  onClose: () => void;
}

export function SlideViewer({ slideType, slideUrl, title, onClose }: SlideViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useLanguage();

  const getEmbedUrl = () => {
    if (slideType === "google-drive") {
      return slideUrl.replace("/view", "/preview");
    }
    return slideUrl;
  };

  return (
    <div
      className={`${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background p-4"
          : "brutal-card p-4 my-4"
      } flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground truncate">{title}</h3>
        <div className="flex items-center gap-2">
          <a
            href={slideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn bg-muted text-foreground !px-3 !py-1.5 text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          {slideType === "pdf" && (
            <a
              href={slideUrl}
              download
              className="brutal-btn bg-muted text-foreground !px-3 !py-1.5 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="brutal-btn bg-muted text-foreground !px-3 !py-1.5 text-xs"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="brutal-btn bg-accent text-accent-foreground !px-3 !py-1.5 text-xs"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {slideType === "external" ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 brutal-card bg-muted">
          <p className="text-muted-foreground text-sm">{t("course.openNew")}</p>
          <a
            href={slideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn bg-primary text-primary-foreground"
          >
            <ExternalLink className="h-4 w-4 inline me-2" />
            {t("course.openNew")}
          </a>
        </div>
      ) : (
        <iframe
          src={getEmbedUrl()}
          className={`w-full rounded-lg border-2 border-foreground ${
            isFullscreen ? "flex-1" : "h-[50vh] md:h-[60vh]"
          }`}
          title={title}
          allowFullScreen
        />
      )}
    </div>
  );
}
