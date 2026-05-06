import { API_ENDPOINTS } from "../config/api";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    console.error("Resposta não JSON:", text);
    throw new Error("O servidor retornou uma resposta inválida.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro na requisição.");
  }

  return data;
}

export function getProjects() {
  return request(API_ENDPOINTS.PROJECTS);
}

export function getProjectById(id) {
  return request(`${API_ENDPOINTS.PROJECTS}/${id}`);
}

export async function getProjectBySlug(slug) {
  const projects = await getProjects();

  const project = projects.find(
    (item) => item.slug === slug || item._id === slug || item.id === slug
  );

  if (!project) {
    throw new Error("Projeto não encontrado.");
  }

  return project;
}
export function createProject(project) {
  return request(API_ENDPOINTS.PROJECTS, {
    method: "POST",
    body: JSON.stringify(project),
  });
}

export function updateProject(id, project) {
  return request(`${API_ENDPOINTS.PROJECTS}/${id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
}

export function deleteProject(id) {
  return request(`${API_ENDPOINTS.PROJECTS}/${id}`, {
    method: "DELETE",
  });
}
