import axios from "axios";
let url = process.env.VUE_APP_BACKEND_URL || "http://localhost:8888/api/";

export default {
  login(credentials) {
    return axios
      .post(url + "login/", credentials)
      .then((response) => response.data);
  },
  signup(credentials) {
    return axios
      .post(url + "signup/", credentials)
      .then((response) => response.data);
  },
  getSecretContent() {
    return axios.get(url + "user/").then((response) => response.data);
  },
  getSecretAdminContent() {
    return axios.get(url + "admin/").then((response) => response.data);
  },
  getUsersTable() {
    return axios.get(url + "dashboard/users").then((response) => response.data);
  },
  pushToUsersTable(credentials) {
    return axios
      .post(url + "dashboard/post/users/", credentials)
      .then((response) => response.data);
  },
};
