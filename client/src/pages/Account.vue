<template>
  <q-page class="container mx-auto q-pa-md">
    <div style="max-width: 400px">
      <q-form class="q-mt-md q-gutter-sm">
        <div class="text-h5">Аккаунт</div>
        <q-input
          v-model="accountData.username"
          outlined
          readonly
          dense
          label="Имя пользователя"
          :loading="loading"
        />
        <q-input
          v-model="accountData.email"
          outlined
          readonly
          dense
          label="Почта"
          :loading="loading"
        />
        <q-input
          v-model="accountData.role"
          outlined
          readonly
          dense
          label="Роль"
          :loading="loading"
        />
      </q-form>
      <q-form class="q-mt-lg q-gutter-sm" @submit="updatePassword">
        <div class="text-h5">Пароль</div>
        <q-input
          class="q-mb-md"
          v-model="password"
          outlined
          dense
          :type="isPwd ? 'password' : 'text'"
          :loading="loadingPassword"
        >
          <template #append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div>
          <q-btn
            label="Изменить пароль"
            type="submit"
            class="full-width"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { http } from "@/api";
import { createAsyncProcess } from "@/composable/useAsync";

const userStore = useUserStore();

const accountData = ref({
  username: "",
  email: "",
  role: "",
});

const password = ref("");
const isPwd = ref(true);

const { run: fetchData, loading } = createAsyncProcess(async () => {
  const { data } = await http.get(`/users/${userStore.user.username}`);
  accountData.value = data;
});

const { run: updatePassword, loading: loadingPassword } = createAsyncProcess(
  async () => {
    await http.post("/users/password", {
      password: password.value,
    });
  }
);

fetchData();
</script>
