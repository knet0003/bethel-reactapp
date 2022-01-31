import http from "./httpService";
import { apiUrl } from "../config.json";


const apiEndpoint = apiUrl + "api/v1/node";
const access_token = localStorage.getItem("token");
const id = localStorage.getItem("id");
const headers = {'Authorization': `Bearer ${access_token}`,
'Content-Type': 'application/json'};
const header2 = {'Authorization': `Bearer ${access_token}`};

function nodeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getNodes() {
  return http.get(
    apiUrl+"api/v1/azurenodes/"+id,
    {
      headers: headers
    }
  );
}

export function getNode(nodeId) {
  return http.get(nodeUrl(nodeId));
}

export function saveNode(node) {
  const body = { ...node };
    return http.post(apiEndpoint+"/"+id, body, {headers: headers});
}


export function sendDeleteNode(nodeId, projectId) {
  const idi = localStorage.getItem("id");
  return http.post(apiEndpoint+`/delete/confirmcode/${projectId}/${nodeId}/${idi}`,"",{headers: header2});
}

export function deleteNode(projectId, nodeId, otp) {
  const idi = localStorage.getItem("id");
  return http.delete(apiEndpoint+`/${projectId}/${nodeId}/${idi}/${otp}`, {headers: headers})
}
