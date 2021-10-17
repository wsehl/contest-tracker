import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    user: null,
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
      return state?.user;
    },
    getToken: (state) => {
      return state.token;
    },
    isLoggedIn: (state) => {
      return state.token;
    },
    isAdmin: (state) => {
      return state?.user?.role === "Admin";
    },
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);
    },
    logout: ({ commit }) => {
      commit("RESET");
      router.push({ name: "Home" });
    },
  },
});
