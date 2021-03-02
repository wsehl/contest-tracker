import axios from "axios";
require("dotenv");

let url = process.env.BACKEND_URL || "http://localhost:5000/api/";

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
    return axios.get(url + "secret-route/").then((response) => response.data);
  },
};
