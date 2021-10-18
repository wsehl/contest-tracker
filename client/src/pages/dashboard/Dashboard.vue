<template>
  <div class="container mx-auto">
    <dashboard-navbar />
    <router-view />
  </div>
</template>

<script>
import DashboardNavbar from "@/components/DashboardNavbar.vue";

export default {
  components: {
    DashboardNavbar,
  },
};
</script>
