<template>
  <div>
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
          <q-input v-model="form.password" dense outlined label="Пароль" />
          <q-select
            v-model="form.role"
            dense
            outlined
            :options="ROLE_OPTIONS"
            label="Роль"
          />
        </q-card-section>
        <template v-if="form.role === 'User'">
          <div class="q-px-lg">
            <q-option-group
              dense
              v-model="tab"
              inline
              :options="[
                { label: 'Ученик', value: 'student' },
                { label: 'Учитель', value: 'teacher' },
                { label: 'Куратор', value: 'curator' },
              ]"
            />
          </div>
          <q-tab-panels
            v-model="tab"
            animated
            dense
            swipeable
            @before-transition="form.user_type = null"
          >
            <q-tab-panel name="student">
              <q-select
                v-model="form.user_type"
                dense
                outlined
                :options="studentOptions"
                label="Ученик"
                input-debounce="0"
              />
            </q-tab-panel>
            <q-tab-panel name="teacher">
              <q-select
                v-model="form.user_type"
                dense
                outlined
                :options="teacherOptions"
                label="Учитель"
                input-debounce="0"
              />
            </q-tab-panel>
            <q-tab-panel name="curator">
              <q-select
                v-model="form.user_type"
                dense
                outlined
                :options="curatorOptions"
                label="Куратор"
                input-debounce="0"
              />
            </q-tab-panel>
          </q-tab-panels>
        </template>
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
            <q-input
              v-model="editedItem.password"
              outlined
              dense
              label="Новый пароль"
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
            <q-field label="Имя пользователя" stack-label outlined dense>
              <template #control>
                {{ viewedItem.username }}
              </template>
            </q-field>
            <q-field label="Почта" stack-label outlined dense>
              <template #control>
                {{ viewedItem.email }}
              </template>
            </q-field>
            <q-field label="Роль" stack-label outlined dense>
              <template #control>
                {{ viewedItem.role }}
              </template>
            </q-field>
            <q-field label="Последний вход" stack-label outlined dense>
              <template #control>
                {{ formatDate(viewedItem.last_login) }}
              </template>
            </q-field>
            <q-field label="Зарегистрирован" stack-label outlined dense>
              <template #control>
                {{ formatDate(viewedItem.registered) }}
              </template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";
import { formatDate, formatName } from "@/utils";

const TABLE = TABLES.USERS;
const ROLE_OPTIONS = ["Admin", "User"];
const COLUMNS = [
  {
    name: "username",
    align: "left",
    label: "Имя пользователя",
    field: "username",
  },
  {
    name: "email",
    align: "left",
    label: "Почта",
    field: "email",
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
  },
];

const form = ref({
  username: "",
  email: "",
  password: "",
  role: "User",
});
const studentOptions = ref(null);
const teacherOptions = ref(null);
const curatorOptions = ref(null);
const tab = ref("student");

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
  submit: async () =>
    await Api.insertToTable(TABLE, {
      email: form.value.email,
      password: form.value.password,
      role: form.value.role,
      username: form.value.username,
      ...(form.value.role === "User" && {
        ...(tab.value === "student" && {
          student_id: form.value.user_type.value,
        }),
        ...(tab.value === "teacher" && {
          teacher_id: form.value.user_type.value,
        }),
        ...(tab.value === "curator" && {
          curator_id: form.value.user_type.value,
        }),
      }),
    }),
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

const fetchStudents = async () => {
  const students = await Api.getTable(TABLES.STUDENTS);
  studentOptions.value = students.data.map((student) => ({
    label: formatName(student),
    value: student.id,
  }));
};

const fetchTeachers = async () => {
  const teachers = await Api.getTable(TABLES.TEACHERS);
  teacherOptions.value = teachers.data.map((teacher) => ({
    label: formatName(teacher),
    value: teacher.id,
  }));
};

const fetchCurators = async () => {
  const curators = await Api.getTable(TABLES.CURATORS);
  curatorOptions.value = curators.data.map((curator) => ({
    label: formatName(curator),
    value: curator.id,
  }));
};

Promise.all[(fetchStudents(), fetchTeachers(), fetchCurators(), fetchData())];
</script>
