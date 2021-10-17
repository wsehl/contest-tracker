<template>
  <div class="row q-col-gutter-sm q-px-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Add new user</div>
        </q-card-section>
        <q-separator inset></q-separator>
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
            <q-input dense outlined label="Password" v-model="password" />
            <q-input
              dense
              outlined
              type="text"
              autocomplete="off"
              readonly
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
                  <q-badge :color="strengthColor">Password strength:</q-badge>
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
            class="full-width"
            label="Save"
            @click="insertTo('users')"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-table
          class="text-grey-8"
          dense
          :data="data"
          :columns="columns"
          :pagination="{
            rowsPerPage: 15,
          }"
          :loading="loading"
          row-key="username"
          :hide-header="mode === 'grid'"
          :grid="mode === 'grid'"
          :filter="filter"
          selection="multiple"
          :selected.sync="selected"
        >
          <template v-slot:top-left>
            <q-input outlined dense v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-right="props">
            <q-dialog v-model="show_edit_dialog" class="q-pa-sm q-gutter-sm">
              <q-card>
                <q-card-section>
                  <div class="text-h6">
                    User Details
                    <q-btn
                      round
                      flat
                      dense
                      icon="close"
                      class="float-right"
                      color="grey-8"
                      v-close-popup
                    />
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="col">
                    <q-input v-model="editedItem.username" label="Username">
                    </q-input>
                    <q-input v-model="editedItem.email" label="Email"></q-input>
                    <q-input v-model="editedItem.role" label="Role"></q-input>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="OK"
                    color="primary"
                    v-close-popup
                    @click="editRow"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-dialog v-model="show_view_dialog" class="q-pa-sm q-gutter-sm">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6">
                    User Details
                    <q-btn
                      round
                      flat
                      dense
                      icon="close"
                      class="float-right"
                      color="grey-8"
                      v-close-popup
                    />
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="col">
                    <q-input readonly v-model="viewedItem.id" label="ID">
                    </q-input>
                    <q-input
                      readonly
                      v-model="viewedItem.username"
                      label="Username"
                    >
                    </q-input>
                    <q-input readonly v-model="viewedItem.email" label="Email">
                    </q-input>
                    <q-input readonly v-model="viewedItem.role" label="Role">
                    </q-input>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
            <div v-if="selected.length > 1">
              <q-btn
                flat
                round
                dense
                icon="delete"
                @click="deleteSeveral"
                no-caps
              >
                <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                  Delete several rows
                </q-tooltip>
              </q-btn>
            </div>
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                {{
                  props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
                }}
              </q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              :icon="mode === 'grid' ? 'list' : 'grid_on'"
              @click="
                mode = mode === 'grid' ? 'list' : 'grid';
                separator = mode === 'grid' ? 'none' : 'horizontal';
              "
              v-if="!props.inFullscreen"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                {{ mode === "grid" ? "List" : "Grid" }}
              </q-tooltip>
            </q-btn>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td @click="props.selected = true">
                <q-checkbox dense v-model="props.selected" color="primary" />
              </q-td>
              <q-td key="username" :props="props">
                {{ props.row.username }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="role" :props="props">
                {{ props.row.role }}
              </q-td>
              <!-- <q-td key="registered" :props="props">
                {{ props.row.registered }}
              </q-td>
              <q-td key="last_login" :props="props">
                {{ props.row.last_login }}
              </q-td> -->
              <q-td key="actions" :props="props">
                <q-btn
                  @click="viewItem(props.row)"
                  icon="visibility"
                  size="sm"
                  no-caps
                  unelevated
                />
                <q-btn
                  @click="editItem(props.row)"
                  icon="edit"
                  size="sm"
                  no-caps
                  unelevated
                />
                <q-btn
                  @click="deleteRow(props.row)"
                  icon="delete"
                  size="sm"
                  no-caps
                  unelevated
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  insertToTable,
  removeRow,
  getTable,
  editRow as editRowInTable,
  removeSeveralRows,
} from "@/api";

export default {
  data() {
    return {
      loading: true,
      strengthLevel: 24,
      username: "",
      password: "",
      email: "",
      role: "",
      role_options: ["User", "Curator", "Teacher", "Admin"],

      mode: "list",
      filter: "",
      data: [],
      selected: [],
      columns: [
        {
          name: "username",
          align: "left",
          label: "Username",
          field: "username",
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Email",
          field: "email",
          sortable: true,
        },
        {
          name: "role",
          align: "left",
          label: "Role",
          field: "role",
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: "Actions",
          field: "actions",
        },
      ],

      show_edit_dialog: false,
      show_view_dialog: false,

      defaultItem: {
        id: "",
        username: "",
        email: "",
        role: "",
      },
      editedItem: {
        id: "",
        username: "",
        email: "",
        role: "",
      },
      viewedItem: {
        id: "",
        username: "",
        email: "",
        role: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async insertTo() {
      try {
        const user_credentials = {
          username: this.username,
          email: this.email,
          role: this.role,
          password: this.password,
        };

        const response = await insertToTable(user_credentials, "users");

        this.clearForm();
        this.fetchData();

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
    clearForm() {
      this.updateGeneratedPassword();
      this.username = "";
      this.email = "";
      this.role = "";
      this.password = "";
    },
    updateGeneratedPassword() {
      this.strengthLevel = this.strengthLevel + 1;
      this.strengthLevel = this.strengthLevel - 1;
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.show_edit_dialog = true;
    },
    viewItem(item) {
      this.viewedItem = Object.assign({}, item);
      this.show_view_dialog = true;
    },
    deleteSeveral() {
      const rows = this.selected.map((item) => item.id);
      confirm("Are you sure you want to delete several items?") &&
        removeSeveralRows("users", rows)
          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom-left",
              message: response.msg,
              progress: true,
              timeout: 1500,
            });
            this.selected = [];
            this.fetchData();
          })
          .catch((error) => {
            this.$q.notify({
              color: "negative",
              position: "bottom-left",
              message: error.response.data.msg,
              progress: true,
              timeout: 1500,
            });
          });
    },
    editRow() {
      editRowInTable("user", this.editedItem.id, this.editedItem)
        .then((response) => {
          this.$q.notify({
            color: "positive",
            position: "bottom-left",
            message: response.msg,
            progress: true,
            timeout: 1500,
          });
          this.fetchData();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: error.response.data.msg,
            progress: true,
            timeout: 1500,
          });
        });
    },
    deleteRow(item) {
      confirm("Are you sure you want to delete this item?") &&
        removeRow("user", item.id)
          .then((response) => {
            this.$q.notify({
              color: "positive",
              position: "bottom-left",
              message: response.msg,
              progress: true,
              timeout: 1500,
            });
            this.fetchData();
          })
          .catch((error) => {
            this.$q.notify({
              color: "negative",
              position: "bottom-left",
              message: error.response.data.msg,
              progress: true,
              timeout: 1500,
            });
          });
    },
    fetchData() {
      this.loading = true;
      getTable("users")
        .then((response) => {
          this.data = response.data;
        })
        .finally(() => {
          this.loading = false;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: error.response.data.msg,
            progress: true,
            timeout: 1500,
          });
        });
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
