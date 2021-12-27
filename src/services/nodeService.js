import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/nodes";

function nodeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getNodes() {
  return http.get(apiEndpoint);
}

export function getNode(nodeId) {
  return http.get(nodeUrl(nodeId));
}

export function saveNode(node) {
  if (node._id) {
    const body = { ...node };
    delete body._id;
    return http.put(nodeUrl(node._id), body);
  }

  return http.post(apiEndpoint, node);
}

export function deleteNode(nodeId) {
  return http.delete(nodeUrl(nodeId));
}
