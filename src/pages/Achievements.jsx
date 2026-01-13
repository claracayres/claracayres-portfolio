import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AchievementCard from "../components/Cards";
import { API_ENDPOINTS } from "../config/api";

export default function Achievements() {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.ACHIEVEMENTS)
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
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
      className="py-20"
    >
      <div className="container m-auto px-4">
        {/* Título */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("achievements.title")}{" "}
            <span className="gradient-text">{t("achievements.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl">
            {t("achievements.description")}
          </p>
        </div>

        {/* Grid de cards */}
                <div className="lg md:snap-none:overflow-visible flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 pb-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-10">
          {achievements.map((card) => (
            <AchievementCard key={card._id || card.titleKey} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
