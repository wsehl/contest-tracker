<template>
  <q-tabs
    class="text-grey"
    active-color="primary"
    indicator-color="transparent"
    align="justify"
    no-caps
    dense
  >
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
        name: 'DashboardProjects',
      }"
      exact
      icon="history_edu"
      label="Проекты"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardWinners',
      }"
      exact
      icon="leaderboard"
      label="Результаты"
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
        name: 'DashboardGrades',
      }"
      exact
      icon="school"
      label="Классы"
    />
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
        name: 'DashboardTeachers',
      }"
      exact
      icon="people"
      label="Учителя"
    />
    <q-route-tab
      :ripple="false"
      :to="{
        name: 'DashboardStudents',
      }"
      exact
      icon="groups"
      label="Ученики"
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
        name: 'DashboardSubjects',
      }"
      exact
      icon="history_edu"
      label="Предметы"
    />
  </q-tabs>
</template>
