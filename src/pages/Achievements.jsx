import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import AchievementCard from "../components/AchievementCards";
import { API_ENDPOINTS } from "../config/api";

export default function Achievements() {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.ACHIEVEMENTS)
      .then((res) => {
        setAchievements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar achievements", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-300">
        Carregando...
      </section>
    );
  }

  return (
    <section
      id="achievements"
      className="from-darkBlue/95 to-darkBlue mx-10 bg-gradient-to-b py-20"
    >
      <div className="container m-auto px-4">
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),min(350px,100%)))] place-content-center gap-8">
          {achievements.map((card) => (
            <AchievementCard key={card._id || card.titleKey} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
