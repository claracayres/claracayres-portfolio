import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../config/api";

export default function AdminSkills() {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
      const url = editingId
        ? `${API_ENDPOINTS.SKILLS}/${editingId}`
        : API_ENDPOINTS.SKILLS;

      const method = editingId ? "PUT" : "POST";

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
        alert(editingId ? t("admin.updated") : t("admin.created"));
      } else {
        console.error("Erro ao salvar skill:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        alert(t("admin.errorSave"));
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(t("admin.errorSave"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name || "",
      percentage: skill.percentage || 0,
      category: skill.category || "programming",
      icon: skill.icon || "",
      color: skill.color || "text-pink",
    });
    setShowModal(true);
  };

  const handleDelete = async (skillId) => {
    if (!window.confirm(t("admin.confirmDelete"))) {
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
        alert(t("admin.deleted"));
      } else {
        console.error("Erro ao deletar skill:", response.status);
        alert(t("admin.errorDelete"));
      }
    } catch (error) {
      console.error("Erro ao deletar skill:", error);
      alert(t("admin.errorDelete"));
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
    setEditingId(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "percentage" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <>
      {/* Add Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="btn-gradient inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:opacity-90"
        >
          <FontAwesomeIcon icon={faPlus} />
          {t("admin.addSkill")}
        </button>
      </div>

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="card w-full max-w-md rounded-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {editingId ? t("admin.edit") : t("admin.create")}{" "}
                {t("admin.skill")}
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
                  {t("admin.category")}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="focus:border-pink w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                >
                  <option value="programming">Porcentage</option>
                  <option value="tools">Icons</option>
                  <option value="design">Design</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("admin.icon")} FontAwesome (ex: fab fa-react)
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
                  {isLoading ? t("admin.loading") : t("admin.save")}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold text-gray-300 transition-colors hover:bg-gray-700"
                >
                  {t("admin.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      {isLoading && !showModal ? (
        <div className="text-center">
          <div className="border-pink inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="mt-2 text-gray-400">{t("admin.loadingSkills")}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="card flex flex-col justify-between rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="text-purple rounded p-2 transition-colors ease-in hover:text-purple-200"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="rounded text-red-400 hover:text-pink-800"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm text-gray-300">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-gray-400">{t("admin.progress")}</span>
                    <span className="text-pink font-medium">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                    <div
                      className="from-pink to-purple h-full bg-gradient-to-r transition-all"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <p>
                  <strong>{t("admin.category")}:</strong> {skill.category}
                </p>
                {skill.icon && (
                  <p>
                    <strong>{t("admin.icon")}:</strong>{" "}
                    <i className={`${skill.icon} ${skill.color}`}></i>{" "}
                    {skill.icon}
                  </p>
                )}
              </div>
            </div>
          ))}

          {skills.length === 0 && !isLoading && (
            <div className="col-span-full text-center">
              <p className="text-gray-400">{t("admin.noSkillsFound")}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
