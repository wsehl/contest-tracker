<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить проект</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.name" dense outlined label="Название" />
        <q-input
          v-model="form.description"
          dense
          outlined
          label="Описание"
          type="textarea"
        />
        <q-select
          v-model="form.teacher"
          dense
          outlined
          :options="teacherOptions"
          label="Учитель"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="form.subject"
          dense
          outlined
          :options="subjectOptions"
          label="Предмет"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="form.students"
          dense
          outlined
          :options="studentOptions"
          multiple
          label="Ученики"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-date v-model="form.range" minimal flat bordered range />
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
        <template #body="props">
          <q-tr :props="props" :expand="true">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="teacher_name" :props="props">
              {{ formatName(props.row.teacher) }}
            </q-td>
            <q-td key="start_date" :props="props">
              {{ formatDate(props.row.start_date) }}
            </q-td>
            <q-td key="end_date" :props="props">
              {{ formatDate(props.row.end_date) }}
            </q-td>
            <q-td key="actions" :props="props"> Посмотреть </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </dashboard-template>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { formatDate, formatName } from "@/utils";
import { TABLES } from "@/config";

const TABLE = TABLES.PROJECTS;
const COLUMNS = [
  {
    name: "name",
    align: "left",
    label: "Название",
    sortable: true,
  },
  {
    name: "teacher_name",
    align: "left",
    label: "Учитель",
    sortable: true,
  },
  {
    name: "start_date",
    align: "left",
    label: "Дата начала",
    sortable: true,
  },
  {
    name: "end_date",
    align: "left",
    label: "Дата окончания",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
  },
];

const form = ref({
  name: "",
  description: "",
  range: { from: "", to: "" },
});
const teacherOptions = ref([]);
const studentOptions = ref([]);
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
      description: form.value.description,
      start_date: form.value.range.from,
      end_date: form.value.range.to,
      teacher_id: form.value.teacher.value,
      students_ids: form.value.students.map((student) => student.value),
      subject_id: form.value.subject.value,
    });
  },
  reset: () => {
    form.value = {
      name: "",
      description: "",
      range: { from: "", to: "" },
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

const fetchSubjects = async () => {
  const response = await Api.getTable(TABLES.SUBJECTS);
  subjectOptions.value = response.data.map((subject) => ({
    label: subject.name,
    value: subject.id,
  }));
};

const fetchTeachers = async () => {
  const teachers = await Api.getTable(TABLES.TEACHERS);
  teacherOptions.value = teachers.data.map((teacher) => ({
    label: formatName(teacher),
    value: teacher.id,
  }));
};

const fetchStudents = async () => {
  const students = await Api.getTable(TABLES.STUDENTS);
  studentOptions.value = students.data.map((student) => ({
    label: formatName(student),
    value: student.id,
  }));
};

Promise.all([fetchSubjects(), fetchTeachers(), fetchStudents(), fetchData()]);
</script>
