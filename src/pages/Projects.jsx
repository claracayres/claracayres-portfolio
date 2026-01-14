import { useState, useEffect, useRef } from "react";
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
  }, [projects]);

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
          <div className="relative mx-auto w-full max-w-sm lg:max-w-7xl">
            <div
              ref={containerRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden  scroll-smooth pb-6 lg:snap-none lg:flex-wrap lg:justify-center lg:gap-10 lg:overflow-visible"
            >
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className="w-full max-w-sm flex-none snap-center"
                >
                  <div className="transition-transform duration-300 lg:hover:scale-105">
                    <ProjectCard project={project} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2 lg:hidden">
              {projects.map((_, index) => (
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
};

export default Projects;
