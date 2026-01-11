// Configuração da API baseada no ambiente
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "" : "http://localhost:5000");

export const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/projects`,
  SKILLS: `${API_BASE_URL}/api/skills`,
  ACHIEVEMENTS: `${API_BASE_URL}/api/achievements`,
  TRANSLATIONS: `${API_BASE_URL}/api/translations`,
};

export default API_BASE_URL;
