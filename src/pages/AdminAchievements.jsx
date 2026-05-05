import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendar,
  faEdit,
  faEye,
  faGlobe,
  faImage,
  faPlus,
  faSave,
  faTag,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

export default function AdminAchievements({ embedded = false, theme = "dark" }) {
  const { t } = useTranslation();

  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [currentAchievement, setCurrentAchievement] = useState({
    titleKey: "",
    titlePt: "",
    titleEn: "",
    institution: "",
    dateKey: "",
    datePt: "",
    dateEn: "",
    descKey: "",
    descPt: "",
    descEn: "",
    images: [],
    imageUrl: "",
    tags: [],
    newTag: "",
    certificateUrl: "",
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
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      setIsLoading(true);

      const response = await fetch(API_ENDPOINTS.ACHIEVEMENTS);

      if (!response.ok) {
        throw new Error(`Erro ao buscar achievements: ${response.status}`);
      }

      const data = await response.json();
      setAchievements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar achievements:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setCurrentAchievement({
      titleKey: "",
      titlePt: "",
      titleEn: "",
      institution: "",
      dateKey: "",
      datePt: "",
      dateEn: "",
      descKey: "",
      descPt: "",
      descEn: "",
      images: [],
      imageUrl: "",
      tags: [],
      newTag: "",
      certificateUrl: "",
    });

    setEditingId(null);
  }

  function handleOpenModal(achievement = null) {
    if (achievement) {
      setEditingId(achievement._id);

      setCurrentAchievement({
        titleKey: achievement.titleKey || "",
        titlePt: achievement.title?.pt || achievement.titlePt || "",
        titleEn: achievement.title?.en || achievement.titleEn || "",
        institution: achievement.institution || "",
        dateKey: achievement.dateKey || "",
        datePt: achievement.date?.pt || achievement.datePt || "",
        dateEn: achievement.date?.en || achievement.dateEn || "",
        descKey: achievement.descKey || "",
        descPt: achievement.description?.pt || achievement.descPt || "",
        descEn: achievement.description?.en || achievement.descEn || "",
        images: achievement.images || [],
        imageUrl: "",
        tags: achievement.tags || [],
        newTag: "",
        certificateUrl: achievement.certificateUrl || "",
      });
    } else {
      resetForm();
    }

    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    resetForm();
  }

  function handleAddImage() {
    const image = currentAchievement.imageUrl.trim();

    if (!image) return;

    setCurrentAchievement((previous) => ({
      ...previous,
      images: [...previous.images, image],
      imageUrl: "",
    }));
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Imagem muito grande. O máximo recomendado é 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentAchievement((previous) => ({
        ...previous,
        images: [...previous.images, reader.result],
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveImage(index) {
    setCurrentAchievement((previous) => ({
      ...previous,
      images: previous.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  }

  function handleAddTag() {
    const tag = currentAchievement.newTag.trim();

    if (!tag) return;

    setCurrentAchievement((previous) => ({
      ...previous,
      tags: [...previous.tags, tag],
      newTag: "",
    }));
  }

  function handleRemoveTag(index) {
    setCurrentAchievement((previous) => ({
      ...previous,
      tags: previous.tags.filter((_, tagIndex) => tagIndex !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const achievementData = {
        titleKey: currentAchievement.titleKey || "",
        title: {
          pt: currentAchievement.titlePt || "",
          en: currentAchievement.titleEn || "",
        },
        institution: currentAchievement.institution || "",
        dateKey: currentAchievement.dateKey || "",
        date: {
          pt: currentAchievement.datePt || "",
          en: currentAchievement.dateEn || "",
        },
        descKey: currentAchievement.descKey || "",
        description: {
          pt: currentAchievement.descPt || "",
          en: currentAchievement.descEn || "",
        },
        images: currentAchievement.images || [],
        tags: currentAchievement.tags || [],
        certificateUrl: currentAchievement.certificateUrl || "",
      };

      const url = editingId
        ? `${API_ENDPOINTS.ACHIEVEMENTS}/${editingId}`
        : API_ENDPOINTS.ACHIEVEMENTS;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar: ${response.status} - ${errorText}`);
      }

      alert(editingId ? t("admin.updated") : t("admin.created"));

      await fetchAchievements();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar achievement:", error);
      alert(t("admin.errorSave"));
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(t("admin.confirmDelete"));

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.ACHIEVEMENTS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar achievement: ${response.status}`);
      }

      alert(t("admin.deleted"));
      await fetchAchievements();
    } catch (error) {
      console.error("Erro ao deletar achievement:", error);
      alert(t("admin.errorDelete"));
    }
  }

  function getAchievementTitle(achievement) {
    return (
      achievement.title?.pt ||
      achievement.titlePt ||
      achievement.titleKey ||
      "Achievement"
    );
  }

  function getAchievementDate(achievement) {
    return achievement.date?.pt || achievement.datePt || achievement.dateKey || "-";
  }

  function getAchievementDescription(achievement) {
    return (
      achievement.description?.pt ||
      achievement.descPt ||
      achievement.descKey ||
      ""
    );
  }

  const content = (
    <>
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-6 py-3 font-black text-white shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.02]"
        >
          <FontAwesomeIcon icon={faPlus} />
          {t("admin.addAchievement")}
        </button>
      </div>

      {isLoading ? (
        <div className="py-10 text-center">
          <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent" />
          <p className={`mt-3 text-sm font-bold ${mutedClass}`}>
            {t("admin.loadingAchievements")}
          </p>
        </div>
      ) : achievements.length === 0 ? (
        <div className={`rounded-2xl border p-8 text-center ${cardClass}`}>
          <p className={mutedClass}>Nenhuma conquista cadastrada ainda.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => (
            <article
              key={achievement._id}
              className={`flex min-h-[220px] flex-col justify-between rounded-2xl border p-5 transition hover:-translate-y-1 ${cardClass}`}
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-400">
                      Achievement
                    </p>

                    <h3 className="text-xl font-black leading-tight">
                      {getAchievementTitle(achievement)}
                    </h3>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(achievement)}
                      className={`grid h-9 w-9 place-items-center rounded-full transition ${
                        isDark
                          ? "bg-white/10 text-cyan-200 hover:bg-white/15"
                          : "bg-slate-100 text-cyan-700 hover:bg-slate-200"
                      }`}
                      aria-label="Editar achievement"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(achievement._id)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                      aria-label="Deletar achievement"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                <div className={`space-y-2 text-sm leading-6 ${mutedClass}`}>
                  <p>
                    <strong className={isDark ? "text-white" : "text-slate-950"}>
                      {t("admin.institution")}:
                    </strong>{" "}
                    {achievement.institution || "-"}
                  </p>

                  <p>
                    <strong className={isDark ? "text-white" : "text-slate-950"}>
                      {t("admin.date")}:
                    </strong>{" "}
                    {getAchievementDate(achievement)}
                  </p>

                  {getAchievementDescription(achievement) && (
                    <p className="line-clamp-3">
                      {getAchievementDescription(achievement)}
                    </p>
                  )}

                  <p>
                    <strong className={isDark ? "text-white" : "text-slate-950"}>
                      {t("admin.images")}:
                    </strong>{" "}
                    {achievement.images?.length || 0}
                  </p>
                </div>

                {achievement.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {achievement.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isDark
                            ? "bg-white/10 text-white/70"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {achievement.certificateUrl && (
                <a
                  href={achievement.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-fuchsia-400 transition hover:text-cyan-300"
                >
                  <FontAwesomeIcon icon={faEye} />
                  Ver certificado
                </a>
              )}
            </article>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className={`flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border ${modalClass}`}
          >
            <div
              className={`flex-shrink-0 border-b p-6 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-fuchsia-400">
                    {editingId ? "Editar" : "Criar"}
                  </p>

                  <h2 className="text-2xl font-black">
                    {editingId ? t("admin.edit") : t("admin.create")}{" "}
                    {t("admin.achievement")}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`grid h-10 w-10 place-items-center rounded-full transition ${
                    isDark
                      ? "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-950"
                  }`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      Title Key
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.titleKey}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          titleKey: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="achievements.card1.title"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                      {t("admin.institution")}
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.institution}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          institution: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="IBM, Meta, Google..."
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Título PT
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.titlePt}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          titlePt: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="Título em português"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Título EN
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.titleEn}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          titleEn: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="Title in English"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                      Date Key
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.dateKey}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          dateKey: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="achievements.card1.date"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Data PT
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.datePt}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          datePt: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="Janeiro, 2025"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Date EN
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.dateEn}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          dateEn: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="January, 2025"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-bold">
                      Description Key
                    </label>

                    <input
                      type="text"
                      value={currentAchievement.descKey}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          descKey: event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="achievements.card1.description"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Descrição PT
                    </label>

                    <textarea
                      value={currentAchievement.descPt}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          descPt: event.target.value,
                        }))
                      }
                      className={`min-h-32 w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="Descrição em português..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      Description EN
                    </label>

                    <textarea
                      value={currentAchievement.descEn}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          descEn: event.target.value,
                        }))
                      }
                      className={`min-h-32 w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="Description in English..."
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                    Certificate URL
                  </label>

                  <input
                    type="text"
                    value={currentAchievement.certificateUrl}
                    onChange={(event) =>
                      setCurrentAchievement((previous) => ({
                        ...previous,
                        certificateUrl: event.target.value,
                      }))
                    }
                    className={`w-full rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                    placeholder="https://coursera.org/..."
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold">
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Imagens
                  </label>

                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-5 py-3 text-sm font-black text-white transition hover:scale-[1.02]">
                      <FontAwesomeIcon icon={faImage} />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <span className={`text-sm ${mutedClass}`}>ou cole uma URL</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAchievement.imageUrl}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          imageUrl: event.target.value,
                        }))
                      }
                      className={`flex-1 rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="https://imagem.com/preview.png"
                    />

                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="grid w-12 place-items-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white transition hover:scale-[1.03]"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  {currentAchievement.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                      {currentAchievement.images.map((image, index) => (
                        <div
                          key={`${image}-${index}`}
                          className={`group relative overflow-hidden rounded-2xl border ${
                            isDark ? "border-white/10" : "border-slate-200"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="h-32 w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    <FontAwesomeIcon icon={faTag} className="mr-2" />
                    Tags
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAchievement.newTag}
                      onChange={(event) =>
                        setCurrentAchievement((previous) => ({
                          ...previous,
                          newTag: event.target.value,
                        }))
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className={`flex-1 rounded-2xl border p-3 outline-none transition focus:ring-4 ${inputClass}`}
                      placeholder="React, IBM, Certificate..."
                    />

                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="grid w-12 place-items-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white transition hover:scale-[1.03]"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  {currentAchievement.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentAchievement.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${
                            isDark
                              ? "bg-white/10 text-white/75"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {tag}

                          <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`flex flex-col justify-end gap-3 border-t pt-5 sm:flex-row ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={`rounded-2xl border px-6 py-3 font-bold transition ${
                      isDark
                        ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 px-6 py-3 font-black text-white transition hover:scale-[1.02]"
                  >
                    <FontAwesomeIcon icon={faSave} />
                    {editingId ? "Atualizar" : "Criar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
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