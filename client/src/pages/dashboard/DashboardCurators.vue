<template>
  <div class="row q-col-gutter-sm q-px-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Добавить куратора</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input v-model="last_name" dense outlined label="Фамилия" />
          <q-input v-model="first_name" dense outlined label="Имя" />
          <q-input v-model="middle_name" dense outlined label="Отчество" />
        </q-card-section>
        <q-card-actions class="q-px-md q-mb-md">
          <q-btn
            color="primary"
            size="md"
            class="full-width"
            label="Добавить"
            @click="insertTo('events')"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered>
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
      first_name: "",
      middle_name: "",
      last_name: "",

      filter: "",
      data: [],
      columns: [
        {
          name: "last_name",
          align: "left",
          label: "Фамилия",
          field: "last_name",
          sortable: true,
        },
        {
          name: "first_name",
          align: "left",
          label: "Имя",
          field: "first_name",
          sortable: true,
        },
        {
          name: "middle_name",
          align: "right",
          label: "Отчество",
          field: "middle_name",
          sortable: true,
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async insertTo() {
      try {
        const response = await insertToTable(
          {
            last_name: this.last_name,
            first_name: this.first_name,
            middle_name: this.middle_name,
          },
          "curators"
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
      this.first_name = "";
      this.last_name = "";
      this.middle_name = "";
    },
    fetchData() {
      this.loading = true;
      getTable("curators")
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
