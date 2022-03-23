import { defineStore } from "pinia";
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import { Api } from "@/api";
import { storeVar, ROLES } from "@/config";
import router from "@/router";

export const useUserStore = defineStore("user", () => {
  const user = useStorage(storeVar("user"), {
    role: ROLES.GUEST,
    username: null,
  });
  const token = useStorage(storeVar("acces_token"), "");

  const isAuthenticated = computed(() => token.value);
  const isAdmin = computed(() => user.value.role === "Admin");

  const login = async (credentials) => {
    const response = await Api.login(credentials);
    user.value = {
      ...response.user,
    };
    token.value = response.token;
    if (user.value.role === "Admin") {
      router.push({ name: "Dashboard" });
    } else {
      router.push("/");
    }
  };

  async function logout() {
    await router.push({ name: "Home" });
    user.value = {};
    token.value = "";
  }

  return { user, token, isAdmin, isAuthenticated, login, logout };
});
