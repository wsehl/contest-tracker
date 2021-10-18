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
      icon="assignment_ind"
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
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardCurators',
      }"
      exact
      icon="engineering"
      label="Кураторы"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardGrades',
      }"
      exact
      icon="school"
      label="Классы"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardStudents',
      }"
      exact
      icon="people"
      label="Ученики"
    />
  </q-tabs>
</template>
