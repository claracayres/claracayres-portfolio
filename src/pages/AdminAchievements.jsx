import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faEye,
  faImage,
  faTag,
  faCalendar,
  faBuilding,
  faGlobe,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

export default function AdminAchievements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  // Fetch achievements on component mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.ACHIEVEMENTS);
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error("Erro ao buscar achievements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
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
  };

  const handleOpenModal = (achievement = null) => {
    if (achievement) {
      setEditingId(achievement._id);
      setCurrentAchievement({
        titleKey: achievement.titleKey || "",
        titlePt: achievement.title?.pt || "",
        titleEn: achievement.title?.en || "",
        institution: achievement.institution || "",
        dateKey: achievement.dateKey || "",
        datePt: achievement.date?.pt || "",
        dateEn: achievement.date?.en || "",
        descKey: achievement.descKey || "",
        descPt: achievement.description?.pt || "",
        descEn: achievement.description?.en || "",
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
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleAddImage = () => {
    if (currentAchievement.imageUrl.trim()) {
      setCurrentAchievement((prev) => ({
        ...prev,
        images: [...prev.images, prev.imageUrl.trim()],
        imageUrl: "",
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem!");
        return;
      }

      // Validar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem muito grande! Máximo 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentAchievement((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setCurrentAchievement((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = () => {
    if (currentAchievement.newTag.trim()) {
      setCurrentAchievement((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const handleRemoveTag = (index) => {
    setCurrentAchievement((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Função para gerar e exibir as traduções para serem copiadas
  const showTranslationUpdate = (translations) => {
    if (translations.length === 0) return;

    let message = "🌐 TRADUÇÕES PARA ADICIONAR:\n\n";

    message += "📁 PT (src/locales/pt/translation.json):\n";
    translations.forEach(({ key, pt }) => {
      if (key && pt) {
        const cleanKey = key.replace("achievements.", "");
        message += `"${cleanKey}": "${pt}",\n`;
      }
    });

    message += "\n📁 EN (src/locales/en/translation.json):\n";
    translations.forEach(({ key, en }) => {
      if (key && en) {
        const cleanKey = key.replace("achievements.", "");
        message += `"${cleanKey}": "${en}",\n`;
      }
    });

    message +=
      "\n💡 Adicione essas linhas na seção 'achievements' dos arquivos de tradução!";

    // Cria um modal customizado com textarea para copiar
    const translationModal = document.createElement("div");
    translationModal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8); z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    `;

    translationModal.innerHTML = `
      <div style="background: #1f2937; border-radius: 8px; padding: 20px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
        <h3 style="color: #ec4899; margin-bottom: 15px;">🌐 Traduções Geradas</h3>
        <textarea style="width: 100%; height: 300px; background: #374151; color: white; border: 1px solid #6366f1; border-radius: 4px; padding: 10px; font-family: monospace; font-size: 12px;" readonly>${message}</textarea>
        <div style="margin-top: 15px; text-align: right;">
          <button style="background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;" onclick="navigator.clipboard.writeText(this.parentElement.previousElementSibling.value).then(() => alert('Copiado!')).catch(() => alert('Erro ao copiar'))">📋 Copiar</button>
          <button style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-left: 10px;" onclick="this.closest('div').remove()">❌ Fechar</button>
        </div>
      </div>
    `;

    document.body.appendChild(translationModal);

    // Remove modal ao clicar fora
    translationModal.addEventListener("click", (e) => {
      if (e.target === translationModal) translationModal.remove();
    });
  };

  const handleSubmit = async () => {
    try {
      // Prepara as traduções
      const translations = [
        {
          key: currentAchievement.titleKey,
          pt: currentAchievement.titlePt,
          en: currentAchievement.titleEn,
        },
        {
          key: currentAchievement.dateKey,
          pt: currentAchievement.datePt,
          en: currentAchievement.dateEn,
        },
        {
          key: currentAchievement.descKey,
          pt: currentAchievement.descPt,
          en: currentAchievement.descEn,
        },
      ].filter((t) => t.key && t.pt && t.en); // Remove entradas vazias

      // Atualiza arquivos de tradução automaticamente
      if (translations.length > 0) {
        try {
          const translationResponse = await fetch(
            `${API_ENDPOINTS.TRANSLATIONS}/update`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(translations),
            },
          );

          if (translationResponse.ok) {
            const result = await translationResponse.json();
            console.log("✅ Traduções atualizadas automaticamente:", result);
          } else {
            console.log("⚠️ Falha na atualização automática de traduções");
          }
        } catch (translationError) {
          console.log("❌ Erro na API de traduções:", translationError);
          // Se falhar, mostra o modal para cópia manual
          if (!editingId) {
            setTimeout(() => {
              showTranslationUpdate(translations);
            }, 500);
          }
        }
      }

      // Prepara dados do achievement
      const achievementData = {
        titleKey: currentAchievement.titleKey || "",
        dateKey: currentAchievement.dateKey || "",
        descKey: currentAchievement.descKey || "",
        institution: currentAchievement.institution || "",
        images: currentAchievement.images || [],
        tags: currentAchievement.tags || [],
        certificateUrl: currentAchievement.certificateUrl || "",
      };

      console.log("Sending achievement data:", achievementData); // Debug

      // Salva o achievement
      const url = editingId
        ? `${API_ENDPOINTS.ACHIEVEMENTS}/${editingId}`
        : API_ENDPOINTS.ACHIEVEMENTS;

      console.log("Sending to URL:", url); // Debug

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievementData),
      });

      console.log("Response status:", response.status); // Debug

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`,
        );
      }

      alert(editingId ? t("admin.updated") : t("admin.created"));

      // Mostra notificação de traduções automáticas se foi um novo achievement
      if (translations.length > 0 && !editingId) {
        setTimeout(() => {
          alert(
            `🌐 Traduções aplicadas automaticamente!\n${translations.map((t) => `• ${t.key}`).join("\n")}\n\n✅ Recarregue a página para ver as traduções!`,
          );
        }, 800);
      }

      fetchAchievements();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert(t("admin.errorSave"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("admin.confirmDelete"))) {
      try {
        // Primeiro, busca o achievement para pegar as chaves de tradução
        const achievementResponse = await fetch(API_ENDPOINTS.ACHIEVEMENTS);
        const allAchievements = await achievementResponse.json();
        const achievementToDelete = allAchievements.find((a) => a._id === id);

        console.log("Deleting achievement:", achievementToDelete); // Debug

        // Deleta o achievement
        const response = await fetch(`${API_ENDPOINTS.ACHIEVEMENTS}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove as traduções associadas se existirem
          if (
            achievementToDelete &&
            (achievementToDelete.titleKey ||
              achievementToDelete.dateKey ||
              achievementToDelete.descKey)
          ) {
            const keysToDelete = [
              achievementToDelete.titleKey,
              achievementToDelete.dateKey,
              achievementToDelete.descKey,
            ].filter((key) => key); // Remove valores vazios

            if (keysToDelete.length > 0) {
              try {
                const translationResponse = await fetch(
                  `${API_ENDPOINTS.TRANSLATIONS}/delete`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ keys: keysToDelete }),
                  },
                );

                if (translationResponse.ok) {
                  const result = await translationResponse.json();
                  console.log(
                    "✅ Traduções removidas automaticamente:",
                    result,
                  );
                } else {
                  console.log("⚠️ Falha na remoção automática de traduções");
                }
              } catch (translationError) {
                console.log(
                  "❌ Erro na remoção de traduções:",
                  translationError,
                );
              }
            }
          }

          alert(t("admin.deleted"));
          setTimeout(() => {
            alert(
              "🗑️ Traduções removidas automaticamente!\n\n✅ Recarregue a página para ver as mudanças!",
            );
          }, 800);
          fetchAchievements();
        }
      } catch (error) {
        alert(t("admin.errorDelete"));
        console.error("Erro:", error);
      }
    }
  };

  return (
    <div className="bg-darkBlue min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-4 text-4xl font-bold">
                <span className="gradient-text">Admin</span> - Achievements
              </h1>
              <p className="text-gray-400">
                Gerencie os achievements do portfolio
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/admin-projects")}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                Projects
              </button>
              <button
                onClick={() => navigate("/admin-skills")}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                Skills
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => handleOpenModal()}
            className="btn-gradient inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:opacity-90"
          >
            <FontAwesomeIcon icon={faPlus} />
            Novo Achievement
          </button>
        </div>

        {/* Achievements Grid */}
        {isLoading ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando achievements...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div key={achievement._id} className="card rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {achievement.title?.pt || achievement.titleKey}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(achievement)}
                      className="text-purple rounded p-2 transition-colors ease-in hover:text-purple-200"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement._id)}
                      className="rounded text-red-400 hover:text-pink-800"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <strong>Instituição:</strong> {achievement.institution}
                  </p>
                  <p>
                    <strong>Data:</strong>{" "}
                    {achievement.date?.pt || achievement.dateKey}
                  </p>
                  <p>
                    <strong>Tags:</strong>{" "}
                    {achievement.tags?.join(", ") || "Nenhuma"}
                  </p>
                  <p>
                    <strong>Imagens:</strong> {achievement.images?.length || 0}
                  </p>
                </div>

                {achievement.certificateUrl && (
                  <a
                    href={achievement.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink hover:text-lightPurple mt-4 inline-flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    Ver Certificado
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="card max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? "Editar" : "Novo"} Achievement
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="rounded p-2 text-gray-400 hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-6"
              >
                {/* Title Section */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      Title Key
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.titleKey}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          titleKey: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="achievements.card1.title"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                      Instituição
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.institution}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          institution: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="IBM, Meta, etc."
                    />
                  </div>
                </div>

                {/* Titles PT/EN */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Título (PT)
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.titlePt}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          titlePt: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Título em português"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Title (EN)
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.titleEn}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          titleEn: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Title in English"
                    />
                  </div>
                </div>

                {/* Date Section */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                      Date Key
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.dateKey}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          dateKey: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="achievements.card1.date"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Data (PT)
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.datePt}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          datePt: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Janeiro, 2025"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Date (EN)
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.dateEn}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          dateEn: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="January, 2025"
                    />
                  </div>
                </div>

                {/* Description Section */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-white">
                      Description Key
                    </label>
                    <input
                      type="text"
                      value={currentAchievement.descKey}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          descKey: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="achievements.card1.description"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Descrição (PT)
                    </label>
                    <textarea
                      value={currentAchievement.descPt}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          descPt: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      rows="3"
                      placeholder="Descrição em português..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Description (EN)
                    </label>
                    <textarea
                      value={currentAchievement.descEn}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          descEn: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      rows="3"
                      placeholder="Description in English..."
                    />
                  </div>
                </div>

                {/* Certificate URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                    Certificate URL
                  </label>
                  <input
                    type="url"
                    value={currentAchievement.certificateUrl}
                    onChange={(e) =>
                      setCurrentAchievement((prev) => ({
                        ...prev,
                        certificateUrl: e.target.value,
                      }))
                    }
                    className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                    placeholder="https://coursera.org/..."
                  />
                </div>

                {/* Images Section */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Imagens
                  </label>

                  {/* Upload de arquivo */}
                  <div className="mb-2">
                    <label className="bg-purple hover:bg-purple/80 inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-white">
                      <FontAwesomeIcon icon={faImage} />
                      Upload do Dispositivo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="ml-3 text-sm text-gray-400">ou</span>
                  </div>

                  {/* URL de imagem */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAchievement.imageUrl}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          imageUrl: e.target.value,
                        }))
                      }
                      className="focus:ring-purple flex-1 rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Ou cole a URL da imagem"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="bg-purple hover:bg-purple/80 rounded-lg px-4 py-3 text-white"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  {/* Preview das imagens */}
                  <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {currentAchievement.images.map((image, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg bg-gray-700"
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="h-32 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Section */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    <FontAwesomeIcon icon={faTag} className="mr-2" />
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAchievement.newTag}
                      onChange={(e) =>
                        setCurrentAchievement((prev) => ({
                          ...prev,
                          newTag: e.target.value,
                        }))
                      }
                      className="focus:ring-purple flex-1 rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Python, React, etc."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-purple hover:bg-purple/80 rounded-lg px-4 py-3 text-white"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currentAchievement.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-pink/20 text-pink flex items-center gap-2 rounded px-3 py-1 text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-pink/70 hover:text-pink"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-lg bg-gray-600 px-6 py-3 text-white hover:bg-gray-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-gradient flex items-center gap-2 rounded-lg px-6 py-3 text-white hover:opacity-90"
                  >
                    <FontAwesomeIcon icon={faSave} />
                    {editingId ? "Atualizar" : "Criar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
