import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

const AdminSkills = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    percentage: 0,
    category: "programming", // programming, tools, design
    icon: "",
    color: "text-pink",
  });

  // Fetch skills from API
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.SKILLS);
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        console.error("Erro ao buscar skills:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Determina se é criação ou edição
      const url = editingSkill
        ? `${API_ENDPOINTS.SKILLS}/${editingSkill._id}`
        : API_ENDPOINTS.SKILLS;

      const method = editingSkill ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Skill salvo:", result);

        // Recarrega a lista
        await fetchSkills();

        // Limpa o formulário
        resetForm();
      } else {
        console.error("Erro ao salvar skill:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || "",
      percentage: skill.percentage || 0,
      category: skill.category || "programming",
      icon: skill.icon || "",
      color: skill.color || "text-pink",
    });
    setShowForm(true);
  };

  const handleDelete = async (skillId) => {
    if (!window.confirm("Tem certeza que deseja deletar este skill?")) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_ENDPOINTS.SKILLS}/${skillId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Skill deletado com sucesso");
        await fetchSkills();
      } else {
        console.error("Erro ao deletar skill:", response.status);
      }
    } catch (error) {
      console.error("Erro ao deletar skill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      percentage: 0,
      category: "programming",
      icon: "",
      color: "text-pink",
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "percentage" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="from-darkBlue to-darkBlue/95 min-h-screen bg-gradient-to-b py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <h1 className="mb-4 text-4xl font-bold">
                Admin <span className="gradient-text">Skills</span>
              </h1>
              <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                Achievements
              </button>
              <button
                onClick={() => navigate("/admin-projects")}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
              >
                Projects
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
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="from-pink to-purple rounded-lg bg-gradient-to-r px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Adicionar Skill
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="card w-full max-w-md rounded-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {editingSkill ? "Editar" : "Adicionar"} Skill
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Nome do Skill
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="focus:border-pink w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Porcentagem (0-100)
                  </label>
                  <input
                    type="number"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="focus:border-pink w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Categoria
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="focus:border-pink w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="programming">Programming</option>
                    <option value="tools">Tools</option>
                    <option value="design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Ícone FontAwesome (ex: fab fa-react)
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="fab fa-react"
                    className="focus:border-pink w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Cor</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="focus:border-pink w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="text-pink">Pink</option>
                    <option value="text-purple">Purple</option>
                    <option value="text-blue-400">Blue</option>
                    <option value="text-green-400">Green</option>
                    <option value="text-yellow-400">Yellow</option>
                    <option value="text-red-400">Red</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="from-pink to-purple flex-1 rounded-lg bg-gradient-to-r px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {isLoading ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold text-gray-300 transition-colors hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Skills List */}
        {isLoading && !showForm ? (
          <div className="text-center">
            <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-400">Carregando...</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="card w-full max-w-sm rounded-lg p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold">{skill.name}</h3>

                    {/* Progress Bar */}
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-gray-400">Progresso</span>
                      <span className="text-pink text-sm font-medium">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="skill-bar mb-4">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>

                    {/* Icon Preview */}
                    {skill.icon && (
                      <div className="mb-4 text-center">
                        <i
                          className={`${skill.icon} text-4xl ${skill.color}`}
                        ></i>
                      </div>
                    )}

                    <div className="space-y-2 text-sm text-gray-400">
                      <p>
                        <strong>Categoria:</strong> {skill.category}
                      </p>
                      {skill.icon && (
                        <p>
                          <strong>Ícone:</strong> {skill.icon}
                        </p>
                      )}
                      <p>
                        <strong>Cor:</strong>{" "}
                        <span className={skill.color}>●</span> {skill.color}
                      </p>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="text-purple rounded p-2 transition-colors hover:text-white"
                      title="Editar"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="text-pink rounded p-2 transition-colors hover:text-white"
                      title="Deletar"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {skills.length === 0 && !isLoading && (
              <div className="col-span-full text-center">
                <p className="text-gray-400">Nenhum skill encontrado.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;
