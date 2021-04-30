import axios from "axios";
import store from "@/store";

const url = `${process.env.VUE_APP_BACKEND_URL}/api`;

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
    return axios
      .post(`${url}/login`, credentials, options())
      .then((response) => response.data);
  },
  signup(credentials) {
    return axios
      .post(`${url}/signup`, credentials, options())
      .then((response) => response.data);
  },
  getTable(table) {
    return axios
      .get(`${url}/dashboard/${table}`, options())
      .then((response) => response.data);
  },
  insertToTable(credentials, table) {
    return axios
      .post(`${url}/dashboard/${table}`, credentials, options())
      .then((response) => response.data);
  },
};
