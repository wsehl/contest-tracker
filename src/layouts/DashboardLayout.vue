<template>
  <q-layout class="bg-grey-3">
    <main-navbar />
    <q-page-container>
      <dashboard-sidebar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainNavbar from "@/components/Navbar.vue";
import DashboardSidebar from "@/components/DashboardSidebar.vue";

export default {
  components: {
    MainNavbar,
    DashboardSidebar,
  },
};
</script>
