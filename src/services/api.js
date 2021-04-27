import axios from "axios";
const url = `${process.env.VUE_APP_BACKEND_URL}/api`;

export default {
  login(credentials) {
    return axios
      .post(url + "/login", credentials)
      .then((response) => response.data);
  },
  signup(credentials) {
    return axios
      .post(url + "/signup", credentials)
      .then((response) => response.data);
  },
  getUsersTable() {
    return axios
      .get(url + "/dashboard/users")
      .then((response) => response.data);
  },
  getOrganizationsTable() {
    return axios
      .get(url + "/dashboard/organizations")
      .then((response) => response.data);
  },
  getEventsTable() {
    return axios
      .get(url + "/dashboard/events")
      .then((response) => response.data);
  },
  getTable(table) {
    return axios
      .get(url + `/dashboard/${table}`)
      .then((response) => response.data);
  },
  insertToTable(credentials, table) {
    return axios
      .post(url + `/dashboard/${table}`, credentials)
      .then((response) => response.data);
  },
};
