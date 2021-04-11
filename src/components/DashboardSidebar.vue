<template>
  <q-drawer class="left-navigation" show-if-above side="left">
    <q-list>
      <q-item to="/dashboard" active-class="bg-grey-4" exact>
        <q-item-section avatar class="q-ml-sm">
          <q-icon name="space_dashboard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Main</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/dashboard/users" active-class="bg-grey-4" exact>
        <q-item-section avatar>
          <q-icon name="people" class="q-ml-sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Users</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
