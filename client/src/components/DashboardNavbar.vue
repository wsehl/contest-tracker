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
      :to="{
        name: 'DashboardUsers',
      }"
      exact
      icon="people"
      label="Users"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardUsers',
      }"
      exact
      icon="corporate_fare"
      label="Organizations"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardUsers',
      }"
      exact
      icon="event"
      label="Events"
    />
  </q-tabs>
</template>
