import axios from "axios";
import store from "@/store";

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL || "http://localhost:8889";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use((request) => {
  const token = store.getters.getToken;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export function login(credentials) {
  return api.post(`/login`, credentials);
}
export function signup(credentials) {
  return api.post(`/signup`, credentials);
}
export function getTable(table) {
  return api.get(`/dashboard/${table}`);
}
export function insertToTable(credentials, table) {
  return api.post(`/dashboard/${table}`, credentials);
}
export function getRow(table, id) {
  return api.get(`/dashboard/${table}/${id}`);
}
export function removeRow(table, id) {
  return api.delete(`/dashboard/${table}/${id}`);
}
export function removeSeveralRows(table, cred) {
  return api.post(`/dashboard/delete/${table}`, cred);
}
export function editRow(table, id, cred) {
  return api.put(`/dashboard/${table}/${id}`, cred);
}
