<template>
  <q-page class="flex flex-center">
    <q-card :class="{ 'w-20': $q.screen.gt.lg }">
      <q-form @submit="signup" greedy>
        <q-card-section class="bg-blue-9">
          <h4 class="text-h5 text-white q-my-sm">Create an account</h4>
        </q-card-section>
        <q-card-section>
          <q-input
            autofocus
            unelevated
            v-model="user.username"
            label="Username"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="email"
            unelevated
            v-model="user.email"
            label="Email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="password"
            unelevated
            v-model="user.password"
            label="Password"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="password"
            unelevated
            v-model="user.password_repeat"
            label="Password (repeat)"
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
            label="Sign up"
            ref="submitBtn"
          />
        </q-card-actions>
        <q-card-section class="text-center q-py-xs">
          <router-link to="/login" style="text-decoration: none;">
            <p class="text-grey-6">Already have an account? Login</p>
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
      user: {
        username: "",
        email: "",
        password: "",
        password_repeat: "",
      },
    };
  },
  methods: {
    async signup() {
      try {
        const response = await api.signup(this.user);
        this.$router.push({ name: "Login" });
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
