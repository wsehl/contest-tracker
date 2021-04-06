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
        <q-toolbar-title>CRM</q-toolbar-title>
        <q-btn flat round dense icon="fas fa-sign-out-alt" to="/" />
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-black aside"
      show-if-above
      v-model="left"
      side="left"
    >
      <q-toolbar>
        <q-toolbar-title>Dashboard</q-toolbar-title>
      </q-toolbar>
      <q-list>
        <q-item to="/dashboard" active-class="tab-active" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Main</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/dashboard/users" active-class="tab-active" exact>
          <q-item-section avatar>
            <q-icon name="people" />
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
</style>
