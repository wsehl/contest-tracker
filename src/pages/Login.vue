<template>
  <!-- <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <p v-if="msg">{{ msg }}</p>
  </div> -->
  <q-page class="flex flex-center">
    <q-card
      class="login-form"
      v-bind:style="
        $q.platform.is.mobile ? { width: '100%' } : { width: '30%' }
      "
    >
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input unelevated v-model="username" label="Username" lazy-rules />
          <q-input
            type="password"
            unelevated
            v-model="password"
            label="Password"
            lazy-rules
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Login"
          @click="login"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">Not reigistered? Created an Account</p>
      </q-card-section>
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
      msg: "",
    };
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

        this.msg = response.msg;
        this.$q.notify({
          color: "positive",
          position: "bottom-left",
          message: "Login Successful",
          progress: true,
          timeout: 1500,
        });
        this.$store.dispatch("login", { token, user });
        this.$router.push("/");
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
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>
