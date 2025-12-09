// src/components/AchievementCard.jsx
import { useTranslation } from "react-i18next";
import SimpleCarousel from "./Carousel";

const colors = [
  "bg-pink/20 text-pink",
  "bg-purple/20 text-purple",
  "bg-lightPurple/20 text-lightPurple"
];

export default function AchievementCard({ card }) {
  const { t } = useTranslation();

  return (
    <div className="project-card card flex flex-col justify-between overflow-hidden rounded-xl">
      {/* Carrossel */}
      <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden bg-gradient-to-br">
        {card.images && card.images.length > 0 && (
          card.images.length > 1 ? (
            <SimpleCarousel images={card.images} />
          ) : (
            <img src={card.images[0]} alt={t(card.titleKey)} width="100%" />
          )
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <h3 className="text-xl font-semibold">{t(card.titleKey)}</h3>
        <p className="text-gray-400 italic">{card.institution} <br /> {t(card.dateKey)}</p>
        <p className="text-gray-400">{t(card.descKey)}</p>

        {/* Tags com cores em loop */}
        <div className="mb-4 flex flex-wrap gap-2">
          {card.tags.map((tag, i) => {
            const colorClass = colors[i % colors.length];
            return (
              <span
                key={i}
                className={`${colorClass} rounded-full px-3 py-1 text-xs`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <a
          href={card.certificateUrl}
          target="_blank"
          className="text-pink hover:text-white"
        >
          {t("achievements.certificate")}
        </a>
      </div>
    </div>
  );
}
