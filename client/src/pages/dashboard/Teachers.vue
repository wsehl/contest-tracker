<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить учителя</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.name" dense outlined label="Имя" />
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
        row-key="name"
      >
        <template #top-left>
          <q-input v-model="filter" outlined dense placeholder="Поиск">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </template>
  </dashboard-template>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { renameObjectKey } from "@/utils";
import { TABLES } from "@/config";

const TABLE = TABLES.TEACHERS;
const COLUMNS = [
  {
    name: "full_name",
    align: "left",
    label: "Имя",
    field: "full_name",
  },
];

const form = ref({
  first_name: "",
  middle_name: "",
  subject_id: "",
  phone: "",
});
const subjectOptions = ref([]);

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
  submit: async () => {
    await Api.insertToTable(TABLE, {
      name: form.value.name,
    });
  },
  reset: () => {
    form.value = {
      first_name: "",
      middle_name: "",
      subject_id: "",
      phone: "",
    };
  },
  fetch: async () => {
    const response = await Api.getTable(TABLE);
    response.data.forEach((row) => {
      row.full_name = `${row.last_name} ${row.first_name} ${row.middle_name}`;
    });
    data.value = response.data;
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, editedItem.value);
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
});

const fetchSubjects = async () => {
  const subjects = await Api.getTable("subjects");
  subjects.data.forEach((obj) => {
    renameObjectKey({
      obj,
      old_key: "id",
      new_key: "value",
    });
    renameObjectKey({
      obj,
      old_key: "name",
      new_key: "label",
    });
  });
  subjectOptions.value = subjects.data;
};

Promise.all([fetchSubjects(), fetchData()]);
</script>
