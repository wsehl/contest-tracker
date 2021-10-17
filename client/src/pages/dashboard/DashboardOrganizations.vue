<template>
  <div class="row q-col-gutter-sm q-px-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Добавить оргиназацю</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input
            dense
            outlined
            label="Название"
            v-model="organization_name"
          />
          <q-uploader
            :factory="uploadFile"
            auto-upload
            flat
            bordered
            accept=".jpg, image/*"
            ref="organization_uploader"
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
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="organization_name" :props="props">
                {{ props.row.organization_name }}
              </q-td>
            </q-tr>
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
