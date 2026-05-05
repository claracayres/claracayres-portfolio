/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { surface, mutedText } from "../utils/theme";
import Icon from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getProjects } from "../services/projectService";
import { getProjectGradient } from "../utils/gradientMap";

function InfiniteProjectLoop({ t, theme }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        setError("Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    function updateItemsPerPage() {
      setItemsPerPage(window.innerWidth >= 768 ? 2 : 1);
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const pages = useMemo(() => {
    const result = [];

    for (let i = 0; i < projects.length; i += itemsPerPage) {
      result.push(projects.slice(i, i + itemsPerPage));
    }

    return result;
  }, [projects, itemsPerPage]);

  const totalPages = pages.length;

  function resetTimer() {
    setTimerKey((prev) => prev + 1);
  }

  function nextPage() {
    if (!totalPages) return;

    setCurrentPage((prev) => (prev + 1) % totalPages);
    resetTimer();
  }

  function prevPage() {
    if (!totalPages) return;

    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    resetTimer();
  }

  function goToPage(index) {
    setCurrentPage(index);
    resetTimer();
  }

  function getLocalizedText(value, language = "pt") {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (typeof value === "object") {
      return value[language] || value.pt || value.en || "";
    }

    return String(value);
  }

  function getProjectTitle(project) {
    const language = i18n.language?.startsWith("pt") ? "pt" : "en";

    return language === "pt"
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
    const language = i18n.language?.startsWith("pt") ? "pt" : "en";

    return language === "pt"
      ? project.descriptionPt ||
          getLocalizedText(project.description, "pt") ||
          project.descriptionEn ||
          ""
      : project.descriptionEn ||
          getLocalizedText(project.description, "en") ||
          project.descriptionPt ||
          "";
  }

  function getProjectType(project) {
    const language = i18n.language?.startsWith("pt") ? "pt" : "en";

    return (
      project.type ||
      project.categoryPt ||
      project.categoryEn ||
      getLocalizedText(project.category, language) ||
      "Project"
    );
  }

  function getProjectSlug(project) {
    return project.slug || project.id || project._id;
  }

  useEffect(() => {
    if (!totalPages) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);

    return () => clearInterval(interval);
  }, [timerKey, totalPages]);

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <section className="mt-20 overflow-hidden">
        <h2 className="mb-6 text-3xl font-black md:text-5xl">
          {t("home.featured")}
        </h2>

        <div
          className={`rounded-[2rem] border p-8 text-center ${surface(theme)}`}
        >
          <p className={mutedText(theme)}>Carregando projetos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-20 overflow-hidden">
        <h2 className="mb-6 text-3xl font-black md:text-5xl">
          {t("home.featured")}
        </h2>

        <div
          className={`rounded-[2rem] border p-8 text-center ${surface(theme)}`}
        >
          <p className="font-bold text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="mt-20 overflow-hidden">
        <h2 className="mb-6 text-3xl font-black md:text-5xl">
          {t("home.featured")}
        </h2>

        <div
          className={`rounded-[2rem] border p-8 text-center ${surface(theme)}`}
        >
          <p className={mutedText(theme)}>Nenhum projeto cadastrado ainda.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20 overflow-hidden">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-black md:text-5xl">
          {t("home.featured")}
        </h2>

        <button
          onClick={() => navigate("/projetos")}
          className="mr-2 hidden cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition hover:scale-105 md:inline-flex"
        >
          {t("nav.projects")}
        </button>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentPage}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) nextPage();
              if (info.offset.x > 80) prevPage();
            }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid gap-5 md:grid-cols-2"
          >
            {pages[currentPage]?.map((project) => {
              const slug = getProjectSlug(project);

              return (
                <button
                  key={project._id || project.id || project.slug}
                  onClick={() => navigate(`/projetos/${slug}`)}
                  className={`group relative min-h-[330px] overflow-hidden rounded-[2rem] border p-7 text-left shadow-xl md:p-8 ${surface(
                    theme
                  )}`}
                >
                  <div
                    className={`absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br ${getProjectGradient(
                      project
                    )} opacity-35 blur-2xl`}
                  />

                  <div className="relative">
                    <p
                      className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        theme === "dark"
                          ? "bg-white/10 text-white/60"
                          : "bg-slate-950/5 text-slate-600"
                      }`}
                    >
                      {getProjectType(project)}
                    </p>

                    <h3 className="text-4xl font-black md:text-5xl">
                      {getProjectTitle(project)}
                    </h3>

                    <p
                      className={`mt-5 line-clamp-3 text-base leading-7 ${mutedText(
                        theme
                      )}`}
                    >
                      {getProjectDescription(project)}
                    </p>

                    <div className="mt-8 flex items-center gap-2 font-bold text-fuchsia-400">
                      {t("home.viewProject")}
                      <Icon
                        name="arrow"
                        size={18}
                        className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            onClick={prevPage}
            className={`grid h-10 w-10 place-items-center rounded-full border text-lg font-black backdrop-blur transition hover:scale-110 ${surface(
              theme
            )}`}
            aria-label="Previous projects"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <div className="flex items-center justify-center gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentPage === index
                    ? "w-8 bg-fuchsia-400"
                    : theme === "dark"
                      ? "w-2.5 bg-white/20"
                      : "w-2.5 bg-slate-300"
                }`}
                aria-label={`Go to projects page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className={`grid h-10 w-10 place-items-center rounded-full border text-lg font-black backdrop-blur transition hover:scale-110 ${surface(
              theme
            )}`}
            aria-label="Next projects"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default InfiniteProjectLoop;
