<template>
  <q-page class="container mx-auto q-pa-md">
    <div class="text-h3">Аккаунт</div>
    <div style="max-width: 400px">
      <q-form class="q-mt-md q-gutter-md">
        <q-input v-model="user.username" outlined label="Имя пользователя" />
        <q-input v-model="user.role" outlined readonly label="Роль" />
        <q-input v-model="user.email" outlined label="Почта" />
        <div>
          <q-btn
            label="Обновить"
            type="submit"
            class="full-width"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fake: {
        password: "*******",
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
};
</script>

<style scoped></style>
