<template>
  <q-page class="flex flex-center items-center">
    <q-card flat bordered class="signup-card">
      <q-form greedy @submit="register">
        <q-card-section class="bg-blue-9">
          <h4 class="text-h5 text-white q-my-sm">Создание аккаунта</h4>
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
            v-model="user.email"
            type="email"
            unelevated
            label="Email"
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
          <q-input
            v-model="user.password_repeat"
            type="password"
            unelevated
            label="Пароль (ещё раз)"
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
            label="Зарегистрироваться"
          />
        </q-card-actions>
        <q-card-section class="text-center q-py-xs">
          <router-link to="/login" style="text-decoration: none">
            <p class="text-grey-6">Уже есть аккаунт? Войти</p>
          </router-link>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { signup } from "@/api";

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
    async register() {
      try {
        await signup(this.user);
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.signup-card
  width: 100%
  max-width: 350px
</style>
