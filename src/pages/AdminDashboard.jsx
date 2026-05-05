import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCode,
  faLightbulb,
  faSignOutAlt,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

import AdminAchievements from "./AdminAchievements";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";

export default function AdminDashboard({ theme = "dark" }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isDark = theme === "dark";

  const tabs = [
    { id: "projects", label: t("admin.projects"), icon: faCode },
    { id: "achievements", label: t("admin.achievements"), icon: faTrophy },
    { id: "skills", label: t("admin.skills"), icon: faLightbulb },
  ];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden px-4 py- mt-16 transition-colors duration-500 md:px-8 ${
        isDark ? "bg-slate-950 text-white" : "bg-[#f7f4ef] text-slate-950"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_34%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.13),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.15),transparent_34%)]"
        }`}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition hover:-translate-x-1 ${
                isDark
                  ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              {t("admin.backToSite")}
            </button>

            <p
              className={`mb-3 text-xs font-black uppercase tracking-[0.35em] ${
                isDark ? "text-cyan-200/80" : "text-fuchsia-600"
              }`}
            >
              Portfolio CMS
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                {t("admin.title")}
              </span>{" "}
              {t("admin.dashboard")}
            </h1>

            <p
              className={`mt-3 max-w-2xl text-sm leading-6 md:text-base ${
                isDark ? "text-white/55" : "text-slate-600"
              }`}
            >
              {t("admin.managePortfolio")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 py-3 text-sm font-black text-white shadow-xl shadow-red-500/20 transition hover:scale-[1.02] hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            {t("admin.logoutButton")}
          </button>
        </div>

        <div
          className={`mb-8 overflow-x-auto rounded-[1.5rem] border p-2 backdrop-blur-xl ${
            isDark
              ? "border-white/10 bg-white/[0.05]"
              : "border-slate-200 bg-white/75 shadow-lg shadow-slate-200/60"
          }`}
        >
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition ${
                    isActive
                      ? "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 text-white shadow-lg shadow-fuchsia-500/20"
                      : isDark
                        ? "text-white/55 hover:bg-white/10 hover:text-white"
                        : "text-slate-500 hover:bg-slate-950/5 hover:text-slate-950"
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <section
          className={`rounded-[2rem] border p-4 shadow-2xl backdrop-blur-2xl md:p-6 ${
            isDark
              ? "border-white/10 bg-white/[0.04] shadow-black/20"
              : "border-slate-200 bg-white/80 shadow-slate-200/70"
          }`}
        >
          {activeTab === "projects" && (
            <AdminProjects embedded theme={theme} />
          )}

          {activeTab === "achievements" && (
            <AdminAchievements embedded theme={theme} />
          )}

          {activeTab === "skills" && (
            <AdminSkills embedded theme={theme} />
          )}
        </section>
      </div>
    </main>
  );
}