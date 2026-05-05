import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLightbulb,
  faPlus,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

export default function AdminSkills({ embedded = false, theme = "dark" }) {
  const { t } = useTranslation();

  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    percentage: 0,
    category: "programming",
    icon: "",
    color: "text-fuchsia-400",
  });

  const isDark = theme === "dark";

  const cardClass = isDark
    ? "border-white/10 bg-white/[0.06] text-white"
    : "border-slate-200 bg-white text-slate-950 shadow-lg shadow-slate-200/60";

  const modalClass = isDark
    ? "border-white/10 bg-slate-950/95 text-white"
    : "border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-300/70";

  const inputClass = isDark
    ? "border-white/10 bg-slate-950/60 text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:ring-cyan-300/10"
    : "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-cyan-500/60 focus:ring-cyan-500/10";

  const mutedClass = isDark ? "text-white/55" : "text-slate-600";

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      setIsLoading(true);

      const response = await fetch(API_ENDPOINTS.SKILLS);

      if (!response.ok) {
        throw new Error(`Erro ao buscar skills: ${response.status}`);
      }

      const data = await response.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar skills:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const skillData = {
        ...formData,
        percentage: Number(formData.percentage) || 0,
      };

      const url = editingId
        ? `${API_ENDPOINTS.SKILLS}/${editingId}`
        : API_ENDPOINTS.SKILLS;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skillData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar skill: ${response.status} - ${errorText}`);
      }

      alert(editingId ? t("admin.updated") : t("admin.created"));

      await fetchSkills();
      resetForm();
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(t("admin.errorSave"));
    } finally {
      setIsLoading(false);
    }
  }

  function handleEdit(skill) {
    setEditingId(skill._id);

    setFormData({
      name: skill.name || "",
      percentage: skill.percentage || 0,
      category: skill.category || "programming",
      icon: skill.icon || "",
      color: skill.color || "text-fuchsia-400",
    });

    setShowModal(true);
  }

  async function handleDelete(skillId) {
    const confirmed = window.confirm(t("admin.confirmDelete"));

    if (!confirmed) return;

    try {
      setIsLoading(true);

      const response = await fetch(`${API_ENDPOINTS.SKILLS}/${skillId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar skill: ${response.status}`);
      }

      alert(t("admin.deleted"));
      await fetchSkills();
    } catch (error) {
      console.error("Erro ao deletar skill:", error);
      alert(t("admin.errorDelete"));
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      percentage: 0,
      category: "programming",
      icon: "",
      color: "text-fuchsia-400",
    });

    setEditingId(null);
    setShowModal(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "percentage" ? Number(value) || 0 : value,
    }));
  }

  const content = (
    <>
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-6 py-3 font-black text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02]"
        >
          <FontAwesomeIcon icon={faPlus} />
          {t("admin.addSkill")}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-[2rem] border p-6 ${modalClass}`}
          >
            <div
              className={`mb-5 flex items-center justify-between gap-4 border-b pb-4 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-fuchsia-400">
                  {editingId ? "Editar" : "Criar"}
                </p>

                <h3 className="text-2xl font-black">
                  {editingId ? t("admin.edit") : t("admin.create")}{" "}
                  {t("admin.skill")}
                </h3>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className={`grid h-10 w-10 place-items-center rounded-full transition ${
                  isDark
                    ? "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-950"
                }`}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Nome da skill
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-4 ${inputClass}`}
                  placeholder="React"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Porcentagem
                </label>

                <input
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-4 ${inputClass}`}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  {t("admin.category")}
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-4 ${inputClass}`}
                >
                  <option value="programming">Programming</option>
                  <option value="tools">Tools</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  {t("admin.icon")} FontAwesome
                </label>

                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="fab fa-react"
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-4 ${inputClass}`}
                />

                <p className={`mt-2 text-xs ${mutedClass}`}>
                  Exemplo: fab fa-react, fab fa-js, fab fa-python
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">Cor</label>

                <select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-4 ${inputClass}`}
                >
                  <option value="text-fuchsia-400">Fuchsia</option>
                  <option value="text-purple-400">Purple</option>
                  <option value="text-blue-400">Blue</option>
                  <option value="text-cyan-400">Cyan</option>
                  <option value="text-green-400">Green</option>
                  <option value="text-yellow-400">Yellow</option>
                  <option value="text-red-400">Red</option>
                </select>
              </div>

              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className={mutedClass}>Preview</span>
                  <span className="font-black text-fuchsia-400">
                    {formData.percentage}%
                  </span>
                </div>

                <div
                  className={`h-2.5 w-full overflow-hidden rounded-full ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 transition-all"
                    style={{ width: `${Math.min(formData.percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div
                className={`flex flex-col gap-3 border-t pt-5 sm:flex-row ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-5 py-3 font-black text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FontAwesomeIcon icon={faSave} />
                  {isLoading ? t("admin.loading") : t("admin.save")}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className={`flex-1 rounded-2xl border px-5 py-3 font-bold transition ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {t("admin.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && !showModal ? (
        <div className="py-10 text-center">
          <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent" />

          <p className={`mt-3 text-sm font-bold ${mutedClass}`}>
            {t("admin.loadingSkills")}
          </p>
        </div>
      ) : skills.length === 0 ? (
        <div className={`rounded-2xl border p-8 text-center ${cardClass}`}>
          <FontAwesomeIcon
            icon={faLightbulb}
            className="mb-3 text-3xl text-fuchsia-400"
          />
          <p className={mutedClass}>{t("admin.noSkillsFound")}</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => {
            const percentage = Math.min(Number(skill.percentage) || 0, 100);

            return (
              <article
                key={skill._id}
                className={`flex min-h-[190px] flex-col justify-between rounded-2xl border p-5 transition hover:-translate-y-1 ${cardClass}`}
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-400">
                        {skill.category || "Skill"}
                      </p>

                      <h3 className="text-xl font-black leading-tight">
                        {skill.icon && (
                          <i className={`${skill.icon} ${skill.color} mr-2`} />
                        )}
                        {skill.name}
                      </h3>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(skill)}
                        className={`grid h-9 w-9 place-items-center rounded-full transition ${
                          isDark
                            ? "bg-white/10 text-cyan-200 hover:bg-white/15"
                            : "bg-slate-100 text-cyan-700 hover:bg-slate-200"
                        }`}
                        aria-label="Editar skill"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(skill._id)}
                        className="grid h-9 w-9 place-items-center rounded-full bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                        aria-label="Deletar skill"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className={mutedClass}>{t("admin.progress")}</span>
                      <span className="font-black text-fuchsia-400">
                        {percentage}%
                      </span>
                    </div>

                    <div
                      className={`h-2.5 w-full overflow-hidden rounded-full ${
                        isDark ? "bg-white/10" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className={`mt-4 space-y-2 text-sm ${mutedClass}`}>
                    <p>
                      <strong
                        className={isDark ? "text-white" : "text-slate-950"}
                      >
                        {t("admin.category")}:
                      </strong>{" "}
                      {skill.category}
                    </p>

                    {skill.icon && (
                      <p>
                        <strong
                          className={isDark ? "text-white" : "text-slate-950"}
                        >
                          {t("admin.icon")}:
                        </strong>{" "}
                        {skill.icon}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <main
      className={`min-h-screen px-4 py-10 ${
        isDark ? "bg-slate-950 text-white" : "bg-[#f7f4ef] text-slate-950"
      }`}
    >
      <div className="mx-auto max-w-7xl">{content}</div>
    </main>
  );
}