<template>
  <q-page class="flex flex-center items-center">
    <q-card flat bordered class="login-card">
      <q-form greedy @submit="login">
        <q-card-section class="bg-blue-9">
          <h4 class="text-h5 text-white q-my-sm">Авторизация</h4>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="form.username"
            autofocus
            unelevated
            label="Имя пользователя"
            :rules="[(val) => (val && val.length > 0) || 'Заполните это поле']"
            :lazy-rules="'ondemand'"
            no-error-icon
          />
          <q-input
            v-model="form.password"
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
            :disable="loading"
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

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { createAsyncProcess } from "@/composable/useAsync";

const userStore = useUserStore();

const form = ref({
  username: "",
  password: "",
});

const { run: login, loading } = createAsyncProcess(async () => {
  await userStore.login(form.value);
});
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 350px
</style>
