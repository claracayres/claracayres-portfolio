import { useState, useEffect } from "react";
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
  faCode,
  faGlobe,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentProject, setCurrentProject] = useState({
    titleKey: "",
    titlePt: "",
    titleEn: "",
    descKey: "",
    descPt: "",
    descEn: "",
    images: [],
    imageUrl: "",
    tags: [],
    newTag: "",
    projectUrl: "",
    githubUrl: "",
    technologies: [],
    newTechnology: "",
  });

  // Fetch projects on component mount
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
      console.error("Erro ao buscar projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentProject({
      titleKey: "",
      titlePt: "",
      titleEn: "",
      descKey: "",
      descPt: "",
      descEn: "",
      images: [],
      imageUrl: "",
      tags: [],
      newTag: "",
      projectUrl: "",
      githubUrl: "",
      technologies: [],
      newTechnology: "",
    });
    setEditingId(null);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setCurrentProject({
        titleKey: project.titleKey || "",
        titlePt: project.title?.pt || "",
        titleEn: project.title?.en || "",
        descKey: project.descKey || "",
        descPt: project.description?.pt || "",
        descEn: project.description?.en || "",
        images: project.images || [],
        imageUrl: "",
        tags: project.tags || [],
        newTag: "",
        projectUrl: project.projectUrl || "",
        githubUrl: project.githubUrl || "",
        technologies: project.technologies || [],
        newTechnology: "",
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
    if (currentProject.imageUrl.trim()) {
      setCurrentProject((prev) => ({
        ...prev,
        images: [...prev.images, prev.imageUrl.trim()],
        imageUrl: "",
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setCurrentProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = () => {
    if (currentProject.newTag.trim()) {
      setCurrentProject((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const handleRemoveTag = (index) => {
    setCurrentProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleAddTechnology = () => {
    if (currentProject.newTechnology.trim()) {
      setCurrentProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTechnology.trim()],
        newTechnology: "",
      }));
    }
  };

  const handleRemoveTechnology = (index) => {
    setCurrentProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepara as traduções
      const translations = [
        {
          key: currentProject.titleKey,
          pt: currentProject.titlePt,
          en: currentProject.titleEn,
        },
        {
          key: currentProject.descKey,
          pt: currentProject.descPt,
          en: currentProject.descEn,
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
        }
      }

      // Prepara dados do projeto
      const projectData = {
        titleKey: currentProject.titleKey || "",
        descKey: currentProject.descKey || "",
        images: currentProject.images || [],
        tags: currentProject.tags || [],
        technologies: currentProject.technologies || [],
        projectUrl: currentProject.projectUrl || "",
        githubUrl: currentProject.githubUrl || "",
      };

      console.log("Sending project data:", projectData); // Debug

      // Salva o projeto
      const url = editingId
        ? `${API_ENDPOINTS.PROJECTS}/${editingId}`
        : API_ENDPOINTS.PROJECTS;

      console.log("Sending to URL:", url); // Debug

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      console.log("Response status:", response.status); // Debug

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`,
        );
      }

      alert(editingId ? "Projeto atualizado!" : "Projeto criado!");

      // Mostra notificação de traduções automáticas se foi um novo projeto
      if (translations.length > 0 && !editingId) {
        setTimeout(() => {
          alert(
            `🌐 Traduções aplicadas automaticamente!\n${translations.map((t) => `• ${t.key}`).join("\n")}\n\n✅ Recarregue a página para ver as traduções!`,
          );
        }, 800);
      }

      fetchProjects();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar projeto!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este projeto?")) {
      try {
        // Primeiro, busca o projeto para pegar as chaves de tradução
        const projectResponse = await fetch(API_ENDPOINTS.PROJECTS);
        const allProjects = await projectResponse.json();
        const projectToDelete = allProjects.find((p) => p._id === id);

        console.log("Deleting project:", projectToDelete); // Debug

        // Deleta o projeto
        const response = await fetch(`${API_ENDPOINTS.PROJECTS}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove as traduções associadas se existirem
          if (
            projectToDelete &&
            (projectToDelete.titleKey || projectToDelete.descKey)
          ) {
            const keysToDelete = [
              projectToDelete.titleKey,
              projectToDelete.descKey,
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

          alert("Projeto deletado!");
          setTimeout(() => {
            alert(
              "🗑️ Traduções removidas automaticamente!\n\n✅ Recarregue a página para ver as mudanças!",
            );
          }, 800);
          fetchProjects();
        }
      } catch (error) {
        alert("Erro ao deletar projeto!");
        console.error("Erro:", error);
      }
    }
  };

  return (
    <div className="bg-darkBlue min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            <span className="gradient-text">Admin</span> - Projetos
          </h1>
          <p className="text-gray-400">Gerencie os projetos do portfolio</p>
        </div>

        {/* Add Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => handleOpenModal()}
            className="btn-gradient inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:opacity-90"
          >
            <FontAwesomeIcon icon={faPlus} />
            Novo Projeto
          </button>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando projetos...</p>
          </div>
        ) : (
          <div className="grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project._id} className="card rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title?.pt || project.titleKey}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-purple rounded p-2 transition-colors ease-in hover:text-purple-200"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="rounded text-red-400 hover:text-pink-800"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <strong>Tecnologias:</strong>{" "}
                    {project.technologies?.join(", ") || "Nenhuma"}
                  </p>
                  <p>
                    <strong>Tags:</strong>{" "}
                    {project.tags?.join(", ") || "Nenhuma"}
                  </p>
                  <p>
                    <strong>Imagens:</strong> {project.images?.length || 0}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink hover:text-lightPurple inline-flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faEye} />
                      Ver Projeto
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple hover:text-pink inline-flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faCode} />
                      GitHub
                    </a>
                  )}
                </div>
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
                  {editingId ? "Editar" : "Novo"} Projeto
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
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-white">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      Title Key
                    </label>
                    <input
                      type="text"
                      value={currentProject.titleKey}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          titleKey: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="projects.project1.title"
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
                      value={currentProject.titlePt}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
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
                      value={currentProject.titleEn}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          titleEn: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Title in English"
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
                      value={currentProject.descKey}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          descKey: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="projects.project1.description"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Descrição (PT)
                    </label>
                    <textarea
                      value={currentProject.descPt}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
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
                      value={currentProject.descEn}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
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

                {/* URLs Section */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      <FontAwesomeIcon icon={faLink} className="mr-2" />
                      Project URL
                    </label>
                    <input
                      type="url"
                      value={currentProject.projectUrl}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          projectUrl: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="https://projeto.vercel.app"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      <FontAwesomeIcon icon={faCode} className="mr-2" />
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={currentProject.githubUrl}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          githubUrl: e.target.value,
                        }))
                      }
                      className="focus:ring-purple w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>

                {/* Images Section */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Imagens
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentProject.imageUrl}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          imageUrl: e.target.value,
                        }))
                      }
                      className="focus:ring-purple flex-1 rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="/projects/image.png"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="bg-purple hover:bg-purple/80 rounded-lg px-4 py-3 text-white"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currentProject.images.map((image, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 rounded bg-gray-600 px-3 py-1 text-sm text-white"
                      >
                        {image}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies Section */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    Tecnologias
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentProject.newTechnology}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          newTechnology: e.target.value,
                        }))
                      }
                      className="focus:ring-purple flex-1 rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                    <button
                      type="button"
                      onClick={handleAddTechnology}
                      className="bg-purple hover:bg-purple/80 rounded-lg px-4 py-3 text-white"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 rounded bg-blue-600/20 px-3 py-1 text-sm text-blue-400"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(index)}
                          className="text-blue-400/70 hover:text-blue-400"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </span>
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
                      value={currentProject.newTag}
                      onChange={(e) =>
                        setCurrentProject((prev) => ({
                          ...prev,
                          newTag: e.target.value,
                        }))
                      }
                      className="focus:ring-purple flex-1 rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:outline-none"
                      placeholder="Web App, Full Stack, etc."
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
                    {currentProject.tags.map((tag, index) => (
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
