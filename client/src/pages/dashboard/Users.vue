<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить пользователя</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="username" dense outlined label="Имя пользователя" />
        <q-input v-model="email" dense outlined label="Почта" />
        <q-select
          v-model="role"
          dense
          outlined
          :options="role_options"
          label="Роль"
        />
        <q-input v-model="password" dense outlined label="Пароль" />
        <q-input
          v-model="generatedPassword"
          dense
          outlined
          type="text"
          autocomplete="off"
          readonly
          label="Предложенный пароль"
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
              <q-badge :color="strengthColor">Сложность пароля:</q-badge>
              <q-slider
                v-model="strengthLevel"
                snap
                label
                :step="12"
                :min="0"
                :max="48"
                :color="strengthColor"
                :label-value="strengthLabel"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions class="q-px-md q-mb-md">
        <q-btn
          color="primary"
          size="md"
          class="full-width"
          label="Добавить"
          @click="insertTo('users')"
        />
      </q-card-actions>
    </template>
    <template #table>
      <q-table
        v-model:selected="selected"
        class="text-grey-8"
        :rows="data"
        :columns="columns"
        :pagination="{
          rowsPerPage: 15,
        }"
        :loading="loading"
        row-key="username"
        :filter="filter"
        selection="multiple"
      >
        <template #top-left>
          <q-input v-model="filter" outlined dense placeholder="Поиск">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #top-right="props">
          <div v-if="selected.length > 1">
            <q-btn
              flat
              round
              dense
              icon="delete"
              no-caps
              @click="deleteSeveral"
            >
              <q-tooltip v-close-popup :disable="$q.platform.is.mobile">
                Удалить несколько строк
              </q-tooltip>
            </q-btn>
          </div>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          >
            <q-tooltip v-close-popup :disable="$q.platform.is.mobile">
              {{
                props.inFullscreen
                  ? "Выйти из полноэкранного режима"
                  : "Включить полноэкранный режим"
              }}
            </q-tooltip>
          </q-btn>
        </template>
        <template #body="props">
          <q-tr :props="props">
            <q-td @click="props.selected = true">
              <q-checkbox v-model="props.selected" dense color="primary" />
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
            <q-td key="actions" :props="props">
              <q-btn
                icon="visibility"
                size="sm"
                no-caps
                unelevated
                @click="viewItem(props.row)"
              />
              <q-btn
                icon="edit"
                size="sm"
                no-caps
                unelevated
                @click="editItem(props.row)"
              />
              <q-btn
                icon="delete"
                size="sm"
                no-caps
                unelevated
                @click="deleteRow(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </dashboard-template>
  <q-dialog v-model="show_edit_dialog" class="q-pa-sm q-gutter-sm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Данные пользователя
          <q-btn
            v-close-popup
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            v-model="editedItem.username"
            outlined
            dense
            label="Имя пользователя"
          >
          </q-input>
          <q-input
            v-model="editedItem.email"
            outlined
            dense
            label="Почта"
          ></q-input>
          <q-select
            v-model="editedItem.role"
            outlined
            dense
            :options="role_options"
            label="Роль"
          />
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          v-close-popup
          flat
          label="Обновить"
          color="primary"
          @click="editRow"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="show_view_dialog" class="q-pa-sm q-gutter-sm">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Данные пользователя
          <q-btn
            v-close-popup
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            v-model="viewedItem.username"
            readonly
            dense
            outlined
            label="Имя пользователя"
          >
          </q-input>
          <q-input
            v-model="viewedItem.email"
            readonly
            dense
            outlined
            label="Почта"
          >
          </q-input>
          <q-input
            v-model="viewedItem.role"
            readonly
            outlined
            dense
            label="Роль"
          >
          </q-input>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";

import {
  insertToTable,
  removeRow,
  getTable,
  editRow as editRowInTable,
  removeSeveralRows,
} from "@/api";

export default {
  components: {
    DashboardTemplate,
  },
  data() {
    return {
      loading: true,
      strengthLevel: 24,
      username: "",
      password: "",
      email: "",
      role: "",
      role_options: ["User", "Curator", "Teacher", "Admin"],

      filter: "",
      data: [],
      selected: [],
      columns: [
        {
          name: "username",
          align: "left",
          label: "Имя пользователя",
          field: "username",
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Почта",
          field: "email",
          sortable: true,
        },
        {
          name: "role",
          align: "left",
          label: "Роль",
          field: "role",
          sortable: true,
        },
        {
          name: "actions",
          align: "right",
          label: "Действия",
          field: "actions",
        },
      ],

      show_edit_dialog: false,
      show_view_dialog: false,

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
};
</script>
