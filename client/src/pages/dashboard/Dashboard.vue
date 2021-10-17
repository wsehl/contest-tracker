<template>
  <div class="container mx-auto">
    <dashboard-navbar />
    <keep-alive>
      <router-view />
    </keep-alive>
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
