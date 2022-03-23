import axios from "axios";
import { Notify } from "quasar";
import { useUserStore } from "@/stores/user";
import { BACKEND_URL } from "@/config";

const API_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((request) => {
  const userStore = useUserStore();
  const accessToken = userStore.accessToken;

  request.headers.Authorization = `Bearer ${accessToken}`;
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

    const originalRequest = error.config;

    const userStore = useUserStore();
    const refreshToken = userStore.refreshToken;
    const user = userStore.user;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${API_URL}/auth/refresh-token`
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(`${API_URL}/auth/refresh-token`, {
          user,
          refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            userStore.accessToken = res.data.accessToken;
            return api(originalRequest);
          }
        });
    }
  }
);

const Api = {
  login(credentials) {
    return api.post(`/auth/login`, credentials);
  },
  signup(credentials) {
    return api.post(`/auth/register`, credentials);
  },
  getTable(table) {
    return api.get(`/${table}`);
  },
  insertToTable(table, credentials) {
    return api.post(`/${table}`, credentials);
  },
  getRow(table, id) {
    return api.get(`/${table}/${id}`);
  },
  editRow(table, id, form) {
    return api.put(`/${table}/${id}`, form);
  },
  removeRow(table, id) {
    return api.delete(`/${table}/${id}`);
  },
  askQuestion(q) {
    return api.post("/help", q);
  },
};

export { api as http, Api };
