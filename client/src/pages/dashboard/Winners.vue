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
        />
        <q-select
          v-model="form.event"
          dense
          outlined
          :options="eventOptions"
          label="Конкурс"
          input-debounce="0"
        />
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
          <q-tr :props="props">
            <q-td key="event_title" :props="props">
              {{ props.row.event.event_title }}
            </q-td>
            <q-td key="project_title" :props="props">
              {{ props.row.project.name }}
            </q-td>
            <q-td key="place" :props="props">
              {{ props.row.place }}
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
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";

const TABLE = TABLES.WINNERS;
const COLUMNS = [
  {
    name: "event_title",
    align: "left",
    label: "Конкурс",
    field: (row) => row.event.event_title,
    sortable: true,
  },
  {
    name: "project_title",
    align: "left",
    label: "Проект",
    field: (row) => row.project.name,
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
  project: null,
  event: null,
});
const projectOptions = ref([]);
const eventOptions = ref([]);

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
      event_id: form.value.event.value,
      place: form.value.place,
      description: form.value.description,
    });
  },
  reset: () => {
    form.value = {
      place: "",
      description: "",
      project: null,
      event: null,
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
  const projects = await Api.getTable(TABLES.PROJECTS);
  projectOptions.value = projects.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

const fetchEvents = async () => {
  const events = await Api.getTable(TABLES.EVENTS);
  eventOptions.value = events.data.map((item) => ({
    label: item.event_title,
    value: item.id,
  }));
};

Promise.all([fetchProjects(), fetchEvents(), fetchData()]);
</script>
