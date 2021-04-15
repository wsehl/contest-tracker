<template>
  <q-layout class="bg-grey-3">
    <Navbar />
    <DashboardSidebar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import DashboardSidebar from "@/components/DashboardSidebar.vue";

export default {
  components: {
    Navbar,
    DashboardSidebar,
  },
};
</script>
