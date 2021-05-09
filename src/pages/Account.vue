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
            <q-input unelevated v-model="user.first_name" label="First Name" />
            <q-input unelevated v-model="user.last_name" label="Last Name" />
            <q-input unelevated v-model="user.age" label="Age" />
            <q-input unelevated v-model="user.email" label="Email" />
            <q-input unelevated v-model="user.phone" label="Phone" />
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
export default {
  data() {
    return {
      loading: false,
      user: {
        first_name: "Mayank",
        last_name: "Patel",
        age: 30,
        email: "m******@****.com",
        phone: "98******23",
      },
    };
  },
};
</script>

<style scoped></style>
