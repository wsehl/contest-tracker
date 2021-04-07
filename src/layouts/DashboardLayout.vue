<template>
  <q-layout view="lHh LpR lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense icon="home" to="/">
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >Go to home page</q-tooltip
          >
        </q-btn>
        <q-btn flat round dense icon="logout" @click="logout">
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >Logout</q-tooltip
          >
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-black aside"
      style="border-right: 1px solid black"
      show-if-above
      v-model="left"
      side="left"
    >
      <q-toolbar style="background: rgb(4 108 212); color: white;">
        <q-toolbar-title>Dashboard</q-toolbar-title>
      </q-toolbar>
      <q-list>
        <q-item to="/dashboard" active-class="tab-active" exact>
          <q-item-section avatar>
            <q-icon name="space_dashboard" class="text-dark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Main</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/dashboard/users" active-class="tab-active" exact>
          <q-item-section avatar>
            <q-icon name="people" class="text-dark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
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
export default {
  data() {
    return {
      left: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
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
