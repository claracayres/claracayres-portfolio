import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

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
      className="from-darkBlue/95 to-darkBlue bg-gradient-to-b py-20"
    >
      <div className="container mx-auto px-4">
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
          <div className="flex flex-wrap justify-center gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="project-card card w-full max-w-md overflow-hidden rounded-xl"
              >
                {/* Project Image/Header */}
                <div className="from-pink to-purple relative h-80 overflow-hidden bg-gradient-to-br">
                  {project.images && project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={t(project.titleKey) || project.titleKey}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <svg
                        className="h-20 w-20 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mt-4 mb-2 text-xl font-semibold">
                    {t(project.titleKey) || project.titleKey}
                  </h3>
                  <p className="mb-4 text-gray-400">
                    {t(project.descKey) || project.descKey}
                  </p>

                  {/* Technologies Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-purple/20 text-purple rounded-full px-3 py-1 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-pink/20 text-pink rounded-full px-3 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink flex items-center gap-2 transition-colors hover:text-white"
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
                        className="text-purple flex items-center gap-2 transition-colors hover:text-white"
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
