/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageShell from "../layouts/PageShell";
import { surface, mutedText } from "../utils/theme";
import { motion } from "framer-motion";
import Icon from "../components/Icons";
import { useTranslation } from "react-i18next";
import { getProjectBySlug } from "../services/projectService";
import { getProjectGradient } from "../utils/gradientMap";

function getLocalizedText(value, language = "pt") {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (typeof value === "object") {
    return value[language] || value.pt || value.en || "";
  }

  return String(value);
}

function ProjectDetailPage({ theme }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isPt = i18n.language === "pt";

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);

        const data = await getProjectBySlug(slug);

        setProject(data);
        setSelectedImage(data.images?.[0] || "");
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <PageShell theme={theme}>
        <p className={mutedText(theme)}>Carregando projeto...</p>
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell theme={theme}>
        <button
          onClick={() => navigate("/projetos")}
          className={`mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold ${surface(theme)}`}
        >
          <Icon name="arrowLeft" className="mx-auto mb-3" size={34} />
          {t("projects.back")}
        </button>

        <div className={`rounded-[2rem] border p-8 ${surface(theme)}`}>
          <h1 className="text-4xl font-black">Projeto não encontrado</h1>

          <p className={`mt-3 ${mutedText(theme)}`}>
            Esse projeto não existe ou foi removido.
          </p>
        </div>
      </PageShell>
    );
  }

  const images = project.images || [];

  const language = isPt ? "pt" : "en";

  const title = isPt ? project.titlePt : project.titleEn;
  const subtitle = isPt ? project.subtitlePt : project.subtitleEn;
  const description = isPt ? project.descriptionPt : project.descriptionEn;
  const longDescription = isPt
    ? project.longDescriptionPt
    : project.longDescriptionEn;
  const category = isPt ? project.categoryPt : project.categoryEn;

  const finalTitle =
    title ||
    project.titlePt ||
    project.titleEn ||
    getLocalizedText(project.title, language) ||
    "Projeto";

  const finalSubtitle =
    subtitle ||
    project.subtitlePt ||
    project.subtitleEn ||
    getLocalizedText(project.subtitle, language);

  const finalDescription =
    description ||
    project.descriptionPt ||
    project.descriptionEn ||
    getLocalizedText(project.description, language);

  const finalLongDescription =
    longDescription ||
    project.longDescriptionPt ||
    project.longDescriptionEn ||
    getLocalizedText(project.longDescription, language);

  const finalCategory =
    category ||
    project.categoryPt ||
    project.categoryEn ||
    getLocalizedText(project.category, language) ||
    project.type ||
    "Project";

  const finalCreativeNote = (
    isPt
      ? project.creativeNotePt || project.creativeNotesPt
      : project.creativeNoteEn || project.creativeNotesEn
  )?.trim();

  return (
    <PageShell theme={theme}>
      <button
        onClick={() => navigate("/projetos")}
        className={`mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-black transition hover:-translate-x-1 hover:scale-105 ${surface(theme)}`}
      >
        <Icon name="arrowLeft" className="mx-auto mb-3" size={34} />
        {t("projects.back")}
      </button>

      <section
        className={`relative overflow-hidden rounded-[2rem] border p-5 shadow-2xl md:rounded-[3rem] md:p-8 lg:p-10 ${surface(
          theme
        )}`}
      >
        <div
          className={`absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br ${getProjectGradient(
            project
          )} opacity-30 blur-3xl`}
        />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-400/20 via-fuchsia-500/20 to-transparent blur-3xl" />

        <div
          className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${
            getProjectGradient(project)
          }`}
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full px-4 py-2 text-xs font-black tracking-[0.18em] uppercase ${
                  theme === "dark"
                    ? "bg-white/10 text-white/70"
                    : "bg-slate-950/5 text-slate-600"
                }`}
              >
                {finalCategory || "Project"}
              </span>

              {project.featured && (
                <span className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-xs font-black tracking-[0.18em] text-white uppercase">
                  Featured
                </span>
              )}
            </div>

            <h1 className="max-w-4xl text-5xl leading-[0.92] font-black tracking-[-0.07em] md:text-7xl lg:text-8xl">
              {finalTitle}
            </h1>

            {finalSubtitle && (
              <p className="mt-5 max-w-2xl text-xl leading-8 font-bold text-cyan-400 md:text-2xl">
                {finalSubtitle}
              </p>
            )}

            <p
              className={`mt-6 max-w-3xl text-lg leading-8 ${mutedText(theme)}`}
            >
              {finalLongDescription || finalDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {(project.liveUrl || project.projectUrl) && (
                <a
                  href={project.liveUrl || project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-black text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-105"
                >
                  <Icon name="link" size={17} />
                  {t("projects.live")}
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-black transition hover:scale-105 ${surface(
                    theme
                  )}`}
                >
                  <Icon name="github" size={17} />
                  {t("projects.repo")}
                </a>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div
              className={`relative overflow-hidden rounded-[2rem] border p-3 shadow-2xl md:rounded-[2.5rem] ${
                theme === "dark"
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-slate-200 bg-white/70"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />

              {selectedImage ? (
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={finalTitle}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative h-[200px] w-full rounded-[1.5rem] object-cover md:h-[320px] md:rounded-[2rem]"
                />
              ) : (
                <div className="relative grid h-[200px] place-items-center rounded-[1.5rem] border border-dashed border-current/20 bg-gradient-to-br from-white/10 to-black/10 p-6 text-center md:h-[320px] md:rounded-[2rem]">
                  <div>
                    <Icon
                      name="eye"
                      className="mx-auto mb-3 text-fuchsia-400"
                      size={34}
                    />

                    <p className="text-xl font-black">Sem imagem</p>

                    <p className={`mt-1 text-sm ${mutedText(theme)}`}>
                      Adicione imagens no admin.
                    </p>
                  </div>
                </div>
              )}

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.slice(0, 8).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`group overflow-hidden rounded-2xl border transition ${
                        selectedImage === image
                          ? "border-cyan-300 opacity-100"
                          : theme === "dark"
                            ? "border-white/10 opacity-55 hover:opacity-100"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${finalTitle} ${index + 1}`}
                        className="h-20 w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className={`rounded-[2rem] border p-6 md:p-8 ${surface(theme)}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white">
              <Icon name="eye" size={18} />
            </div>

            <h2 className="text-2xl font-black md:text-3xl">
              {t("projects.overview")}
            </h2>
          </div>

          <p className={`text-base leading-8 md:text-lg ${mutedText(theme)}`}>
            {finalDescription || finalLongDescription}
          </p>
        </div>

        <div className={`rounded-[2rem] border p-6 md:p-8 ${surface(theme)}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-white">
              <Icon name="code" size={18} />
            </div>

            <h2 className="text-2xl font-black md:text-3xl">
              {t("projects.stack")}
            </h2>
          </div>

          {project.technologies?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${
                    theme === "dark"
                      ? "border-white/10 bg-white/10 text-white/75"
                      : "border-slate-200 bg-slate-950/5 text-slate-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className={mutedText(theme)}>Nenhuma tecnologia cadastrada.</p>
          )}
        </div>
      </section>

      {finalCreativeNote && (
        <section
          className={`mt-6 overflow-hidden rounded-[2rem] border p-6 md:p-8 ${surface(
            theme
          )}`}
        >
          <div
            className={`mb-5 inline-flex rounded-full bg-gradient-to-r ${
              getProjectGradient(project)
            } px-4 py-2 text-xs font-black tracking-[0.2em] text-white uppercase`}
          >
            {t("projects.creativeNote")}
          </div>

          <p className={`max-w-4xl text-lg leading-8 ${mutedText(theme)}`}>
            {finalCreativeNote}
          </p>
        </section>
      )}
    </PageShell>
  );
}

export default ProjectDetailPage;
