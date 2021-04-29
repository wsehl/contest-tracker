<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <template v-if="!loading">
        <q-table
          title="Users"
          class="text-grey-8"
          :data="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="username"
          :grid="mode === 'grid'"
          :filter="filter"
          binary-state-sort
          dense
          :pagination="initialPagination"
        >
          <template v-slot:top-right="props">
            <q-btn
              unelevated
              outline
              color="primary"
              label="Add user"
              @click="show_dialog = true"
              no-caps
            ></q-btn>
            <div class="q-pa-sm q-gutter-sm">
              <q-dialog v-model="show_dialog">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">User</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <q-input
                        v-model="editedItem.username"
                        label="Username"
                      ></q-input>
                      <q-input
                        v-model="editedItem.email"
                        label="Email"
                      ></q-input>
                      <q-input v-model="editedItem.role" label="Role"></q-input>
                    </div>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="OK"
                      color="primary"
                      v-close-popup
                      @click="addRow"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
            <q-input outlined dense v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                >{{
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
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                >{{ mode === "grid" ? "List" : "Grid" }}
              </q-tooltip>
            </q-btn>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="username" :props="props">
                {{ props.row.username }}
                <q-popup-edit
                  v-model="props.row.username"
                  title="Update username"
                  buttons
                >
                  <q-input
                    v-model="props.row.username"
                    dense
                    autofocus
                  ></q-input>
                </q-popup-edit>
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
                <q-popup-edit
                  v-model="props.row.email"
                  title="Update email"
                  buttons
                >
                  <q-input v-model="props.row.email" dense autofocus></q-input>
                </q-popup-edit>
              </q-td>
              <q-td key="role" :props="props"
                >{{ props.row.role }}
                <q-popup-edit
                  v-model="props.row.role"
                  title="Update role"
                  buttons
                >
                  <q-input
                    v-model="props.row.role"
                    dense
                    autofocus
                  ></q-input> </q-popup-edit
              ></q-td>
              <q-td key="registered" :props="props">{{
                props.row.registered
              }}</q-td>
              <q-td key="last_login" :props="props">{{
                props.row.last_login
              }}</q-td>
              <q-td key="actions" :props="props">
                <q-btn
                  @click="visible_dialog = true"
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
                ></q-btn>
                <q-btn
                  @click="deleteItem(props.row)"
                  icon="delete"
                  size="sm"
                  no-caps
                  unelevated
                ></q-btn>
              </q-td>
              <q-dialog v-model="visible_dialog">
                <q-card class="my-card" flat bordered>
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
                      ></q-btn>
                    </div>
                  </q-card-section>
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-overline">username</div>
                      <div class="text-caption text-grey">
                        {{ props.row.username }}
                      </div>
                      <hr />
                      <div class="text-overline">role</div>
                      <div class="text-caption text-grey">
                        {{ props.row.role }}
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </q-tr>
          </template>
        </q-table>
      </template>
    </q-card>
  </q-page>
</template>

<script>
import api from "@/services/api.js";
import UsersTable from "@/mixins/tables/UsersTable.js";

export default {
  mixins: [UsersTable],
  data() {
    return {
      loading: true,
      filter: "",
      mode: "list",
      visible_dialog: false,
      show_dialog: false,
      editedIndex: -1,
      initialPagination: {
        rowsPerPage: 15,
      },
      editedItem: {
        name: "",
        id: "",
        username: "",
        email: "",
        role: "",
      },
      defaultItem: {
        name: "",
        id: "",
        username: "",
        email: "",
        role: "",
      },
      data: [],
    };
  },
  methods: {
    addRow() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
    },
    deleteItem(item) {
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1);
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    close() {
      this.show_dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    fetchData() {
      api
        .getTable("users")
        .then((response) => {
          this.data = response.data;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
