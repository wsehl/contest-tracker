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
              @click="setTable('events')"
              :class="[selectedTable === 'events' ? 'bg-grey-3' : '']"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="event" />
              </q-item-section>
              <q-item-section>Events</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="setTable('organizations')"
              :class="[selectedTable === 'organizations' ? 'bg-grey-3' : '']"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="corporate_fare" />
              </q-item-section>
              <q-item-section>Organizations</q-item-section>
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
                  <q-input dense outlined label="Username" v-model="username" />
                  <q-input dense outlined label="Email" v-model="email" />
                  <q-input dense outlined label="Role" v-model="role" />
                  <q-input dense outlined label="Password" v-model="password" />
                  <q-input
                    dense
                    outlined
                    label="Password Repeat"
                    v-model="password_repeat"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn
                  color="primary"
                  size="md"
                  class=""
                  label="Save"
                  @click="insertUser"
                />
              </q-card-actions>
            </q-card>
          </q-card>
        </template>
        <template v-if="selectedTable === 'events'">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Insert to {{ selectedTable }} table</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input dense outlined label="Username" v-model="username" />
                  <q-input dense outlined label="Email" v-model="email" />
                  <q-input dense outlined label="Role" v-model="role" />
                  <q-input dense outlined label="Password" v-model="password" />
                  <q-input
                    dense
                    outlined
                    label="Password Repeat"
                    v-model="password_repeat"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn
                  color="primary"
                  size="md"
                  class=""
                  label="Save"
                  @click="insertUser"
                />
              </q-card-actions>
            </q-card>
          </q-card>
        </template>
        <template v-if="selectedTable === 'organizations'">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Insert to {{ selectedTable }} table</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    dense
                    outlined
                    label="Organization title"
                    v-model="organization_title"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn
                  color="primary"
                  size="md"
                  class=""
                  label="Save"
                  @click="insertUser"
                />
              </q-card-actions>
            </q-card>
          </q-card>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from "@/services/api.js";

export default {
  data() {
    return {
      username: "",
      email: "",
      role: "",
      password: "",
      password_repeat: "",

      organization_title: "",

      filter: "",
      mode: "list",
      selectedTable: "users",
    };
  },

  methods: {
    setTable(table) {
      this.selectedTable = table;
    },
    async insertUser() {
      try {
        const credentials = {
          username: this.username,
          email: this.email,
          role: this.role,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        console.log(credentials);
        const response = await api.pushToUsersTable(credentials);
        this.$q.notify({
          color: "positive",
          position: "bottom-left",
          message: response.msg,
          progress: true,
          timeout: 1500,
        });
        this.username = "";
        this.email = "";
        this.role = "";
        this.password = "";
        this.password_repeat = "";
      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "bottom-left",
          message: error.response.data.msg,
          progress: true,
          timeout: 1500,
        });
      }
    },
  },
};
</script>

<style>
.is-active {
  background: #f2f2f2;
}
</style>
