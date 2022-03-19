<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить ученика</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.last_name" dense outlined label="Фамилия" />
        <q-input v-model="form.first_name" dense outlined label="Имя" />
        <q-input v-model="form.middle_name" dense outlined label="Отчество" />
        <q-select
          v-model="form.grade"
          dense
          outlined
          :options="gradeOptions"
          label="Класс"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="form.study_lang"
          dense
          outlined
          :options="langOptions"
          label="Язык обучения"
          input-debounce="0"
        ></q-select>
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
        row-key="organization_name"
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
import { renameObjectKey } from "@/utils";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";

const TABLE = TABLES.STUDENTS;
const COLUMNS = [
  {
    name: "last_name",
    align: "left",
    label: "Фамилия",
    field: "last_name",
    sortable: true,
  },
  {
    name: "first_name",
    align: "left",
    label: "Имя",
    field: "first_name",
    sortable: true,
  },
  {
    name: "middle_name",
    align: "left",
    label: "Отчество",
    field: "middle_name",
    sortable: true,
  },
  {
    name: "study_lang",
    align: "left",
    label: "Язык обучения",
    field: "study_lang",
    sortable: true,
  },
  {
    name: "grade_name",
    align: "left",
    label: "Класс",
    field: (row) => {
      return row.grade?.name;
    },
    sortable: true,
  },
];
const langOptions = ["ru", "kz", "en"];

const form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  grade: null,
  study_lang: "",
});
const gradeOptions = ref([]);

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
    console.log(form.value);
    await Api.insertToTable(TABLE, {
      grade_id: form.value.grade?.value,
      first_name: form.value.first_name,
      middle_name: form.value.middle_name,
      last_name: form.value.last_name,
      study_lang: form.value.study_lang,
    });
  },
  reset: () => {
    form.value = {
      first_name: "",
      middle_name: "",
      last_name: "",
      grade: null,
      study_lang: "",
    };
  },
  fetch: async () => {
    const repsonse = await Api.getTable(TABLE);
    data.value = repsonse.data;
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, editedItem.value);
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
});

const fetchGrades = async () => {
  const response = await Api.getTable(TABLES.GRADES);
  response.data.forEach((obj) =>
    renameObjectKey({
      obj,
      old_key: "name",
      new_key: "label",
    })
  );
  response.data.forEach((obj) =>
    renameObjectKey({
      obj,
      old_key: "curator_id",
      new_key: "value",
    })
  );
  gradeOptions.value = response.data;
};

await fetchGrades();
await fetchData();
</script>
