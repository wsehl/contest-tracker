<template>
  <q-page class="container mx-auto q-pa-md">
    <div class="text-h3">Account</div>
    <div style="max-width: 400px">
      <q-form class="q-mt-md q-gutter-md">
        <q-input outlined v-model="user.username" label="Username" />
        <q-input outlined v-model="user.role" readonly label="Role" />
        <q-input outlined v-model="user.email" label="Email" />
        <div>
          <q-btn
            label="Update"
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
