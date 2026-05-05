/* eslint-disable no-unused-vars */
import PageShell from "../layouts/PageShell";
import SkillListCard from "../components/SkillListCard";
import { surface, mutedText } from "../utils/theme";
import { motion } from "framer-motion";
import Icon from "../components/Icons";
import ResumeButton from "../components/ResumeButton";
import { useTranslation } from "react-i18next";

function AboutPage({ theme }) {
  const { t } = useTranslation();

  const softSkillsData = t("about.softSkills", { returnObjects: true });
  const hardSkillsData = t("about.hardSkills", { returnObjects: true });
  const timelineData = t("about.timeline", { returnObjects: true });

  const softSkills = Array.isArray(softSkillsData) ? softSkillsData : [];
  const hardSkills = Array.isArray(hardSkillsData) ? hardSkillsData : [];
  const timeline = Array.isArray(timelineData) ? timelineData : [];

  const aboutSections = [
    { title: t("about.who"), text: t("about.whoText"), icon: "user" },
    { title: t("about.origin"), text: t("about.originText"), icon: "globe" },
    {
      title: t("about.objective"),
      text: t("about.objectiveText"),
      icon: "target",
    },
    {
      title: t("about.freetime"),
      text: t("about.freetimeText"),
      icon: "sparkles",
    },
  ];

  const techTools = [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Styled Components",
    "HTML5",
    "CSS3",
    "Python",
    "Flask",
    "Django",
    "SQL",
    "MongoDB",
    "Docker",
    "GitHub",
    "Vite",
    "Figma",
    "Vercel",
    "REST APIs",
    "SEO",
    "UI/UX",
  ];

  return (
    <PageShell
      eyebrow={t("about.eyebrow")}
      title={t("about.title")}
      theme={theme}
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <a
          href="https://www.linkedin.com/in/maria-clara-cayres-de-almeida"
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-4 text-sm font-bold transition hover:scale-105 ${surface(
            theme
          )}`}
        >
          <Icon name="linkedin" size={18} /> LinkedIn
        </a>

        <a
          href="https://github.com/claracayres"
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-4 text-sm font-bold transition hover:scale-105 ${surface(
            theme
          )}`}
        >
          <Icon name="github" size={18} /> GitHub
        </a>

        <a
          href="mailto:clara.cayres1205@gmail.com"
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-4 text-sm font-bold transition hover:scale-105 ${surface(
            theme
          )}`}
        >
          <Icon name="mail" size={18} /> Email
        </a>

        <ResumeButton t={t} theme={theme} />
      </div>

      <div className="space-y-8">
        <section className="grid gap-5 md:grid-cols-2">
          {aboutSections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`relative overflow-hidden rounded-[2rem] border p-6 md:p-7 ${surface(
                theme
              )}`}
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 blur-3xl" />

              <div className="relative">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white">
                  <Icon name={section.icon} size={18} />
                </div>

                <h3 className="text-2xl font-black md:text-3xl">
                  {section.title}
                </h3>

                <p className={`mt-4 text-base leading-8 ${mutedText(theme)}`}>
                  {section.text}
                </p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <SkillListCard
            title={t("about.soft")}
            items={softSkills}
            theme={theme}
            icon="star"
          />

          <SkillListCard
            title={t("about.hard")}
            items={hardSkills}
            theme={theme}
            icon="code"
          />
        </section>

        <section
          className={`rounded-[2rem] border p-6 md:p-8 ${surface(theme)}`}
        >
          <div>
            <p className="mb-2 text-sm font-black tracking-[0.3em] text-fuchsia-400 uppercase">
              Timeline
            </p>

            <h3 className="text-3xl font-black md:text-4xl">
              {t("about.journey")}
            </h3>
          </div>

          <div className="relative mt-10">
            <div className="absolute top-6 bottom-6 left-6 w-px bg-gradient-to-b from-fuchsia-500 via-cyan-400 to-fuchsia-500" />

            <div className="grid gap-5">
              {timeline.length > 0 ? (
                timeline.map((item, index) => (
                  <motion.div
                    key={`${item}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: index * 0.06 }}
                    className="relative grid grid-cols-[48px_1fr] gap-6"
                  >
                    <div className="relative z-10 flex justify-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-sm font-black text-white shadow-[0_0_30px_rgba(217,70,239,0.4)]">
                        {index + 1}
                      </div>
                    </div>

                    <div
                      className={`relative rounded-[1.5rem] border p-5 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 md:p-6 ${surface(
                        theme
                      )}`}
                    >
                      <div
                        className={`absolute top-6 -left-[7px] h-3.5 w-3.5 rotate-45 border-b border-l ${
                          theme === "dark"
                            ? "border-white/10 bg-[#1f2635]"
                            : "border-slate-200 bg-white"
                        }`}
                      />

                      <p
                        className={`leading-8 font-semibold ${mutedText(theme)}`}
                      >
                        {item}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className={mutedText(theme)}>
                  Timeline ainda não cadastrada.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          className={`rounded-[2rem] border p-6 md:p-8 ${surface(theme)}`}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-black tracking-[0.3em] text-cyan-400 uppercase">
              Stack
            </p>
            <h3 className="text-3xl font-black md:text-4xl">
              {t("about.technical")}
            </h3>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {techTools.map((tool) => (
              <span
                key={tool}
                className={`rounded-full border px-4 py-2 text-sm font-bold ${
                  theme === "dark"
                    ? "border-white/10 bg-white/10 text-white/75"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

export default AboutPage;
