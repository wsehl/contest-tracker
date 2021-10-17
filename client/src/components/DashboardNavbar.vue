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
      label="Пользователи"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardOrganizations',
      }"
      exact
      icon="corporate_fare"
      label="Организации"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardEvents',
      }"
      exact
      icon="event"
      label="Конкурсы"
    />
  </q-tabs>
</template>
