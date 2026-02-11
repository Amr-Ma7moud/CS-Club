import { Link } from "react-router-dom";
import { BookOpen, Users, Code, Terminal, GitBranch, Wrench, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: BookOpen, label: t("stats.courses") },
    { icon: Terminal, label: t("stats.lessons") },
    { icon: Users, label: t("stats.students") },
    { icon: Globe, label: t("stats.opensource") },
  ];

  const features = [
    { icon: GitBranch, title: t("learn.git.title"), desc: t("learn.git.desc") },
    { icon: Terminal, title: t("learn.linux.title"), desc: t("learn.linux.desc") },
    { icon: Wrench, title: t("learn.build.title"), desc: t("learn.build.desc") },
    { icon: Code, title: t("learn.os.title"), desc: t("learn.os.desc") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/courses" className="brutal-btn bg-primary text-primary-foreground text-base">
              {t("hero.browse")}
            </Link>
            <Link to="/contact" className="brutal-btn bg-card text-foreground text-base">
              {t("hero.join")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="brutal-card p-6 text-center"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <p className="font-bold text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("featured.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/courses" className="brutal-btn bg-primary text-primary-foreground">
              {t("featured.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("learn.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="brutal-card p-6 text-center"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <f.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="brutal-card bg-primary text-primary-foreground p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
            <Link to="/courses" className="brutal-btn bg-secondary text-secondary-foreground text-base inline-block">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
