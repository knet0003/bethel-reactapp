import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/projects";

function projectUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProjects() {
  return http.get(apiEndpoint);
}

export function getProject(projectId) {
  return http.get(projectUrl(projectId));
}

export function createProject(project) {
}

export function saveProject(project) {
  if (project._id) {
    const body = { ...project };
    delete body._id;
    return http.put(projectUrl(project._id), body);
  }

  return http.post(apiEndpoint, project);
}

export function deleteProject(projectId) {
  return http.delete(projectUrl(projectId));
}
