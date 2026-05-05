/* eslint-disable no-unused-vars */
import { motion, useReducedMotion } from "framer-motion";
import MagneticCard from "./MagneticCard";
import Eu from "../assets/eu2.jpg";
import { useTranslation } from "react-i18next";

function DeveloperPassport({ theme }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const passportSkills = [
    t("passport.skills.react"),
    t("passport.skills.frontend"),
    t("passport.skills.backend"),
    t("passport.skills.design"),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -5, scale: 0.96 }}
      animate={{
        opacity: 1,
        rotate: reduceMotion ? 0 : 2,
        scale: 1,
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-sm"
    >
      <MagneticCard
        className={`relative overflow-hidden rounded-[2rem] border p-4 shadow-2xl backdrop-blur-2xl ${
          isDark
            ? "border-white/10 bg-white/5 text-white"
            : "border-slate-200 bg-white text-slate-950"
        }`}
      >
        <div className="absolute -inset-3 -z-10 rounded-[2.4rem] bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-lime-300 opacity-25 blur-2xl" />

        <div
          className={`relative overflow-hidden rounded-[1.4rem] border ${
            isDark
              ? "border-white/10 bg-white/10"
              : "border-slate-200 bg-slate-100"
          }`}
        >
          <img
            src={Eu}
            alt="Avatar"
            className="h-80 w-full object-cover object-bottom"
          />
        </div>

        <div className="px-2 pt-5 pb-3">
          <p
            className={`text-xs font-black uppercase tracking-[0.28em] ${
              isDark ? "text-white/45" : "text-slate-500"
            }`}
          >
            {t("passport.role")}
          </p>

          <h2 className="mt-2 text-3xl font-black leading-none">
            Clara Cayres
          </h2>

          <p
            className={`mt-3 text-sm leading-6 ${
              isDark ? "text-white/65" : "text-slate-600"
            }`}
          >
            {t("passport.subtitle")}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {passportSkills.map((skill) => (
              <span
                key={skill}
                className={`rounded-full border px-3 py-1 text-xs font-bold ${
                  isDark
                    ? "border-white/10 bg-white/10 text-white/85"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div
              className={`rounded-2xl p-3 ${
                isDark
                  ? "bg-gradient-to-br from-fuchsia-500/20 to-white/5"
                  : "bg-fuchsia-100"
              }`}
            >
              <p className="text-2xl font-black">2026</p>
              <p
                className={`text-xs ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                {t("passport.stats.career")}
              </p>
            </div>

            <div
              className={`rounded-2xl p-3 ${
                isDark
                  ? "bg-gradient-to-br from-cyan-400/20 to-white/5"
                  : "bg-cyan-100"
              }`}
            >
              <p className="text-2xl font-black">∞</p>
              <p
                className={`text-xs ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                {t("passport.stats.learning")}
              </p>
            </div>
          </div>
        </div>
      </MagneticCard>
    </motion.div>
  );
}

export default DeveloperPassport;