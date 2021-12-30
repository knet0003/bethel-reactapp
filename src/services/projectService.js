import http from "./httpService";
import { apiUrl } from "../config.json";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";

const apiEndpoint = apiUrl + "api/v1/project";
const access_token = localStorage.getItem("token");
const id = localStorage.getItem("id");
const headers = {'Authorization': `Bearer ${access_token}`,
'Content-Type': 'application/x-www-form-urlencoded'};
const header2 = {'Authorization': `Bearer ${access_token}`};

function projectUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProjects() {
   return http.get(
        apiEndpoint+"/"+id,
        {
          headers: headers
        }
      );
     }

export function getProject(projectId) {
  return http.get(projectUrl(projectId));
}

export function saveProject(project) {
    const body = { ...project };
    const id = localStorage.getItem("id");
    return http.post(apiEndpoint+"/"+id, body, {headers: header2});
}

export function sendDeleteProject(projectId) {
  return http.post(apiEndpoint+`/delete/confirmcode/${projectId}/${id}`,"",{headers: header2});
}

export function deleteProject(projectId, otp) {
  return http.delete(apiEndpoint+`/${projectId}/${id}/${otp}`, {headers: headers})
}
