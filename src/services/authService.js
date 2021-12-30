import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "http://20.211.122.248:8000/v1/auth";
const tokenKey = "token";
const id = "id";
const access_token = localStorage.getItem("token");
const headers = {"Authorization": `Bearer ${access_token}`};

http.setJwt(getJwt());

export async function login(email, password) {
  const { status, data } = await http.post(apiEndpoint+"/login", { email: email, password: password });
if (status === 200){
  const { access_token, user_id } = data;


  localStorage.setItem(tokenKey, access_token);
  localStorage.setItem(id, user_id);
  localStorage.setItem("email", email)
  console.log(status);
  console.log(access_token);
  console.log(user_id);
  window.location.reload(false);
  return access_token;
}
else 
{
  return "error"
}
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(id);
  localStorage.removeItem("email");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getProfile() {
  const email = localStorage.getItem("email")
  console.log(headers);
  http.get(apiEndpoint+"/users/info/"+localStorage.getItem(id), {"email": email},{headers: headers});
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function saveProfile(profile) {
  if (profile._id) {
    const id= localStorage.getItem("id")
    console.log(id);
    const body = { ...profile };
    delete body._id;
    return http.put(apiEndpoint+"/users/info/"+id, body, {headers: headers});
  }
}

export function saveProject(project) {
  const body = { ...project };
  const id = localStorage.getItem("tokenKey");
  return http.post(apiUrl+"/api/v1/project/"+id, body, {headers: headers});
}




export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getProfile,
  saveProfile
};