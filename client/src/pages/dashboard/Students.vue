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
        row-key="grade_name"
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
            <q-td key="study_lang" :props="props">
              {{ props.row.study_lang }}
            </q-td>
            <q-td key="grade_name" :props="props">
              {{ props.row.grade.name }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </dashboard-template>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { formatName } from "@/utils";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";

const TABLE = TABLES.STUDENTS;
const COLUMNS = [
  {
    name: "full_name",
    align: "left",
    label: "ФИО",
    sortable: true,
  },
  {
    name: "study_lang",
    align: "left",
    label: "Язык обучения",
    sortable: true,
  },
  {
    name: "grade_name",
    align: "left",
    label: "Класс",
    sortable: true,
  },
];
const langOptions = ["ru", "kz", "en"];

const form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  study_lang: "",
  grade: null,
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
      study_lang: "",
      grade: null,
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
  gradeOptions.value = response.data.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};

Promise.all([fetchGrades(), fetchData()]);
</script>
