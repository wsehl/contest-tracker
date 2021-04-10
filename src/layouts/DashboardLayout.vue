<template>
  <q-layout view="hHh lpR fff">
    <Navbar />
    <DashboardSidebar />
    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
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

<style>
.navigation-item {
  border-radius: 5px;
}
.aside {
  background-color: rgb(239 239 239);
  border-right: 1px solid #d4d4d4;
}
.tab-active {
  background-color: #dedede;
}
body {
  background: #f1f1f1 !important;
}
</style>
