import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faTrophy,
  faCode,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import AdminAchievements from "./AdminAchievements";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("achievements");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const tabs = [
    { id: "achievements", label: t("admin.achievements"), icon: faTrophy },
    { id: "projects", label: t("admin.projects"), icon: faCode },
    { id: "skills", label: t("admin.skills"), icon: faLightbulb },
  ];

  return (
    <div className="bg-darkBlue min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header com Tabs e Logout */}
        <div className="mb-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-4xl font-bold">
                <span className="gradient-text">{t("admin.title")}</span> {t("admin.dashboard")}
              </h1>
              <p className="text-gray-400">{t("admin.managePortfolio")}</p>
            </div>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white transition-all hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
                {t("admin.logoutButton")}
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? "btn-gradient text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {activeTab === "achievements" && <AdminAchievements embedded />}
          {activeTab === "projects" && <AdminProjects embedded />}
          {activeTab === "skills" && <AdminSkills embedded />}
        </div>
      </div>
    </div>
  );
}
