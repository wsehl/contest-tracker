<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить событие</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.event_title" dense outlined label="Название" />
        <q-select
          v-model="form.event_organization"
          dense
          outlined
          :options="organizationOptions"
          label="Организация"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-model="form.event_description"
          dense
          outlined
          label="Описание"
          type="textarea"
        />
        <q-date v-model="form.event_range" minimal flat bordered range />
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
        row-key="event_title"
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
            <q-td key="event" :props="props">
              {{ props.row.event_title }}
            </q-td>
            <q-td key="organization" :props="props">
              {{ props.row.organization_name }}
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

const TABLE = TABLES.EVENTS;
const COLUMNS = [
  {
    name: "event",
    align: "left",
    label: "Название",
    field: "event_title",
    sortable: true,
  },
  {
    name: "organization",
    align: "left",
    label: "Организация",
    field: "organization_name",
    sortable: true,
  },
];

const form = ref({
  event_title: "",
  event_organization: null,
  event_description: "",
  event_range: { from: "", to: "" },
});
const organizationOptions = ref([]);

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
    const event_credentials = {
      event_organization: form.value.event_organization.value,
      event_title: form.value.event_title,
      event_description: form.value.event_description,
      event_start_date: form.value.event_range.from,
      event_end_date: form.value.event_range.to,
    };
    await Api.insertToTable(TABLE, event_credentials);
  },
  reset: () => {
    form.value = {
      event_title: "",
      event_organization: null,
      event_description: "",
      event_range: { from: "", to: "" },
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

const fetchOrganizations = async () => {
  const response = await Api.getTable(TABLES.ORGANIZATIONS);
  organizationOptions.value = response.data.map((item) => {
    return {
      label: item.organization_name,
      value: item.id,
    };
  });
};

Promise.all([fetchOrganizations(), fetchData()]);
</script>
