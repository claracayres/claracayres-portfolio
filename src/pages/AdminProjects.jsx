import { useEffect, useState } from "react";
import { surface, mutedText } from "../utils/theme";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projectService";

const emptyProject = {
  titlePt: "",
  titleEn: "",
  slug: "",
  subtitlePt: "",
  subtitleEn: "",
  descriptionPt: "",
  descriptionEn: "",
  longDescriptionPt: "",
  longDescriptionEn: "",
  categoryPt: "",
  categoryEn: "",
  type: "",
  gradient: "from-fuchsia-500 via-cyan-400 to-violet-500",
  images: [],
  imageUrl: "",
  technologies: [],
  newTechnology: "",
  tags: [],
  newTag: "",
  liveUrl: "",
  projectUrl: "",
  githubUrl: "",
  featured: false,
  creativeNotePt: "",
  creativeNoteEn: "",
};

function createSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminProjects({ theme = "dark" }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchProjects() {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      alert("Erro ao buscar projetos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  function resetForm() {
    setCurrentProject(emptyProject);
    setEditingId(null);
  }

  function openModal(project = null) {
    if (project) {
      setEditingId(project._id);

      setCurrentProject({
        ...emptyProject,
        titlePt: project.titlePt || project.title?.pt || "",
        titleEn: project.titleEn || project.title?.en || "",
        slug: project.slug || "",
        subtitlePt: project.subtitlePt || "",
        subtitleEn: project.subtitleEn || "",
        descriptionPt: project.descriptionPt || project.description?.pt || "",
        descriptionEn: project.descriptionEn || project.description?.en || "",
        longDescriptionPt: project.longDescriptionPt || "",
        longDescriptionEn: project.longDescriptionEn || "",
        categoryPt: project.categoryPt || "",
        categoryEn: project.categoryEn || "",
        type: project.type || "",
        gradient:
          project.gradient || "from-fuchsia-500 via-cyan-400 to-violet-500",
        images: project.images || [],
        imageUrl: "",
        technologies: project.technologies || [],
        newTechnology: "",
        tags: project.tags || [],
        newTag: "",
        liveUrl: project.liveUrl || project.projectUrl || "",
        projectUrl: project.projectUrl || project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        featured: Boolean(project.featured),
        creativeNotePt: project.creativeNotePt || "",
        creativeNoteEn: project.creativeNoteEn || "",
      });
    } else {
      resetForm();
    }

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    resetForm();
  }

  function updateField(field, value) {
    setCurrentProject((prev) => {
      const next = {
        ...prev,
        [field]: value,
      };

      if (field === "titleEn" && !prev.slug) {
        next.slug = createSlug(value);
      }

      if (field === "titlePt" && !prev.slug && !prev.titleEn) {
        next.slug = createSlug(value);
      }

      return next;
    });
  }

  function addImage() {
    const image = currentProject.imageUrl.trim();

    if (!image) return;

    setCurrentProject((prev) => ({
      ...prev,
      images: [...prev.images, image],
      imageUrl: "",
    }));
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Imagem muito grande. Máximo 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentProject((prev) => ({
        ...prev,
        images: [...prev.images, reader.result],
      }));
    };

    reader.readAsDataURL(file);
  }

  function removeImage(index) {
    setCurrentProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function addTechnology() {
    const technology = currentProject.newTechnology.trim();

    if (!technology) return;

    setCurrentProject((prev) => ({
      ...prev,
      technologies: [...prev.technologies, technology],
      newTechnology: "",
    }));
  }

  function removeTechnology(index) {
    setCurrentProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  }

  function addTag() {
    const tag = currentProject.newTag.trim();

    if (!tag) return;

    setCurrentProject((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
      newTag: "",
    }));
  }

  function removeTag(index) {
    setCurrentProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentProject.titlePt || !currentProject.titleEn) {
      alert("Preencha o título em PT e EN.");
      return;
    }

    if (!currentProject.slug) {
      alert("Preencha o slug do projeto.");
      return;
    }

    try {
      setSaving(true);

      const projectData = {
        titlePt: currentProject.titlePt,
        titleEn: currentProject.titleEn,
        slug: createSlug(currentProject.slug),
        subtitlePt: currentProject.subtitlePt,
        subtitleEn: currentProject.subtitleEn,
        descriptionPt: currentProject.descriptionPt,
        descriptionEn: currentProject.descriptionEn,
        longDescriptionPt: currentProject.longDescriptionPt,
        longDescriptionEn: currentProject.longDescriptionEn,
        categoryPt: currentProject.categoryPt,
        categoryEn: currentProject.categoryEn,
        type: currentProject.type,
        gradient: currentProject.gradient,
        images: currentProject.images,
        technologies: currentProject.technologies,
        tags: currentProject.tags,
        liveUrl: currentProject.liveUrl,
        projectUrl: currentProject.projectUrl || currentProject.liveUrl,
        githubUrl: currentProject.githubUrl,
        featured: currentProject.featured,
        creativeNotePt: currentProject.creativeNotePt,
        creativeNoteEn: currentProject.creativeNoteEn,
      };

      if (editingId) {
        await updateProject(editingId, projectData);
        alert("Projeto atualizado!");
      } else {
        await createProject(projectData);
        alert("Projeto criado!");
      }

      await fetchProjects();
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      alert("Erro ao salvar projeto.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Tem certeza que deseja deletar este projeto?");

    if (!confirmed) return;

    try {
      await deleteProject(id);
      alert("Projeto deletado!");
      await fetchProjects();
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      alert("Erro ao deletar projeto.");
    }
  }

  return (
    <section className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-fuchsia-400">
              Admin
            </p>
            <h1 className="mt-2 text-4xl font-black md:text-6xl">
              Projetos
            </h1>
            <p className={`mt-3 max-w-2xl ${mutedText(theme)}`}>
              Cadastre, edite e remova projetos exibidos no portfólio.
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 font-black text-white transition hover:scale-105"
          >
            + Novo projeto
          </button>
        </div>

        {isLoading ? (
          <div className={`rounded-[2rem] border p-8 ${surface(theme)}`}>
            <p className={mutedText(theme)}>Carregando projetos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className={`rounded-[2rem] border p-8 ${surface(theme)}`}>
            <p className={mutedText(theme)}>Nenhum projeto cadastrado.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className={`relative overflow-hidden rounded-[2rem] border p-5 ${surface(
                  theme,
                )}`}
              >
                <div
                  className={`absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${
                    project.gradient ||
                    "from-fuchsia-500 via-cyan-400 to-violet-500"
                  } opacity-25 blur-3xl`}
                />

                <div className="relative">
                  <div className="mb-4 h-40 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20">
                    {project.images?.[0] ? (
                      <img
                        src={project.images[0]}
                        alt={project.titlePt || project.titleEn}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-sm opacity-60">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
                    {project.categoryPt || project.type || "Project"}
                  </p>

                  <h2 className="text-2xl font-black">
                    {project.titlePt || project.titleEn || project.title?.pt}
                  </h2>

                  <p className={`mt-3 line-clamp-3 ${mutedText(theme)}`}>
                    {project.descriptionPt || project.description?.pt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech, index) => (
                      <span
                        key={`${tech}-${index}`}
                        className="rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 px-3 py-1 text-xs font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      onClick={() => openModal(project)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold ${surface(
                        theme,
                      )}`}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
                    >
                      Deletar
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300"
                      >
                        Live
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm font-bold text-fuchsia-300"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur">
          <div
            className={`max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border ${surface(
              theme,
            )}`}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-fuchsia-400">
                  {editingId ? "Editando" : "Novo"}
                </p>
                <h2 className="text-2xl font-black">
                  {editingId ? "Editar projeto" : "Criar projeto"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className={`grid h-10 w-10 place-items-center rounded-full border ${surface(
                  theme,
                )}`}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="max-h-[78vh] overflow-y-auto p-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Título PT"
                  value={currentProject.titlePt}
                  onChange={(value) => updateField("titlePt", value)}
                  required
                />

                <Field
                  label="Título EN"
                  value={currentProject.titleEn}
                  onChange={(value) => updateField("titleEn", value)}
                  required
                />

                <Field
                  label="Slug"
                  value={currentProject.slug}
                  onChange={(value) => updateField("slug", createSlug(value))}
                  placeholder="vibematch"
                  required
                />

                <Field
                  label="Categoria PT"
                  value={currentProject.categoryPt}
                  onChange={(value) => updateField("categoryPt", value)}
                  placeholder="Aplicação Web"
                />

                <Field
                  label="Categoria EN"
                  value={currentProject.categoryEn}
                  onChange={(value) => updateField("categoryEn", value)}
                  placeholder="Web Application"
                />

                <Field
                  label="Tipo para o loop/Home"
                  value={currentProject.type}
                  onChange={(value) => updateField("type", value)}
                  placeholder="Full Stack Project"
                />

                <Field
                  label="Subtítulo PT"
                  value={currentProject.subtitlePt}
                  onChange={(value) => updateField("subtitlePt", value)}
                />

                <Field
                  label="Subtítulo EN"
                  value={currentProject.subtitleEn}
                  onChange={(value) => updateField("subtitleEn", value)}
                />

                <TextArea
                  label="Descrição curta PT"
                  value={currentProject.descriptionPt}
                  onChange={(value) => updateField("descriptionPt", value)}
                />

                <TextArea
                  label="Descrição curta EN"
                  value={currentProject.descriptionEn}
                  onChange={(value) => updateField("descriptionEn", value)}
                />

                <TextArea
                  label="Descrição longa PT"
                  value={currentProject.longDescriptionPt}
                  onChange={(value) => updateField("longDescriptionPt", value)}
                />

                <TextArea
                  label="Descrição longa EN"
                  value={currentProject.longDescriptionEn}
                  onChange={(value) => updateField("longDescriptionEn", value)}
                />

                <Field
                  label="Live URL"
                  value={currentProject.liveUrl}
                  onChange={(value) => {
                    updateField("liveUrl", value);
                    updateField("projectUrl", value);
                  }}
                  placeholder="https://projeto.vercel.app"
                />

                <Field
                  label="GitHub URL"
                  value={currentProject.githubUrl}
                  onChange={(value) => updateField("githubUrl", value)}
                  placeholder="https://github.com/claracayres/repositorio"
                />

                <Field
                  label="Gradient Tailwind"
                  value={currentProject.gradient}
                  onChange={(value) => updateField("gradient", value)}
                  placeholder="from-fuchsia-500 via-cyan-400 to-violet-500"
                />

                <div className={`rounded-[1.5rem] border p-4 ${surface(theme)}`}>
                  <label className="flex items-center gap-3 font-bold">
                    <input
                      type="checkbox"
                      checked={currentProject.featured}
                      onChange={(event) =>
                        updateField("featured", event.target.checked)
                      }
                    />
                    Destacar projeto na Home
                  </label>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <TextArea
                  label="Creative note PT"
                  value={currentProject.creativeNotePt}
                  onChange={(value) => updateField("creativeNotePt", value)}
                />

                <TextArea
                  label="Creative note EN"
                  value={currentProject.creativeNoteEn}
                  onChange={(value) => updateField("creativeNoteEn", value)}
                />
              </div>

              <ArrayEditor
                title="Imagens"
                value={currentProject.imageUrl}
                onChange={(value) => updateField("imageUrl", value)}
                onAdd={addImage}
                items={currentProject.images}
                onRemove={removeImage}
                placeholder="Cole a URL da imagem"
                theme={theme}
              >
                <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-3 text-sm font-black text-white">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </ArrayEditor>

              {currentProject.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {currentProject.images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group relative overflow-hidden rounded-2xl border border-white/10"
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <ArrayEditor
                  title="Tecnologias"
                  value={currentProject.newTechnology}
                  onChange={(value) => updateField("newTechnology", value)}
                  onAdd={addTechnology}
                  items={currentProject.technologies}
                  onRemove={removeTechnology}
                  placeholder="React"
                  theme={theme}
                />

                <ArrayEditor
                  title="Tags"
                  value={currentProject.newTag}
                  onChange={(value) => updateField("newTag", value)}
                  onAdd={addTag}
                  items={currentProject.tags}
                  onRemove={removeTag}
                  placeholder="Full Stack"
                  theme={theme}
                />
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`rounded-full border px-6 py-3 font-bold ${surface(
                    theme,
                  )}`}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Salvando..."
                    : editingId
                      ? "Atualizar projeto"
                      : "Criar projeto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold opacity-80">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-cyan-400"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold opacity-80">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-cyan-400"
      />
    </label>
  );
}

function ArrayEditor({
  title,
  value,
  onChange,
  onAdd,
  items,
  onRemove,
  placeholder,
  theme,
  children,
}) {
  return (
    <div className={`mt-5 rounded-[1.5rem] border p-4 ${surface(theme)}`}>
      <label className="mb-3 block text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">
        {title}
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-cyan-400"
        />

        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-black text-cyan-300"
        >
          Adicionar
        </button>

        {children}
      </div>

      {items?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 px-3 py-1 text-xs font-bold"
            >
              {String(item).length > 40 ? `${String(item).slice(0, 40)}...` : item}

              <button
                type="button"
                onClick={() => onRemove(index)}
                className="opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}