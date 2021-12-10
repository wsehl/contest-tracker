<template>
  <q-page class="container mx-auto q-pa-md">
    <q-table
      :loading="loading"
      title="Конкурсы"
      color="primary"
      :rows="data"
      :columns="columns"
      :filter="filter"
      :pagination="{
        rowsPerPage: 15,
      }"
      flat
      bordered
      @row-click="goToEvent"
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

<script>
import { getTable } from "@/api";
import { format } from "date-fns";

export default {
  data() {
    return {
      loading: true,
      data: [],
      filter: "",
      columns: [
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
          format: (val, row) => `${this.formatDate(row.start_date)}`,
          align: "center",
        },
        {
          name: "end_date",
          label: "Дата конца",
          field: "end_date",
          sortable: true,
          format: (val, row) => `${this.formatDate(row.end_date)}`,
          align: "center",
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "PP");
    },
    goToEvent(event, row) {
      this.$router.push({
        name: "Event",
        params: { id: row.id },
      });
    },
    fetchData() {
      this.loading = true;
      getTable("events")
        .then((response) => {
          this.data = response.data;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: error.response.data.msg,
            progress: true,
            timeout: 1500,
          });
        });
    },
  },
};
</script>
