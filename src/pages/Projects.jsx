import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../config/api";
import { ProjectCard } from "../components/Cards";

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
    <section id="projects" className="py-20">
      <div className="container m-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("projects.title")}{" "}
            <span className="gradient-text">{t("projects.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl">{t("projects.description")}</p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando projetos...</p>
          </div>
        ) : (
          <div className="lg md:snap-none:overflow-visible flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 pb-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
