<template>
  <q-tabs
    class="text-grey"
    active-color="primary"
    indicator-color="transparent"
    align="justify"
    inline-label
  >
    <q-route-tab
      :ripple="false"
      :to="{ name: 'Dashboard' }"
      exact
      icon="space_dashboard"
      label="Main"
    />
    <q-route-tab
      :ripple="false"
      :to="{ name: 'DashboardUsers' }"
      exact
      icon="people"
      label="Users"
    />
  </q-tabs>
</template>
