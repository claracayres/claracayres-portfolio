import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { AchievementCard } from "../components/Cards";
import { API_ENDPOINTS } from "../config/api";

export default function Achievements() {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.ACHIEVEMENTS);
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error("Erro ao buscar conquistas:", error);
    } finally {
      setLoading(false);
    }
  };
  // Scrollspy for carousel indicators
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // 60% visível
      },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [achievements]);
  return (
    <section id="achievements" className="py-20">
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
        {isLoading ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando conquistas...</p>
          </div>
        ) : (
          <div className="relative mx-auto w-full max-w-sm lg:max-w-7xl">
            <div
              ref={containerRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-6 lg:snap-none lg:flex-wrap lg:justify-center lg:gap-10 lg:overflow-visible"
            >
              {achievements.map((achievement, index) => (
                <div
                  key={achievement._id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className="w-full max-w-sm flex-none snap-center"
                >
                  <div className="transition-transform duration-300 lg:hover:scale-105">
                    <AchievementCard card={achievement} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2 lg:hidden">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    itemRefs.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                    })
                  }
                  className={`h-2 w-2 rounded-full transition-all ${
                    activeIndex === index ? "bg-pink w-4" : "bg-gray-400/40"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
