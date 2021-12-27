import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "http://20.211.122.248:8000/v1/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { status, data } = await http.post(apiEndpoint+"/login", { email, password });
  const { access_token } = data;
  localStorage.setItem(tokenKey, access_token);
  console.log(status);
  console.log(access_token);
  return access_token;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};