import { Link } from "react-router-dom";
import { BookOpen, Wrench, Globe, Users, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTeamMembers } from "@/hooks/useTeamMembers";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const About = () => {
  const { t } = useLanguage();
  const { data: teamMembers = [], isLoading } = useTeamMembers();

  const offerings = [
    { icon: BookOpen, title: t("about.offer.courses"), desc: t("about.offer.courses.desc") },
    { icon: Wrench, title: t("about.offer.skills"), desc: t("about.offer.skills.desc") },
    { icon: Globe, title: t("about.offer.os"), desc: t("about.offer.os.desc") },
    { icon: Users, title: t("about.offer.community"), desc: t("about.offer.community.desc") },
  ];

  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("about.subtitle")}</p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="brutal-card p-8 md:p-12 bg-primary text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">{t("about.mission.title")}</h2>
            <p className="text-lg leading-relaxed opacity-90">{t("about.mission.text")}</p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t("about.offer.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                className="brutal-card p-6"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t("about.team.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="brutal-card p-6 h-44 animate-pulse bg-muted" />
                ))
              : teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className="brutal-card p-6 text-center"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="w-16 h-16 rounded-full border-[3px] border-foreground bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    member.name.split(" ").map((n) => n[0]).join("")
                  )}
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <div className="flex justify-center gap-2">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section>
          <div className="brutal-card bg-secondary text-secondary-foreground p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">{t("about.join.title")}</h2>
            <p className="mb-6">{t("about.join.text")}</p>
            <Link to="/contact" className="brutal-btn bg-primary text-primary-foreground">
              {t("about.join.button")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
