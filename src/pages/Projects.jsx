/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PageShell from "../layouts/PageShell";
import { surface, mutedText } from "../utils/theme";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../components/Icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/projectService";
import { getProjectGradient } from "../utils/gradientMap";

function getLocalizedText(value, language = "pt") {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (typeof value === "object") {
    return value[language] || value.pt || value.en || "";
  }

  return String(value);
}

function ProjectImageCarousel({ project }) {
  const images = project.images || [];
  const [activeIndex, setActiveIndex] = useState(0);

  function nextImage(e) {
    e.stopPropagation();

    if (!images.length) return;

    setActiveIndex((current) => (current + 1) % images.length);
  }

  function previousImage(e) {
    e.stopPropagation();

    if (!images.length) return;

    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function getLocalizedText(value, language = "pt") {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (typeof value === "object") {
      return value[language] || value.pt || value.en || "";
    }

    return String(value);
  }

  const title = project.titlePt || project.titleEn || "Projeto";
  if (images.length === 0) {
    return (
      <div className="grid h-full place-items-center text-center">
        <div>
          <Icon name="eye" className="mx-auto mb-3" size={34} />
          <p className="font-black">Sem imagem</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${title} ${activeIndex + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="h-full w-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousImage}
            className="absolute top-1/2 left-3 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 font-black text-white backdrop-blur transition hover:scale-110"
          >
            <Icon name="arrowLeft" className="mx-auto mb-3" size={34} />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute top-1/2 right-3 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/50 font-black text-white backdrop-blur transition hover:scale-110"
          >
            <Icon name="arrowRight" className="mx-auto mb-3" size={34} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(index);
                }}
                className={`h-2 rounded-full transition ${
                  activeIndex === index ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectsPage({ theme }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isPt = i18n.language?.startsWith("pt");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        setError("Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  function getLocalizedText(value, language = "pt") {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (typeof value === "object") {
      return value[language] || value.pt || value.en || "";
    }

    return String(value);
  }

  function getProjectTitle(project) {
    return isPt
      ? project.titlePt ||
          getLocalizedText(project.title, "pt") ||
          project.titleEn ||
          "Projeto"
      : project.titleEn ||
          getLocalizedText(project.title, "en") ||
          project.titlePt ||
          "Project";
  }

  function getProjectDescription(project) {
    return isPt
      ? project.descriptionPt ||
          getLocalizedText(project.description, "pt") ||
          project.descriptionEn ||
          ""
      : project.descriptionEn ||
          getLocalizedText(project.description, "en") ||
          project.descriptionPt ||
          "";
  }

  function getProjectCategory(project) {
    return isPt
      ? project.categoryPt ||
          getLocalizedText(project.category, "pt") ||
          project.categoryEn ||
          project.type ||
          "Project"
      : project.categoryEn ||
          getLocalizedText(project.category, "en") ||
          project.categoryPt ||
          project.type ||
          "Project";
  }

  function getProjectSlug(project) {
    return project.slug || project._id || project.id;
  }

  return (
    <PageShell
      eyebrow={t("projects.eyebrow")}
      title={t("projects.title")}
      theme={theme}
    >
      <p className={`mb-10 max-w-3xl text-xl leading-8 ${mutedText(theme)}`}>
        {t("projects.subtitle")}
      </p>

      {loading && <p className={mutedText(theme)}>Carregando projetos...</p>}

      {!loading && error && (
        <div className={`rounded-[2rem] border p-8 ${surface(theme)}`}>
          <p className="font-bold text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className={`rounded-[2rem] border p-8 ${surface(theme)}`}>
          <p className={mutedText(theme)}>Nenhum projeto cadastrado ainda.</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const title = getProjectTitle(project);
            const description = getProjectDescription(project);
            const category = getProjectCategory(project);
            const slug = getProjectSlug(project);

            return (
              <motion.article
                key={project._id || project.id || project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-[2.2rem] border p-6 ${surface(
                  theme
                )}`}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                <div
                  className={`absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${getProjectGradient(
                    project
                  )} opacity-25 blur-3xl`}
                />

                <div className="relative">
                  <div className="mb-7 h-56 overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-black/30 to-white/10">
                    <ProjectImageCarousel project={project} />
                  </div>

                  <p
                    className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      theme === "dark"
                        ? "bg-white/10 text-white/60"
                        : "bg-slate-950/5 text-slate-600"
                    }`}
                  >
                    {category || "Project"}
                  </p>

                  <h2 className="text-4xl font-black">{title}</h2>

                  <p className={`mt-4 leading-8 ${mutedText(theme)}`}>
                    {description}
                  </p>

                  {project.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            theme === "dark"
                              ? "bg-white/10 text-white/70"
                              : "bg-slate-950/10 text-slate-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate(`/projetos/${slug}`)}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 font-black text-white transition hover:scale-105"
                  >
                    {t("projects.open")} <Icon name="arrow" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}

export default ProjectsPage;
