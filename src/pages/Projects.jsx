import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";
import SimpleCarousel from "../components/Carousel";

const colors = [
  "bg-pink/20 text-pink",
  "bg-purple/20 text-purple",
  "bg-lightPurple/20 text-lightPurple",
];

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.PROJECTS);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="projects"
      className="from-darkBlue/95 to-darkBlue mx-10 bg-gradient-to-b py-20"
    >
      <div className="container m-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("projects.title")}{" "}
            <span className="gradient-text">{t("projects.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            {t("projects.description")}
          </p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando projetos...</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex flex-col card w-full justify-between max-w-sm rounded-xl"
              >
                {/* Carrossel de imagens */}
                <div className="from-pink to-purple flex h-70 items-center rounded-xl justify-center overflow-hidden bg-gradient-to-br">
                  {project.images &&
                    project.images.length > 0 &&
                    (project.images.length > 1 ? (
                      <SimpleCarousel images={project.images} />
                    ) : (
                      <img
                        src={project.images[0]}
                        alt={
                          t(project.titleKey) !== project.titleKey
                            ? t(project.titleKey)
                            : project.title?.[t("lang")] ||
                              project.title?.pt ||
                              project.title?.en ||
                              project.titleKey
                        }
                        className="h-full w-full object-cover"
                      />
                    ))}
                </div>

                {/* Conteúdo do card */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <h3 className="text-xl font-semibold">
                    {t(project.titleKey) !== project.titleKey
                      ? t(project.titleKey)
                      : project.title?.[t("lang")] ||
                        project.title?.pt ||
                        project.title?.en ||
                        project.titleKey}
                  </h3>
                  <p className="mt-2 text-gray-400">
                    {t(project.descKey) !== project.descKey
                      ? t(project.descKey)
                      : project.description?.[t("lang")] ||
                        project.description?.pt ||
                        project.description?.en ||
                        project.descKey}
                  </p>

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
                        className="text-pink flex items-center gap-2 hover:text-white"
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
                        className="text-purple flex items-center gap-2 hover:text-white"
                      >
                        <FontAwesomeIcon icon={faCode} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
