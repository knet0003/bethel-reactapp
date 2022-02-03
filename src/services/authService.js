import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";
import { ConstructionOutlined } from "@mui/icons-material";

const apiEndpoint = "http://20.211.122.248:8000/v1/auth";
const tokenKey = "token";
const id = "id";
const access_token = localStorage.getItem("token");
const headers = {"Authorization": `Bearer ${access_token}`};
const headers2 = {'Authorization': `Bearer ${access_token}`,
'Content-Type': 'application/json'};

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

export function register(profile) {
  const body = {...profile};
  return http.post(apiEndpoint+"/users", body);

}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(id);
  localStorage.removeItem("email");
}


export function getProfile() {
  const idi = localStorage.getItem(id);
  console.log(headers);
  return http.get(apiEndpoint+"/users/info/"+idi, {headers: headers2});
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

export function getProfPicture() {
  const idi = localStorage.getItem("id");
 return http.get(apiEndpoint+`/users/profilepicture/${idi}`, {headers: headers});
}

export function savePicture(file) {
  const idi = localStorage.getItem("id");
  const type = file.type;
  const data = new FormData() 
        data.append('profilepic', file)
  return http.put(apiEndpoint+`/users/profilepicture/${idi}`, data,{headers: {'Authorization': `Bearer ${access_token}`,
  'Content-Type': type}});
}
export function saveProject(project) {
  const body = { ...project };
  const id = localStorage.getItem("id");
  return http.post(apiUrl+"api/v1/project/"+id, body, {headers: headers});
}


export function submitTicket(ticket) {
  const body = {...ticket};
  const id = localStorage.getItem("id");
return http.post(apiEndpoint+"/support/submitticket/"+id, body, {headers: headers});
}

export function getSystemLog() {
  const id = localStorage.getItem("id");
  return http.get(apiUrl+"api/v1/systemlog/"+id, {headers: headers});
}

export function getNetworkStatus() {
  return http.get(apiUrl+"api/v1/networkstatus", {headers: headers});
}

export function sendSMS(number) {
  const id = localStorage.getItem("id");
  const body = { mobile: number}
  return http.post(apiEndpoint+"/users/sendsms/"+id, body, {headers: headers});
}

export function verifyPhone() {

}

export default {
  login,
  loginWithJwt,
  logout,
  getJwt,
  getProfile,
  saveProfile, 
  getProfPicture,
  submitTicket,
  register
};