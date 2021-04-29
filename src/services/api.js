import axios from "axios";
import store from "../store";

const url = `${process.env.VUE_APP_BACKEND_URL}/api`;

const request = axios.create({
  headers: {
    Authorization: `Bearer ${store.getters.getToken}`,
  },
});

export default {
  async login(credentials) {
    return request
      .post(`${url}/login`, credentials)
      .then((response) => response.data);
  },
  async signup(credentials) {
    return request
      .post(`${url}/signup`, credentials)
      .then((response) => response.data);
  },
  async getTable(table) {
    return request
      .get(`${url}/dashboard/${table}`)
      .then((response) => response.data);
  },
  async insertToTable(credentials, table) {
    return request
      .post(`${url}/dashboard/${table}`, credentials)
      .then((response) => response.data);
  },
};
