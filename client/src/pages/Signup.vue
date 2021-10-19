<template>
  <q-page class="flex flex-center items-center">
    <q-card flat bordered class="signup-card">
      <q-form @submit="register" greedy>
        <q-card-section class="bg-blue-9">
          <h4 class="text-h5 text-white q-my-sm">Создание аккаунта</h4>
        </q-card-section>
        <q-card-section>
          <q-input
            autofocus
            unelevated
            v-model="user.username"
            label="Имя пользователя"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="email"
            unelevated
            v-model="user.email"
            label="Email"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="password"
            unelevated
            v-model="user.password"
            label="Пароль"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            type="password"
            unelevated
            v-model="user.password_repeat"
            label="Пароль (ещё раз)"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
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
            label="Зарегистрироваться"
            ref="submitBtn"
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
        const response = await signup(this.user);
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

<style lang="sass" scoped>
.signup-card
  width: 100%
  max-width: 350px
</style>
