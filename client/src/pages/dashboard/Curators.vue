<template>
  <div>
    <dashboard-template>
      <template #form>
        <q-card-section>
          <div class="text-h6">Добавить куратора</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input v-model="form.last_name" dense outlined label="Фамилия" />
          <q-input v-model="form.first_name" dense outlined label="Имя" />
          <q-input v-model="form.middle_name" dense outlined label="Отчество" />
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
          :filter="filter"
          :pagination="{
            rowsPerPage: 15,
          }"
          :loading="loading"
          row-key="full_name"
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
              <q-td key="full_name" :props="props">
                {{ formatName(props.row) }}
              </q-td>
              <q-td key="actions" :props="props">
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
              v-model="editedItem.first_name"
              outlined
              dense
              label="Имя"
            />
            <q-input
              v-model="editedItem.last_name"
              outlined
              dense
              label="Фамилия"
            />
            <q-input
              v-model="editedItem.middle_name"
              outlined
              dense
              label="Отчество"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { formatName } from "@/utils";
import { TABLES } from "@/config";

const TABLE = TABLES.CURATORS;
const COLUMNS = [
  {
    name: "full_name",
    align: "left",
    label: "Имя",
    field: (row) => formatName(row),
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
  },
];

const form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
});

const {
  data,
  loading,
  filter,
  showEditDialog,
  editedItem,
  onSubmit,
  fetchData,
  editRow,
  removeRow,
  editItem,
} = useDashboard({
  submit: async () => {
    await Api.insertToTable(TABLE, form.value);
  },
  reset: () => {
    form.value = {
      first_name: "",
      middle_name: "",
      last_name: "",
    };
  },
  fetch: async () => {
    const response = await Api.getTable(TABLE);
    data.value = response.data;
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, editedItem.value);
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
});

fetchData();
</script>
