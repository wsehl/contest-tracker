<template>
  <q-page class="flex flex-center items-center">
    <q-card flat bordered class="login-card">
      <q-form greedy @submit="authenticate">
        <q-card-section class="bg-blue-9">
          <h4 class="text-h5 text-white q-my-sm">Авторизация</h4>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="user.username"
            autofocus
            unelevated
            label="Имя пользователя"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            v-model="user.password"
            type="password"
            unelevated
            label="Пароль"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            ref="submitBtn"
            type="submit"
            unelevated
            color="primary"
            size="md"
            class="full-width"
            label="Войти"
          />
        </q-card-actions>
        <q-card-section class="text-center q-py-xs">
          <router-link to="/signup" style="text-decoration: none">
            <p class="text-grey-6">Не зарегестрированы? Создать аккаунт</p>
          </router-link>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { login } from "@/api";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async authenticate() {
      try {
        const response = await login(this.user);
        const token = response.token;
        const user = response.user;
        this.$store.dispatch("login", { token, user });
        if (this.$store.state.user.role === "Admin") {
          this.$router.push({ name: "Dashboard" });
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 350px
</style>
