// src/components/Cards.jsx
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode } from "@fortawesome/free-solid-svg-icons";
import SimpleCarousel from "./Carousel";

const colors = [
  "bg-pink/20 text-pink",
  "bg-purple/20 text-purple",
  "bg-lightPurple/20 text-lightPurple",
];

// Componente para Achievement Cards
export function AchievementCard({ card }) {
  const { t } = useTranslation();

  return (
    <div className="card w-[90vw] max-w-sm shrink-0 snap-center">
      {/* Carrossel */}
      <div className="items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br">
        {card.images &&
          card.images.length > 0 &&
          (card.images.length > 1 ? (
            <SimpleCarousel images={card.images} />
          ) : (
            <img src={card.images[0]} alt={t(card.titleKey)} width="100%" />
          ))}
      </div>

      {/* Conteúdo do card */}
      <div className="flex h-fit flex-1 flex-col justify-between p-6">
        <h3 className="text-xl font-semibold">{t(card.titleKey)}</h3>
        <p className="font-medium italic">
          {card.institution} <br /> {t(card.dateKey)}
        </p>
        <p>{t(card.descKey)}</p>

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
          className="text-pink hover:text-gray-800 dark:hover:text-white"
        >
          {t("achievements.certificate")}
        </a>
      </div>
    </div>
  );
}

// Componente para Project Cards
export function ProjectCard({ project }) {
  const { t } = useTranslation();

  const getTitle = (project) => {
    return t(project.titleKey) !== project.titleKey
      ? t(project.titleKey)
      : project.title?.[t("lang")] ||
          project.title?.pt ||
          project.title?.en ||
          project.titleKey;
  };

  const getDescription = (project) => {
    return t(project.descKey) !== project.descKey
      ? t(project.descKey)
      : project.description?.[t("lang")] ||
          project.description?.pt ||
          project.description?.en ||
          project.descKey;
  };

  return (
    <div className="card w-[90vw] max-w-sm shrink-0 snap-center">
      {/* Carrossel de imagens */}
      <div className="from-pink to-purple flex h-70 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br">
        {project.images &&
          project.images.length > 0 &&
          (project.images.length > 1 ? (
            <SimpleCarousel images={project.images} />
          ) : (
            <img
              src={project.images[0]}
              alt={getTitle(project)}
              className="h-full w-full object-cover"
            />
          ))}
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <h3 className="text-xl font-semibold">{getTitle(project)}</h3>
        <p className="mt-2 text-gray-400">{getDescription(project)}</p>

        {/* Technologies Tags com cores alternadas */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-4 mb-4 flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => {
              const colorClass = colors[index % colors.length];
              return (
                <span
                  key={index}
                  className={`${colorClass} rounded-full px-3 py-1 text-xs`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        )}

        {/* Project Tags com cores alternadas */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag, index) => {
              const colorClass = colors[index % colors.length];
              return (
                <span
                  key={index}
                  className={`${colorClass} rounded-full px-3 py-1 text-xs`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-2 flex gap-4">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink flex items-center gap-2 hover:text-gray-800 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faEye} />
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple flex items-center gap-2 hover:text-gray-800 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faCode} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Exportação padrão para manter compatibilidade
export default AchievementCard;
