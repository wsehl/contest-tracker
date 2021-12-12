<template>
  <dashboard-template>
    <template #form>
      <q-card-section>
        <div class="text-h6">Добавить оргиназацю</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-md">
        <q-input v-model="organization_name" dense outlined label="Название" />
        <q-uploader
          ref="organization_uploader"
          :factory="uploadFile"
          auto-upload
          flat
          bordered
          accept=".jpg, image/*"
          :hide-upload-btn="true"
          @rejected="onRejected"
        />
      </q-card-section>
      <q-card-actions class="q-px-md q-mb-md">
        <q-btn
          color="primary"
          size="md"
          class="full-width"
          label="Добавить"
          @click="insertTo('organizations')"
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
        <template #body="props">
          <q-tr :props="props">
            <q-td key="organization_name" :props="props">
              {{ props.row.organization_name }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>
  </dashboard-template>
</template>

<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
/* eslint-disable no-unused-vars */
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
      organization_name: "",
      organization_file: null,

      filter: "",
      data: [],
      columns: [
        {
          name: "organization_name",
          align: "left",
          label: "Название",
          field: "organization_name",
          sortable: true,
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    uploadFile(files) {
      this.organization_file = files[0];
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },
    async insertTo() {
      try {
        const organization_credentials = new FormData();
        organization_credentials.append("name", this.organization_name);
        organization_credentials.append("file", this.organization_file);

        const response = await insertToTable(
          organization_credentials,
          "organizations"
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
      this.organization_name = "";
      this.$refs.organization_uploader.reset();
    },
    fetchData() {
      this.loading = true;
      getTable("organizations")
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
