<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить результат</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.place" dense outlined label="Место" />
        <q-select
          v-model="form.project"
          dense
          outlined
          :options="projectOptions"
          label="Проект"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-model="form.description"
          dense
          outlined
          label="Описание"
          type="textarea"
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
        <!-- <template #body="props">
          <q-tr :props="props">
            <q-td key="organization_name" :props="props">
              {{ props.row.organization_name }}
            </q-td>
          </q-tr>
        </template> -->
      </q-table>
    </template>
  </dashboard-template>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { renameObjectKey } from "@/utils";

const TABLE = "winners";
const COLUMNS = [
  {
    name: "project_id",
    align: "left",
    label: "Название",
    field: "project_id",
    sortable: true,
  },
  {
    name: "place",
    align: "left",
    label: "Место",
    field: "place",
    sortable: true,
  },
];

const form = ref({
  place: "",
  description: "",
  project: {
    label: "",
    value: "",
  },
});
const projectOptions = ref([]);

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
      project_id: form.value.project.value,
      place: form.value.place,
      description: form.value.description,
    });
  },
  reset: () => {
    form.value = {
      place: "",
      description: "",
      project: {
        label: "",
        value: "",
      },
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

const fetchProjects = async () => {
  const projects = await Api.getTable("projects");
  projects.data.forEach((obj) => {
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
  projectOptions.value = projects.data;
};

await fetchProjects();
await fetchData();
</script>
