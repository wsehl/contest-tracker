<template>
  <div>
    <dashboard-template>
      <template #form>
        <q-card-section>
          <div class="text-h6">Добавить результат</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-select
            v-model="form.place"
            dense
            outlined
            :options="placeOptions"
            label="Место"
            input-debounce="0"
          />
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
                {{ props.row.event.label }}
              </q-td>
              <q-td key="project_title" :props="props">
                {{ props.row.project.label }}
              </q-td>
              <q-td key="place" :props="props">
                {{ props.row.place }}
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
            Редактирование
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
            <q-select
              v-model="editedItem.place"
              dense
              outlined
              :options="placeOptions"
              label="Место"
              input-debounce="0"
            />
            <q-select
              v-model="editedItem.project"
              dense
              outlined
              :options="projectOptions"
              label="Проект"
              input-debounce="0"
            />
            <q-select
              v-model="editedItem.event"
              dense
              outlined
              :options="eventOptions"
              label="Конкурс"
              input-debounce="0"
            />
            <q-input
              v-model="editedItem.description"
              dense
              outlined
              label="Описание"
              type="textarea"
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
            Данные
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
            <q-field label="Место" stack-label outlined dense>
              <template #control>
                {{ viewedItem.place }}
              </template>
            </q-field>
            <q-field label="Проект" stack-label outlined dense>
              <template #control>
                {{ viewedItem.project.label }}
              </template>
            </q-field>
            <q-field label="Конкурс" stack-label outlined dense>
              <template #control>
                {{ viewedItem.event.label }}
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

const TABLE = TABLES.WINNERS;
const COLUMNS = [
  {
    name: "event_title",
    align: "left",
    label: "Конкурс",
    field: (row) => row.event.label,
    sortable: true,
  },
  {
    name: "project_title",
    align: "left",
    label: "Проект",
    field: (row) => row.project.label,
    sortable: true,
  },
  {
    name: "place",
    align: "left",
    label: "Место",
    field: "place",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
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
const placeOptions = ["1", "2", "3", "-"];

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
    data.value = response.data.map((item) => {
      return {
        ...item,
        project: {
          label: item.project.name,
          value: item.project_id,
        },
        event: {
          label: item.event.event_title,
          value: item.event_id,
        },
      };
    });
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, {
      ...editedItem.value,
      project_id: editItem.value.project.value,
      event_id: editItem.value.event.value,
    });
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
