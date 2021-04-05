<template>
  <div v-if="username">
    <h1>Hi {{ username }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
  <div v-else>
    Unauthorized
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      secretMessage: "",
      username: "",
    };
  },
  async created() {
    // if (!this.$store.getters.isLoggedIn) {
    //   this.$router.push("/login");
    // }

    this.username = this.$store.getters.getUser.username;

    if (this.$store.getters.getUser.role === "Admin") {
      this.secretMessage = await AuthService.getSecretAdminContent();
    }
    if (this.$store.getters.getUser.role === "User") {
      this.secretMessage = await AuthService.getSecretContent();
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      // this.$router.go(this.$router.currentRoute);
     this.$router.push("/login");
    },
  },
};
</script>
