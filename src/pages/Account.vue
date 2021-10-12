<template>
  <q-page class="q-page flex column items-center q-layout-padding">
    <div class="flex column items-center q-pb-md">
      <div class="text-h3">Account</div>
    </div>
    <template v-if="!loading">
      <q-card
        flat
        bordered
        class="q-mt-md"
        :class="{ 'w-20': $q.screen.gt.md }"
      >
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input unelevated v-model="user.role" readonly label="Role" />
            <q-input unelevated v-model="user.username" label="Nickname" />
            <q-input unelevated v-model="user.email" label="Email" />
            <q-input unelevated v-model="fake.password" label="Password" />
            <div>
              <q-btn label="Update" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </template>
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
