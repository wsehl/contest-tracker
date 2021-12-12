<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить ученика</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="last_name" dense outlined label="Фамилия" />
        <q-input v-model="first_name" dense outlined label="Имя" />
        <q-input v-model="middle_name" dense outlined label="Отчество" />
        <q-select
          v-model="grade"
          dense
          outlined
          :options="grades_options"
          label="Класс"
          input-debounce="0"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          v-model="study_lang"
          dense
          outlined
          :options="study_lang_options"
          label="Язык обучения"
          input-debounce="0"
        ></q-select>
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
      first_name: "",
      middle_name: "",
      last_name: "",
      study_lang: "",
      study_lang_options: ["ru", "kz", "en"],
      grades_options: [],
      grade: null,

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
          align: "left",
          label: "Отчество",
          field: "middle_name",
          sortable: true,
        },
        {
          name: "study_lang",
          align: "left",
          label: "Язык обучения",
          field: "study_lang",
          sortable: true,
        },
        {
          name: "grade_name",
          align: "left",
          label: "Класс",
          field: (row) => row.grade.name,
          sortable: true,
        },
      ],
    };
  },
  created() {
    this.getGradesList();
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
    async getGradesList() {
      const response = await getTable("grades");
      response.data.forEach((obj) =>
        this.renameObjectKey({
          obj,
          old_key: "name",
          new_key: "label",
        })
      );
      this.grades_options = response.data;
    },
    async insertTo() {
      try {
        const response = await insertToTable(
          {
            grade_id: this.grade.id,
            last_name: this.last_name,
            first_name: this.first_name,
            middle_name: this.middle_name,
            study_lang: this.study_lang,
          },
          "students"
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
      this.grade_id = "";
      this.first_name = "";
      this.last_name = "";
      this.middle_name = "";
      this.study_lang = "";
    },
    fetchData() {
      this.loading = true;
      getTable("students")
        .then((response) => {
          console.log(response.data);
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
