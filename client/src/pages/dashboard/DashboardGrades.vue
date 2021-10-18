<template>
  <div class="row q-col-gutter-sm q-px-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Добавить класс</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input dense outlined label="Название" v-model="name" />
          <q-select
            dense
            outlined
            v-model="curator"
            :options="curator_options"
            label="Куратор"
            input-debounce="0"
          >
            <template v-slot:no-option>
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
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-table
          class="text-grey-8"
          :data="data"
          :columns="columns"
          :pagination="{
            rowsPerPage: 15,
          }"
          :loading="loading"
          row-key="organization_name"
        >
          <template v-slot:top-left>
            <q-input outlined dense v-model="filter" placeholder="Поиск">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-right="props">
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                {{
                  props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
                }}
              </q-tooltip>
            </q-btn>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import {
  insertToTable,
  removeRow,
  getTable,
  editRow as editRowInTable,
  removeSeveralRows,
} from "@/api";

export default {
  data() {
    return {
      loading: true,
      name: "",
      curator_options: [],
      curator: null,

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
