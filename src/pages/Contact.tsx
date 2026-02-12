import { MessageCircle, Github, Mail, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const { t } = useLanguage();
  const { data: settings, isLoading } = useSiteSettings();

  const contacts = [
    {
      icon: MessageCircle,
      title: "Discord",
      desc: t("contact.discord"),
      btn: t("contact.discord.btn"),
      url: settings?.discord || "#",
      color: "bg-[hsl(235,86%,65%)]",
      show: !!settings?.discord,
    },
    {
      icon: Github,
      title: "GitHub",
      desc: t("contact.github"),
      btn: t("contact.github.btn"),
      url: settings?.github || "#",
      color: "bg-foreground text-background",
      show: !!settings?.github,
    },
    {
      icon: Mail,
      title: "Email",
      desc: t("contact.email"),
      btn: settings?.email || "Email",
      url: settings?.email ? `mailto:${settings.email}` : "#",
      color: "bg-primary",
      show: !!settings?.email,
    },
  ];

  const steps = [
    t("contact.join.step1"),
    t("contact.join.step2"),
    t("contact.join.step3"),
    t("contact.join.step4"),
  ];

  const faqs = [
    { q: t("contact.faq.q1"), a: t("contact.faq.a1") },
    { q: t("contact.faq.q2"), a: t("contact.faq.a2") },
    { q: t("contact.faq.q3"), a: t("contact.faq.a3") },
    { q: t("contact.faq.q4"), a: t("contact.faq.a4") },
  ];

  const socials = [
    { icon: Github, url: settings?.github, label: "GitHub" },
    { icon: MessageCircle, url: settings?.discord, label: "Discord" },
    { icon: Linkedin, url: settings?.linkedin, label: "LinkedIn" },
    { icon: Twitter, url: settings?.twitter, label: "Twitter" },
  ].filter((s) => !!s.url);

  if (isLoading) {
    return (
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contacts.filter((c) => c.show).map((c, i) => (
            <div key={i} className="brutal-card p-6 text-center">
              <div className={`w-14 h-14 rounded-xl border-[3px] border-foreground ${c.color} text-primary-foreground flex items-center justify-center mx-auto mb-4`}>
                <c.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-lg mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn bg-primary text-primary-foreground text-sm inline-block"
              >
                {c.btn}
              </a>
            </div>
          ))}
        </div>

        {/* How to Join */}
        <section className="mb-16">
          <div className="brutal-card p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">{t("contact.join.title")}</h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="brutal-btn !px-3 !py-1.5 bg-primary text-primary-foreground text-sm font-bold !shadow-none flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-medium">{step}</p>
                </div>
              ))}
            </div>
            {settings?.discord && (
              <a
                href={settings.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn bg-primary text-primary-foreground mt-8 inline-block"
              >
                {t("contact.discord.btn")}
              </a>
            )}
          </div>
        </section>

        {/* Social Links */}
        {socials.length > 0 && (
          <section className="mb-16 text-center">
            <h2 className="text-2xl font-bold mb-6">{t("contact.social.title")}</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn bg-card text-foreground !px-6 !py-4 flex flex-col items-center gap-2"
                >
                  <s.icon className="h-8 w-8" />
                  <span className="text-xs font-bold">{s.label}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">{t("contact.faq.title")}</h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="brutal-card !border-b-[3px] overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline font-bold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
