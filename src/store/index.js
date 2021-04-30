import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

import router from "../router";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    user: {},
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getToken: (state) => {
      return state.token;
    },
    isLoggedIn: (state) => {
      return state.token;
    },
    isAdmin: (state) => {
      if (state.user.role === "Admin") {
        return true;
      } else {
        return false;
      }
    },
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit("RESET", "");
      router.push({ name: "Home" });
    },
  },
});
