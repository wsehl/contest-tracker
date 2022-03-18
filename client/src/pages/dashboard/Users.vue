<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить пользователя</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input
          v-model="form.username"
          dense
          outlined
          label="Имя пользователя"
        />
        <q-input v-model="form.email" dense outlined label="Почта" />
        <q-select
          v-model="form.role"
          dense
          outlined
          :options="ROLE_OPTIONS"
          label="Роль"
        />
        <q-input v-model="form.password" dense outlined label="Пароль" />
      </q-card-section>
      <q-card-actions class="q-px-md q-mb-md">
        <q-btn
          color="primary"
          size="md"
          class="full-width"
          label="Добавить"
          @click="onSubmit"
        />
      </q-card-actions>
    </template>
    <template #table>
      <q-table
        class="text-grey-8"
        :rows="data"
        :columns="COLUMNS"
        :pagination="{
          rowsPerPage: 15,
        }"
        :loading="loading"
        :filter="filter"
        row-key="username"
      >
        <template #top-left>
          <q-input v-model="filter" outlined dense placeholder="Поиск">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #body="props">
          <q-tr :props="props">
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
                @click="removeRow(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </dashboard-template>
  <q-dialog v-model="showEditDialog">
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
          />
          <q-input v-model="editedItem.email" outlined dense label="Почта" />
          <q-select
            v-model="editedItem.role"
            outlined
            dense
            :options="ROLE_OPTIONS"
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
  <q-dialog v-model="showViewDialog">
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

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";

const TABLE = "users";
const ROLE_OPTIONS = ["Admin", "User", "Teacher", "Curator"];
const COLUMNS = [
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
];

const form = ref({
  username: "",
  email: "",
  password: "",
  role: "User",
});

const {
  data,
  loading,
  filter,
  showEditDialog,
  showViewDialog,
  editedItem,
  viewedItem,
  onSubmit,
  fetchData,
  editRow,
  removeRow,
  editItem,
  viewItem,
} = useDashboard({
  submit: async () => await Api.insertToTable(TABLE, form.value),
  reset: () => {
    form.value = {
      username: "",
      email: "",
      password: "",
      role: "User",
    };
  },
  fetch: async () => {
    const repsnose = await Api.getTable(TABLE);
    data.value = repsnose.data;
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, editedItem.value);
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
});

await fetchData();
</script>
