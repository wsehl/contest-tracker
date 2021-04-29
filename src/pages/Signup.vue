<template>
  <!-- <div>
    <h1>Sign Up</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input
      type="text"
      placeholder="Password (repeat)"
      v-model="password_repeat"
    />
    <input type="button" @click="signup" value="Sign Up" />
    <p v-if="msg">{{ msg }}</p>
  </div> -->
  <q-page class="flex flex-center">
    <q-card
      class="login-form"
      v-bind:style="
        $q.platform.is.mobile ? { width: '100%' } : { width: '30%' }
      "
    >
      <q-card-section class="bg-blue-9">
        <h4 class="text-h5 text-white q-my-sm">Create an account</h4>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input unelevated v-model="username" label="Username" lazy-rules />
          <q-input
            unelevated
            v-model="email"
            type="email"
            label="Email"
            lazy-rules
          />
          <q-input
            type="password"
            unelevated
            v-model="password"
            label="Password"
            lazy-rules
          />
          <q-input
            type="password"
            unelevated
            v-model="password_repeat"
            label="Password (repeat)"
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
          label="Sign up"
          @click="signup"
          @keydown.enter="submit"
        />
      </q-card-actions>
      <q-card-section class="text-center q-py-xs">
        <router-link to="/login" style="text-decoration: none;">
          <p class="text-grey-6">Already have an account? Login</p>
        </router-link>
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
      email: "",
      password: "",
      password_repeat: "",
    };
  },
  methods: {
    async signup() {
      try {
        const credentials = {
          username: this.username,
          email: this.email,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        const response = await api.signup(credentials);
        this.$q.notify({
          color: "positive",
          position: "bottom-left",
          message: response.msg,
          progress: true,
          timeout: 1500,
        });
        this.$router.push({ name: "Login" });
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
