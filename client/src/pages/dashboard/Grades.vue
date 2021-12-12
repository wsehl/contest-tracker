<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить класс</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="name" dense outlined label="Название" />
        <q-select
          v-model="curator"
          dense
          outlined
          :options="curator_options"
          label="Куратор"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-actions class="q-px-md q-mb-md">
        <q-btn
          color="primary"
          size="md"
          class="full-width"
          label="Добавить"
          @click="insertTo('grades')"
        />
      </q-card-actions>
    </template>
    <template #table>
      <q-table
        class="text-grey-8"
        :rows="data"
        :columns="columns"
        :pagination="{
          rowsPerPage: 15,
        }"
        :loading="loading"
        row-key="organization_name"
      >
        <template #top-left>
          <q-input v-model="filter" outlined dense placeholder="Поиск">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #top-right="props">
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          >
            <q-tooltip v-close-popup :disable="$q.platform.is.mobile">
              {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
            </q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </template>
  </dashboard-template>
</template>

<script>
/* eslint-disable no-unused-vars */
import DashboardTemplate from "@/components/DashboardTemplate.vue";

import {
  insertToTable,
  removeRow,
  getTable,
  editRow as editRowInTable,
  removeSeveralRows,
} from "@/api";

export default {
  components: {
    DashboardTemplate,
  },
  data() {
    return {
      loading: true,
      name: "",
      curator_options: [],
      curator: null,

      mask: "@@&",
      tokens: {
        "@": {
          pattern: /(?:^|(?<= ))(7|8|9|10|11|12|[1-9]\d*$)(?:(?= )|$)/,
        },
        "&": {
          pattern: /(?:^|(?<= ))(A|B|C|D|E|F|G|H|[1-9]\d*$)(?:(?= )|$)/,
        },
      },

      filter: "",
      data: [],
      columns: [
        {
          name: "name",
          align: "left",
          label: "Название",
          field: "name",
          sortable: true,
        },
        {
          name: "curator",
          align: "right",
          label: "Куратор",
          field: (row) =>
            `${row.curator.last_name} ${row.curator.first_name} ${row.curator.middle_name}`,
          sortable: true,
        },
      ],
    };
  },
  created() {
    this.getCuratorsList();
    this.fetchData();
  },
  methods: {
    renameObjectKey({ obj, old_key, new_key }) {
      if (old_key !== new_key) {
        Object.defineProperty(
          obj,
          new_key,
          Object.getOwnPropertyDescriptor(obj, old_key)
        );
        delete obj[old_key];
      }
    },
    obsKeysToString(o, k, sep) {
      return k
        .map((key) => o[key])
        .filter((v) => v)
        .join(sep);
    },
    async getCuratorsList() {
      const response = await getTable("curators");

      response.data.forEach((row) => {
        row.full_name = `${row.last_name} ${row.first_name} ${row.middle_name}`;
      });

      response.data.forEach((obj) =>
        this.renameObjectKey({
          obj,
          old_key: "full_name",
          new_key: "label",
        })
      );
      this.curator_options = response.data;
    },
    async insertTo() {
      try {
        console.log(this.curator);

        const response = await insertToTable(
          {
            name: this.name,
            curator_id: this.curator.id,
          },
          "grades"
        );

        this.clearForm();
        this.fetchData();

        this.$q.notify({
          color: "positive",
          position: "bottom-left",
          message: response.msg,
          progress: true,
          timeout: 1500,
        });
      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "bottom-left",
          message: error.response.data.msg,
          progress: true,
          timeout: 1500,
        });
      }
    },
    clearForm() {
      this.name = "";
      this.curator = "";
    },
    fetchData() {
      this.loading = true;
      getTable("grades")
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
};
</script>
