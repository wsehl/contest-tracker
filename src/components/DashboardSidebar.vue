<template>
  <q-drawer
    class="left-navigation text-black aside"
    style="border-right: 1px solid black"
    show-if-above
    v-model="left"
    side="left"
  >
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
