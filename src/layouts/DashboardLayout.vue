<template>
  <q-layout class="bg-grey-3">
    <Navbar />
    <DashboardSidebar />
    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col full-height" visible>
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
