<template>
  <div class="q-px-sm">
    <q-card flat bordered v-if="!loading">
      <q-table
        title="Users"
        class="text-grey-8"
        dense
        :data="data"
        :columns="columns"
        :pagination="{
          rowsPerPage: 15,
        }"
        row-key="id"
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
              {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
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
            <q-td key="id" :props="props">
              {{ props.row.id }}
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
            <q-td key="registered" :props="props">
              {{ props.row.registered }}
            </q-td>
            <q-td key="last_login" :props="props">
              {{ props.row.last_login }}
            </q-td>
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
</template>

<script>
import api from "@/services/api.js";
import UsersTable from "@/mixins/tables/UsersTable.js";

export default {
  mixins: [UsersTable],
  data() {
    return {
      loading: true,

      mode: "list",
      filter: "",
      data: [],
      selected: [],

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
  methods: {
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
        api
          .removeSeveralRows("users", rows)
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
      api
        .editRow("user", this.editedItem.id, this.editedItem)
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
        api
          .removeRow("user", item.id)
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
      api
        .getTable("users")
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
  mounted() {
    this.$q.loading.show();
    this.fetchData();
  },
};
</script>
