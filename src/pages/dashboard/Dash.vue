<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">
              Add
            </div>
          </q-card-section>
          <q-separator inset></q-separator>
          <q-list separator>
            <q-item
              clickable
              v-ripple
              @click="setTable('users')"
              :class="[selectedTable === 'users' ? 'bg-grey-3' : '']"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="people" />
              </q-item-section>
              <q-item-section>Users</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              @click="setTable('events')"
              :class="[selectedTable === 'events' ? 'bg-grey-3' : '']"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="event" />
              </q-item-section>
              <q-item-section>Events</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
        <template v-if="selectedTable === 'users'">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Insert to {{ selectedTable }} table</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input dense outlined label="Username" />
                  <q-input dense outlined label="Password" />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn color="primary" size="md" class="" label="Save" />
              </q-card-actions>
            </q-card>
          </q-card>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      mode: "list",
      selectedTable: "users",
    };
  },
  methods: {
    setTable(table) {
      this.selectedTable = table;
    },
  },
};
</script>

<style>
.is-active {
  background: #f2f2f2;
}
</style>
