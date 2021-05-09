<template>
  <q-layout class="bg-grey-1">
    <main-navbar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainNavbar from "@/components/Navbar.vue";

export default {
  components: {
    MainNavbar,
  },
};
</script>
