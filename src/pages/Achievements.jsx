// src/pages/Achievements.jsx
import { useTranslation } from "react-i18next";
import AchievementCard from "../components/AchievementCards";
import { achievements } from "../components/AchievementData";

export default function Achievements() {
  const { t } = useTranslation();

  return (
    <section
      id="achievements"
      className="from-darkBlue/95 to-darkBlue bg-gradient-to-b py-20 mx-10"
    >
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("achievements.title")}{" "}
            <span className="gradient-text">{t("achievements.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            {t("achievements.description")}
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map(card => (
            <AchievementCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
