<template>
  <div>
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
          />
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
              <q-td key="grade_name" :props="props">
                {{ props.row.grade.label }}
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
            <q-select
              v-model="editedItem.grade"
              dense
              outlined
              :options="gradeOptions"
              label="Класс"
              input-debounce="0"
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
import { formatName } from "@/utils";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";

const TABLE = TABLES.STUDENTS;
const COLUMNS = [
  {
    name: "full_name",
    align: "left",
    label: "ФИО",
    field: (row) => formatName(row),
    sortable: true,
  },
  {
    name: "grade_name",
    align: "left",
    label: "Класс",
    field: (row) => {
      return row.grade.label;
    },
    sortable: true,
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
  grade: null,
});
const gradeOptions = ref([]);

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
    console.log(form.value);
    await Api.insertToTable(TABLE, {
      grade_id: form.value.grade?.value,
      first_name: form.value.first_name,
      middle_name: form.value.middle_name,
      last_name: form.value.last_name,
    });
  },
  reset: () => {
    form.value = {
      first_name: "",
      middle_name: "",
      last_name: "",
      grade: null,
    };
  },
  fetch: async () => {
    const repsonse = await Api.getTable(TABLE);
    data.value = repsonse.data.map((item) => {
      return {
        ...item,
        grade: {
          label: item.grade.name,
          value: item.grade_id,
        },
      };
    });
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, {
      ...editedItem.value,
      grade_id: editedItem.value.grade.value,
    });
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
