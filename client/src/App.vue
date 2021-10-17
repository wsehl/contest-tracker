<template>
  <div id="q-app">
    <q-layout class="bg-grey-1" view="hHh lpR fFf">
      <app-navbar />
      <q-page-container>
        <keep-alive>
          <router-view />
        </keep-alive>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
  },
};
</script>
