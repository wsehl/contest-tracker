<template>
  <q-page class="container mx-auto q-pa-md">
    <q-table
      :loading="loading"
      title="Конкурсы"
      color="primary"
      :columns="COLUMNS"
      :rows="rows"
      :filter="filter"
      :pagination="{
        rowsPerPage: 15,
      }"
      flat
      bordered
      @row-click="openRow"
    >
      <template #top-left>
        <q-input v-model="filter" outlined dense placeholder="Поиск">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { formatDate } from "@/utils";
import { useRouter } from "vue-router";
import { Api } from "@/api";
import { TABLES } from "@/config";
import { createAsyncProcess } from "@/composable/useAsync";

const router = useRouter();

const COLUMNS = [
  {
    name: "event_title",
    label: "Конкурс",
    field: "event_title",
    sortable: true,
    align: "left",
  },
  {
    name: "organization_name",
    label: "Организация",
    field: "organization_name",
    sortable: true,
    align: "left",
  },
  {
    name: "start_date",
    label: "Дата начала",
    field: "start_date",
    sortable: true,
    format: (val, row) => formatDate(row.start_date),
    align: "center",
  },
  {
    name: "end_date",
    label: "Дата конца",
    field: "end_date",
    sortable: true,
    format: (val, row) => formatDate(row.end_date),
    align: "center",
  },
];

const rows = ref([]);
const filter = ref("");

function openRow(event, row) {
  router.push({
    name: "Event",
    params: { id: row.id },
  });
}

const { run: fetchData, loading } = createAsyncProcess(async () => {
  const response = await Api.getTable(TABLES.EVENTS);
  rows.value = response.data;
});

fetchData();
</script>
