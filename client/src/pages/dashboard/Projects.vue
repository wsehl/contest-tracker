<template>
  <div>
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
          />
          <q-select
            v-model="form.subject"
            dense
            outlined
            :options="subjectOptions"
            label="Предмет"
            input-debounce="0"
          />
          <q-select
            v-model="form.students"
            dense
            outlined
            :options="studentOptions"
            multiple
            label="Ученики"
            input-debounce="0"
          />
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
          :filter="filter"
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
                {{ props.row.teacher.label }}
              </q-td>
              <q-td key="start_date" :props="props">
                {{ formatDate(props.row.start_date) }}
              </q-td>
              <q-td key="end_date" :props="props">
                {{ formatDate(props.row.end_date) }}
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
            Данные проекта
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
              v-model="editedItem.name"
              outlined
              dense
              label="Название"
            />
            <q-input
              v-model="editedItem.description"
              dense
              outlined
              label="Описание"
              type="textarea"
            />
            <q-select
              v-model="editedItem.teacher"
              dense
              outlined
              :options="teacherOptions"
              label="Учитель"
              input-debounce="0"
            />
            <q-date v-model="editedItem.range" minimal flat bordered range />
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
    <q-dialog
      v-model="showViewDialog"
      @hide="router.push('/dashboard/projects')"
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Данные проекта
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
            <q-field label="Название" stack-label outlined dense>
              <template #control>
                {{ viewedItem.name }}
              </template>
            </q-field>
            <q-field label="Описание" stack-label outlined dense>
              <template #control>
                {{ viewedItem.description }}
              </template>
            </q-field>
            <q-field
              label="Дата начала работы над проектом"
              stack-label
              outlined
              dense
            >
              <template #control>
                {{ formatDate(viewedItem.start_date) }}
              </template>
            </q-field>
            <q-field
              label="Дата завершения работы над проектом"
              stack-label
              outlined
              dense
            >
              <template #control>
                {{ formatDate(viewedItem.end_date) }}
              </template>
            </q-field>
            <q-field label="Предмет" stack-label outlined dense>
              <template #control>
                {{ viewedItem.subject.name }}
              </template>
            </q-field>
            <q-field label="Научный руководитель" stack-label outlined dense>
              <template #control>
                {{ formatName(viewedItem.teacher) }}
              </template>
            </q-field>
          </div>
        </q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label caption class="q-mb-sm">Ученики</q-item-label>
            <q-list bordered>
              <q-item
                clickable
                v-for="student in viewedItem.students"
                :key="student.id"
              >
                <q-item-section>
                  <q-item-label>{{ formatName(student) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { formatDate, formatName } from "@/utils";
import { TABLES } from "@/config";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const TABLE = TABLES.PROJECTS;
const COLUMNS = [
  {
    name: "name",
    align: "left",
    label: "Название",
    field: "name",
    sortable: true,
  },
  {
    name: "teacher_name",
    align: "left",
    label: "Учитель",
    field: (row) => row.teacher.label,
    sortable: true,
  },
  {
    name: "start_date",
    align: "left",
    label: "Дата начала",
    field: "start_date",
    sortable: true,
  },
  {
    name: "end_date",
    align: "left",
    label: "Дата окончания",
    field: "end_date",
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
    data.value = response.data.map((item) => {
      return {
        ...item,
        teacher: {
          label: formatName(item.teacher),
          value: item.teacher_id,
        },
      };
    });
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, {
      ...editedItem.value,
      teacher_id: editedItem.value.teacher.value,
      start_date: editedItem.value.range.from,
      end_date: editedItem.value.range.to,
    });
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

const openProjectFromRoute = async () => {
  const id = route.query?.id;

  if (!id) return;

  const response = await Api.getRow(TABLE, id);

  viewedItem.value = {
    ...response.data,
  };
  showViewDialog.value = true;
};

Promise.all([
  fetchSubjects(),
  fetchTeachers(),
  fetchStudents(),
  fetchData(),
  openProjectFromRoute(),
]);
</script>
