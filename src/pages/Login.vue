<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-form @submit="login" greedy>
        <q-card-section class="bg-blue-9">
          <h4 class="text-h5 text-white q-my-sm">Login</h4>
        </q-card-section>
        <q-card-section>
          <q-input
            unelevated
            v-model="username"
            label="Username"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="password"
            unelevated
            v-model="password"
            label="Password"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            type="submit"
            unelevated
            color="primary"
            size="md"
            class="full-width"
            label="Login"
            ref="submitBtn"
          />
        </q-card-actions>
        <q-card-section class="text-center q-py-xs">
          <router-link to="/signup" style="text-decoration: none;">
            <p class="text-grey-6">Not reigistered? Created an account</p>
          </router-link>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import api from "@/services/api.js";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },

  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await api.login(credentials);
        const token = response.token;
        const user = response.user;
        this.$store.dispatch("login", { token, user });
        if (this.$store.state.user.role === "Admin") {
          this.$router.push({ name: "Dashboard" });
        } else {
          this.$router.push("/");
        }
        this.$refs.submitBtn.disable = true;
        this.$q.notify({
          color: "positive",
          position: "bottom-left",
          message: response.msg,
          progress: true,
          timeout: 1500,
        });
      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "bottom-left",
          message: error.response.data.msg,
          progress: true,
          timeout: 1500,
        });
      }
    },
  },
};
</script>
