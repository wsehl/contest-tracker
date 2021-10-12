<template>
  <q-page class="q-page flex column items-center q-layout-padding">
    <div class="flex column items-center q-pb-md">
      <div class="text-h3">Events</div>
    </div>
    <template v-if="!loading">
      <div class="q-mt-md">
        <q-table
          @row-click="goToEvent"
          :data="data"
          :color="'primary'"
          :columns="columns"
          :pagination="{
            rowsPerPage: 15,
          }"
          flat
          bordered
        />
      </div>
    </template>
  </q-page>
</template>

<script>
import { getTable } from "@/api";
import EventsTable from "@/mixins/tables/EventsTable.js";

export default {
  mixins: [EventsTable],
  data() {
    return {
      loading: true,
      data: [],
    };
  },
  methods: {
    goToEvent(event, row) {
      this.$router.push({
        name: "Event",
        params: { id: row.id },
      });
    },
    fetchData() {
      getTable("events")
        .then((response) => {
          this.data = response.data;
        })
        .finally(() => {
          this.loading = false;
          this.$q.loading.hide();
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
  created() {
    this.$q.loading.show();
    this.fetchData();
  },
};
</script>

<style lang="sass" scoped>
.w-50
    width: 50%
.w-70
    width: 70%
.w-100
    width: 100%
.about
    .school-link
        color: inherit
</style>
