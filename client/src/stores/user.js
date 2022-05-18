import { defineStore } from "pinia";
import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import { Api } from "@/api";
import { ROLES } from "@/config";
import router from "@/router";

export const useUserStore = defineStore("user", () => {
  const user = useStorage("ct_user", {
    role: ROLES.GUEST,
    username: null,
    useId: null,
  });

  const accessToken = useStorage("ct_access_token", "");
  const refreshToken = useStorage("ct_refresh_token", "");

  const isAuthenticated = computed(() => accessToken.value);
  const isAdmin = computed(() => user.value.role === "Admin");

  const login = async (credentials) => {
    const response = await Api.login(credentials);

    user.value = {
      ...response.user,
    };
    accessToken.value = response.accessToken;
    refreshToken.value = response.refreshToken;

    if (user.value.role === "Admin") {
      router.push({ name: "Dashboard" });
    } else {
      router.push("/");
    }
  };

  async function logout() {
    await router.push({ name: "Home" });
    user.value = {};
    accessToken.value = "";
    refreshToken.value = "";
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAdmin,
    isAuthenticated,
    login,
    logout,
  };
});
