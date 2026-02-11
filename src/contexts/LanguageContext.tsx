import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.courses": { en: "Courses", ar: "الدورات" },
  "nav.about": { en: "About", ar: "حول" },
  "nav.contact": { en: "Contact", ar: "تواصل" },

  // Hero
  "hero.title": { en: "Level Up Your CS Skills", ar: "طوّر مهاراتك في علوم الحاسوب" },
  "hero.subtitle": {
    en: "CS Club helps CSIT students master essential development tools and contribute to open source",
    ar: "نادي علوم الحاسوب يساعد طلاب تكنولوجيا المعلومات على إتقان أدوات التطوير الأساسية والمساهمة في المصادر المفتوحة",
  },
  "hero.browse": { en: "Browse Courses", ar: "تصفح الدورات" },
  "hero.join": { en: "Join Us", ar: "انضم إلينا" },

  // Stats
  "stats.courses": { en: "4+ Courses", ar: "٤+ دورات" },
  "stats.lessons": { en: "10+ Lessons", ar: "١٠+ دروس" },
  "stats.students": { en: "100+ Students", ar: "١٠٠+ طالب" },
  "stats.opensource": { en: "Open Source", ar: "مفتوح المصدر" },

  // Featured
  "featured.title": { en: "Featured Courses", ar: "الدورات المميزة" },
  "featured.viewAll": { en: "View All Courses", ar: "عرض جميع الدورات" },

  // What you'll learn
  "learn.title": { en: "What You'll Learn", ar: "ماذا ستتعلم" },
  "learn.git.title": { en: "Git & GitHub", ar: "جت و جت هب" },
  "learn.git.desc": { en: "Version control and collaboration", ar: "التحكم بالإصدارات والتعاون" },
  "learn.linux.title": { en: "Linux & Terminal", ar: "لينكس والطرفية" },
  "learn.linux.desc": { en: "Command line mastery", ar: "إتقان سطر الأوامر" },
  "learn.build.title": { en: "Build Systems", ar: "أنظمة البناء" },
  "learn.build.desc": { en: "Automate your workflow", ar: "أتمتة سير عملك" },
  "learn.os.title": { en: "Open Source", ar: "المصادر المفتوحة" },
  "learn.os.desc": { en: "Contribute to real projects", ar: "المساهمة في مشاريع حقيقية" },

  // CTA
  "cta.title": { en: "Ready to start your journey?", ar: "مستعد لبدء رحلتك؟" },
  "cta.button": { en: "Get Started", ar: "ابدأ الآن" },

  // Courses page
  "courses.title": { en: "All Courses", ar: "جميع الدورات" },
  "courses.subtitle": {
    en: "Browse our collection of courses designed to boost your development skills",
    ar: "تصفح مجموعتنا من الدورات المصممة لتعزيز مهاراتك في التطوير",
  },
  "courses.showing": { en: "Showing", ar: "عرض" },
  "courses.coursesLabel": { en: "courses", ar: "دورات" },
  "courses.search": { en: "Search courses...", ar: "ابحث عن دورات..." },
  "courses.year": { en: "Year", ar: "السنة" },
  "courses.topic": { en: "Topic", ar: "الموضوع" },
  "courses.all": { en: "All", ar: "الكل" },
  "courses.clear": { en: "Clear all filters", ar: "مسح جميع الفلاتر" },
  "courses.empty": { en: "No courses found", ar: "لم يتم العثور على دورات" },
  "courses.emptyDesc": {
    en: "Try adjusting your search or filters",
    ar: "حاول تعديل البحث أو الفلاتر",
  },

  // Course detail
  "course.back": { en: "← Back to Courses", ar: "→ العودة إلى الدورات" },
  "course.lessons": { en: "Lessons", ar: "الدروس" },
  "course.viewSlides": { en: "View Slides", ar: "عرض الشرائح" },
  "course.resources": { en: "Resources", ar: "المصادر" },
  "course.video": { en: "Video", ar: "فيديو" },
  "course.instructor": { en: "Instructor", ar: "المحاضر" },
  "course.lessonsCount": { en: "Lessons", ar: "الدروس" },
  "course.share": { en: "Share", ar: "مشاركة" },
  "course.copied": { en: "Link copied!", ar: "تم نسخ الرابط!" },
  "course.openNew": { en: "Open in new tab", ar: "فتح في تبويب جديد" },
  "course.fullscreen": { en: "Fullscreen", ar: "شاشة كاملة" },
  "course.close": { en: "Close", ar: "إغلاق" },
  "course.download": { en: "Download", ar: "تحميل" },

  // About page
  "about.title": { en: "About CS Club", ar: "حول نادي علوم الحاسوب" },
  "about.subtitle": {
    en: "Empowering the next generation of software engineers",
    ar: "تمكين الجيل القادم من مهندسي البرمجيات",
  },
  "about.mission.title": { en: "Our Mission", ar: "رسالتنا" },
  "about.mission.text": {
    en: "We help CSIT students transition into their careers through practical skills, hands-on workshops, and open source contributions. Our goal is to bridge the gap between academic knowledge and industry requirements.",
    ar: "نساعد طلاب تكنولوجيا المعلومات في الانتقال إلى حياتهم المهنية من خلال المهارات العملية وورش العمل التطبيقية والمساهمة في المصادر المفتوحة. هدفنا هو سد الفجوة بين المعرفة الأكاديمية ومتطلبات سوق العمل.",
  },
  "about.offer.title": { en: "What We Offer", ar: "ما نقدمه" },
  "about.offer.courses": { en: "Hands-on Courses", ar: "دورات تطبيقية" },
  "about.offer.courses.desc": { en: "Learn by doing with practical projects", ar: "تعلم بالممارسة مع مشاريع عملية" },
  "about.offer.skills": { en: "Industry Skills", ar: "مهارات مهنية" },
  "about.offer.skills.desc": { en: "Git, Linux, Build Systems, and more", ar: "جت، لينكس، أنظمة البناء، والمزيد" },
  "about.offer.os": { en: "Open Source", ar: "مصادر مفتوحة" },
  "about.offer.os.desc": { en: "Contribute to real-world projects", ar: "المساهمة في مشاريع العالم الحقيقي" },
  "about.offer.community": { en: "Community", ar: "مجتمع" },
  "about.offer.community.desc": { en: "Connect with fellow developers", ar: "تواصل مع مطورين آخرين" },
  "about.team.title": { en: "Meet the Team", ar: "تعرف على الفريق" },
  "about.join.title": { en: "Want to Join?", ar: "تريد الانضمام؟" },
  "about.join.text": { en: "We're always looking for passionate students", ar: "نبحث دائماً عن طلاب متحمسين" },
  "about.join.button": { en: "Join Us", ar: "انضم إلينا" },

  // Contact page
  "contact.title": { en: "Get In Touch", ar: "تواصل معنا" },
  "contact.subtitle": { en: "Have questions? We'd love to hear from you", ar: "لديك أسئلة؟ يسعدنا سماعها" },
  "contact.discord": { en: "Join our community", ar: "انضم لمجتمعنا" },
  "contact.discord.btn": { en: "Join Server", ar: "انضم للسيرفر" },
  "contact.github": { en: "Check our repositories", ar: "تصفح مستودعاتنا" },
  "contact.github.btn": { en: "Visit GitHub", ar: "زيارة جت هب" },
  "contact.email": { en: "Send us a message", ar: "أرسل لنا رسالة" },
  "contact.join.title": { en: "Join CS Club", ar: "انضم لنادي CS" },
  "contact.join.step1": { en: "Follow us on social media", ar: "تابعنا على وسائل التواصل" },
  "contact.join.step2": { en: "Join our Discord server", ar: "انضم لسيرفر Discord" },
  "contact.join.step3": { en: "Attend our events and workshops", ar: "احضر فعالياتنا وورش العمل" },
  "contact.join.step4": { en: "Start learning!", ar: "ابدأ التعلم!" },
  "contact.social.title": { en: "Follow Us", ar: "تابعنا" },
  "contact.faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "contact.faq.q1": { en: "Who can join CS Club?", ar: "من يمكنه الانضمام لنادي CS؟" },
  "contact.faq.a1": {
    en: "Any CSIT student can join! We welcome students from all years and skill levels.",
    ar: "أي طالب في تكنولوجيا المعلومات يمكنه الانضمام! نرحب بالطلاب من جميع السنوات والمستويات.",
  },
  "contact.faq.q2": { en: "Are the courses free?", ar: "هل الدورات مجانية؟" },
  "contact.faq.a2": {
    en: "Yes! All our courses and materials are completely free and open source.",
    ar: "نعم! جميع دوراتنا وموادنا مجانية بالكامل ومفتوحة المصدر.",
  },
  "contact.faq.q3": { en: "How do I access course materials?", ar: "كيف أحصل على مواد الدورات؟" },
  "contact.faq.a3": {
    en: "Simply browse our courses page and click on any course to access slides, videos, and resources.",
    ar: "ببساطة تصفح صفحة الدورات وانقر على أي دورة للوصول إلى الشرائح والفيديوهات والمصادر.",
  },
  "contact.faq.q4": { en: "Can I contribute to the courses?", ar: "هل يمكنني المساهمة في الدورات؟" },
  "contact.faq.a4": {
    en: "Absolutely! Check our GitHub repository for contribution guidelines.",
    ar: "بالتأكيد! تحقق من مستودعنا على جت هب لإرشادات المساهمة.",
  },

  // Footer
  "footer.tagline": {
    en: "Empowering CSIT students with practical skills",
    ar: "تمكين طلاب تكنولوجيا المعلومات بالمهارات العملية",
  },
  "footer.links": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.social": { en: "Social", ar: "التواصل الاجتماعي" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },

  // Course card
  "card.viewCourse": { en: "View Course →", ar: "عرض الدورة ←" },

  // Common
  "common.home": { en: "Home", ar: "الرئيسية" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("cs-club-lang");
    return (saved === "ar" ? "ar" : "en") as Language;
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  useEffect(() => {
    localStorage.setItem("cs-club-lang", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
