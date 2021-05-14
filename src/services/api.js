import axios from "axios";
import store from "@/store";

const url = `${process.env.VUE_APP_BACKEND_URL}/api`;
const api = axios.create({ baseURL: url });

const options = () => {
  const token = store.getters.getToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default {
  login(credentials) {
    return api
      .post(`/login`, credentials, options())
      .then((response) => response.data);
  },
  signup(credentials) {
    return api
      .post(`/signup`, credentials, options())
      .then((response) => response.data);
  },
  getTable(table) {
    return api
      .get(`/dashboard/${table}`, options())
      .then((response) => response.data);
  },
  insertToTable(credentials, table) {
    return api
      .post(`/dashboard/${table}`, credentials, options())
      .then((response) => response.data);
  },
  getRow(table, id) {
    return api
      .get(`/dashboard/${table}/${id}`, options())
      .then((response) => response.data);
  },
  removeRow(table, id) {
    return api
      .delete(`/dashboard/${table}/${id}`, options())
      .then((response) => response.data);
  },
  editRow(table, id, cred) {
    return api
      .put(`/dashboard/${table}/${id}`, cred, options())
      .then((response) => response.data);
  },
};
