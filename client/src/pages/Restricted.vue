<template>
  <div class="fixed-center text-center">
    <div class="text-subtitle1 q-mb-md">Страница недоступна</div>
    <q-btn color="primary" flat label="На главную" @click="goHome()" />
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
