import axios from "axios";
import store from "@/store";
import { Notify } from "quasar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8889";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.msg) {
      Notify.create({
        color: "positive",
        position: "bottom-left",
        message: response.data.msg,
        progress: true,
        timeout: 1500,
      });
    }
    return response.data;
  },
  (error) => {
    if (error?.response?.data?.msg) {
      Notify.create({
        color: "negative",
        position: "bottom-left",
        message: error.response.data.msg,
        progress: true,
        timeout: 1500,
      });
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((request) => {
  const token = store.getters.getToken;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export const Api = {
  login(credentials) {
    return api.post(`/auth/login`, credentials);
  },
  signup(credentials) {
    return api.post(`/auth/register`, credentials);
  },
  getTable(table) {
    return api.get(`/dashboard/${table}`);
  },
  insertToTable(table, credentials) {
    return api.post(`/dashboard/${table}`, credentials);
  },
  getRow(table, id) {
    return api.get(`/dashboard/${table}s/${id}`);
  },
  editRow(table, id, form) {
    return api.put(`/dashboard/${table}/${id}`, form);
  },
  removeRow(table, id) {
    return api.delete(`/dashboard/${table}/${id}`);
  },
  askQuestion(q) {
    return api.post("/help", q);
  },
};

export function login(credentials) {
  return api.post(`/auth/login`, credentials);
}
export function signup(credentials) {
  return api.post(`/auth/register`, credentials);
}
export function getTable(table) {
  return api.get(`/dashboard/${table}`);
}
export function insertToTable(table, credentials) {
  return api.post(`/dashboard/${table}`, credentials);
}
export function getRow(table, id) {
  return api.get(`/dashboard/${table}s/${id}`);
}
export function removeRow(table, id) {
  return api.delete(`/dashboard/${table}s/${id}`);
}
export function removeSeveralRows(table, cred) {
  return api.post(`/dashboard/delete/${table}`, cred);
}
export function editRow(table, id, cred) {
  return api.put(`/dashboard/${table}/${id}`, cred);
}
export function askQuestion(q) {
  return api.post("/help", q);
}
