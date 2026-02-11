import { useLanguage } from "@/contexts/LanguageContext";

interface TopicBadgeProps {
  topic: string;
  className?: string;
}

const topicColors: Record<string, string> = {
  "Version Control": "bg-topic-git text-foreground",
  Linux: "bg-topic-linux text-foreground",
  "Build Systems": "bg-topic-build text-foreground",
  "Open Source": "bg-topic-opensource text-foreground",
  Other: "bg-topic-other text-foreground",
};

const topicAr: Record<string, string> = {
  "Version Control": "التحكم بالإصدارات",
  Linux: "لينكس",
  "Build Systems": "أنظمة البناء",
  "Open Source": "مصادر مفتوحة",
  Other: "أخرى",
};

export function TopicBadge({ topic, className = "" }: TopicBadgeProps) {
  const { language } = useLanguage();
  const color = topicColors[topic] || topicColors.Other;
  const label = language === "ar" ? topicAr[topic] || topic : topic;

  return (
    <span
      className={`inline-flex items-center rounded-lg border-2 border-foreground px-2.5 py-0.5 text-xs font-bold ${color} ${className}`}
    >
      {label}
    </span>
  );
}
