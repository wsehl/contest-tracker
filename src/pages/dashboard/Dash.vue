<template>
  <q-page>
    <div class="row q-col-gutter-sm q-pa-sm">
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
              @click="setTable('organizations')"
              :class="[selectedTable === 'organizations' ? 'bg-grey-3' : '']"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="corporate_fare" />
              </q-item-section>
              <q-item-section>Organizations</q-item-section>
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
              @click="setTable('grades')"
              :class="[selectedTable === 'grades' ? 'bg-grey-3' : '']"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="school" />
              </q-item-section>
              <q-item-section>Grades</q-item-section>
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
                  <q-select
                    dense
                    outlined
                    v-model="role"
                    :options="role_options"
                    label="Role"
                  />
                  <!-- <q-input dense outlined label="Password" v-model="password" /> -->
                  <!-- <q-icon
                    name="swap_vert"
                    class="cursor-pointer"
                    @click="updateGeneratedPassword"
                  /> -->
                  <q-input
                    dense
                    outlined
                    type="text"
                    autocomplete="off"
                    v-model="generatedPassword"
                    label="Generated password"
                  >
                  </q-input>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon
                        name="swap_vert"
                        class="cursor-pointer"
                        @click="updateGeneratedPassword"
                      />
                    </q-item-section>
                    <q-item-section>
                      <div>
                        <q-badge :color="strengthColor">
                          Password strength:
                        </q-badge>
                        <q-slider
                          snap
                          label
                          :step="12"
                          :min="0"
                          :max="48"
                          :color="strengthColor"
                          :label-value="strengthLabel"
                          v-model="strengthLevel"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn
                  color="primary"
                  size="md"
                  class=""
                  label="Save"
                  @click="insertTo('users')"
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
                    v-model="organization_name"
                  />
                  <q-uploader
                    :factory="uploadFile"
                    auto-upload
                    accept=".jpg, image/*"
                    ref="organization_uploader"
                    :hide-upload-btn="true"
                    @rejected="onRejected"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn
                  color="primary"
                  size="md"
                  class=""
                  label="Save"
                  @click="insertTo('organizations')"
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
                  <q-input dense outlined label="Title" v-model="event_title" />
                  <q-select
                    dense
                    outlined
                    v-model="event_organization"
                    :options="event_organization_options"
                    label="Organization"
                    input-debounce="0"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <q-input
                    dense
                    outlined
                    label="Description"
                    v-model="event_description"
                    type="textarea"
                  />
                  <q-date v-model="event_range" range />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md q-mb-md">
                <q-btn
                  color="primary"
                  size="md"
                  class=""
                  label="Save"
                  @click="insertTo('events')"
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
/* eslint-disable no-unused-vars */
import api from "@/services/api.js";

export default {
  data() {
    return {
      selectedTable: "organizations",
      strengthLevel: 24,

      username: "",
      email: "",
      role: "",
      role_options: ["User", "Curator", "Teacher", "Admin"],

      organization_name: "",
      organization_data: null,

      event_title: "",
      event_organization: "",
      event_description: "",
      event_organization_options: [],
      event_range: { from: "", to: "" },
    };
  },

  methods: {
    setTable(table) {
      this.selectedTable = table;
      if (table === "events") {
        this.getOrganizations();
      }
    },
    async getOrganizations() {
      try {
        const response = await api.getOrganizationsTable();
        response.data.forEach((obj) =>
          this.renameKey(obj, "organization_name", "label")
        );
        this.event_organization_options = response.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    renameKey(obj, old_key, new_key) {
      if (old_key !== new_key) {
        Object.defineProperty(
          obj,
          new_key,
          Object.getOwnPropertyDescriptor(obj, old_key)
        );
        delete obj[old_key];
      }
    },
    async insertTo(table) {
      try {
        let credentials = {};
        let response;
        const user_credentials = {
          username: this.username,
          email: this.email,
          role: this.role,
          password: this.generatedPassword,
        };
        const event_credentials = {
          event_organization: this.event_organization.id,
          event_title: this.event_title,
          event_description: this.event_description,
          event_start_date: this.event_range.from,
          event_end_date: this.event_range.to,
        };
        if (table === "organizations") {
          this.organization_data.append(
            "organization_name",
            this.organization_name
          );
          response = await api.insertToTable(this.organization_data, table);
          this.organization_name = "";
          this.$refs.organization_uploader.reset();
        } else if (table === "users") {
          credentials = user_credentials;
          response = await api.insertToTable(credentials, table);
          this.updateGeneratedPassword();
          this.username = "";
          this.email = "";
          this.role = "";
          this.password = "";
        } else if (table === "events") {
          credentials = event_credentials;
          response = await api.insertToTable(credentials, table);
          this.event_title = "";
          this.event_organization = "";
          this.event_description = "";
          this.event_range.from = "";
          this.event_range.to = "";
        } else {
          response = null;
        }
        this.$q.notify({
          color: "positive",
          position: "bottom-left",
          message: response.msg,
          progress: true,
          timeout: 1500,
        });
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
    uploadFile(files) {
      let file_path = files[0];
      this.organization_data = new FormData();
      this.organization_data.append("file", file_path);
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },
    // needs refactoring
    updateGeneratedPassword() {
      this.strengthLevel = this.strengthLevel + 1;
      this.strengthLevel = this.strengthLevel - 1;
    },
  },
  computed: {
    generatedPassword() {
      let charactersArray = "a-z".split(",");
      let CharacterSet = "";
      let password = "";
      let size = 8;
      switch (this.strengthLevel) {
        case 12:
          size = 10;
          charactersArray = "a-z,A-Z".split(",");
          break;
        case 24:
          size = 12;
          charactersArray = "a-z,A-Z,0-9".split(",");
          break;
        case 36:
          size = 14;
          charactersArray = "a-z,A-Z,0-9,#".split(",");
          break;
        case 48:
          size = 16;
          charactersArray = "a-z,A-Z,0-9,#".split(",");
          break;
      }
      if (charactersArray.indexOf("a-z") >= 0) {
        CharacterSet += "abcdefghijklmnopqrstuvwxyz";
      }
      if (charactersArray.indexOf("A-Z") >= 0) {
        CharacterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }

      if (charactersArray.indexOf("0-9") >= 0) {
        CharacterSet += "0123456789";
      }
      if (charactersArray.indexOf("#") >= 0) {
        CharacterSet += "![]{}()%&*$#^<>~@|";
      }
      for (let i = 0; i < size; i++) {
        password += CharacterSet.charAt(
          Math.floor(Math.random() * CharacterSet.length)
        );
      }

      return password;
    },
    strengthLabel() {
      switch (this.strengthLevel) {
        case 12:
          return "poor";
        case 24:
          return "fair";
        case 36:
          return "good";
        case 48:
          return "excellent";
        default:
          return "weak";
      }
    },
    strengthColor() {
      switch (this.strengthLevel) {
        case 12:
          return "amber-10";
        case 24:
          return "blue-5";
        case 36:
          return "primary";
        case 48:
          return "positive";
        default:
          return "blue-grey-3";
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
