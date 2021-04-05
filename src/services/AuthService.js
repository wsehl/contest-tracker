import axios from "axios";
let url = process.env.VUE_APP_BACKEND_URL || "http://localhost:8888/api/";

export default {
  login(credentials) {
    return axios
      .post(url + "login/", credentials)
      .then((response) => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + "sign-up/", credentials)
      .then((response) => response.data);
  },
  getSecretContent() {
    return axios.get(url + "user/").then((response) => response.data);
  },
  getSecretAdminContent() {
    return axios.get(url + "admin/").then((response) => response.data);
  },
};
