<template>
  <div class="row q-col-gutter-sm q-px-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Добавить событие</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input dense outlined label="Название" v-model="event_title" />
          <q-select
            dense
            outlined
            v-model="event_organization"
            :options="event_organization_options"
            label="Организация"
            input-debounce="0"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            dense
            outlined
            label="Описание"
            v-model="event_description"
            type="textarea"
          />
          <q-date flat bordered v-model="event_range" range />
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
              <q-td key="event_title" :props="props">
                {{ props.row.event_title }}
              </q-td>
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
      event_title: "",
      event_organization: "",
      event_description: "",
      event_organization_options: [],
      event_range: { from: "", to: "" },

      filter: "",
      data: [],
      columns: [
        {
          name: "event_title",
          align: "left",
          label: "Название",
          field: "event_title",
          sortable: true,
        },
        {
          name: "organization_name",
          align: "left",
          label: "Организация",
          field: "organization_name",
          sortable: true,
        },
      ],
    };
  },
  created() {
    this.getOrganizationsList();
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
    async getOrganizationsList() {
      const response = await getTable("organizations");
      response.data.forEach((obj) =>
        this.renameObjectKey({
          obj,
          old_key: "organization_name",
          new_key: "label",
        })
      );
      this.event_organization_options = response.data;
    },
    async insertTo() {
      try {
        const event_credentials = {
          event_organization: this.event_organization.id,
          event_title: this.event_title,
          event_description: this.event_description,
          event_start_date: this.event_range.from,
          event_end_date: this.event_range.to,
        };
        const response = await insertToTable(event_credentials, "events");

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
      this.event_title = "";
      this.event_organization = "";
      this.event_description = "";
      this.event_range.from = "";
      this.event_range.to = "";
    },
    fetchData() {
      this.loading = true;
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
};
</script>
