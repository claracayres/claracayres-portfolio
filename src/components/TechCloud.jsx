/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { surface } from "../utils/theme";
const techTools = [
  "React",
  "JavaScript",
  "Tailwind CSS",
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

function TechCloud({ theme, t }) {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-black md:text-5xl">{t("home.tech")}</h2>
      <div className={`mt-8 overflow-hidden rounded-[2rem] border p-6 ${surface(theme)}`}>
        <div className="flex flex-wrap justify-center gap-3">
          {techTools.map((tool, index) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.025 }}
              whileHover={{ y: -8, rotate: index % 2 ? -2 : 2 }}
              className={`rounded-full border px-5 py-3 text-sm font-black ${
                theme === "dark" ? "border-white/10 bg-white/10 text-white/80" : "border-slate-200 bg-white text-slate-700 shadow-sm"
              }`}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechCloud;