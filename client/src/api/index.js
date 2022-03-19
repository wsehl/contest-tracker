import axios from "axios";
import { useUserStore } from "@/stores/user";
import { Notify } from "quasar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8889";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((request) => {
  const userStore = useUserStore();
  const token = userStore.token;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
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
    return api.get(`/dashboard/${table}/${id}`);
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
