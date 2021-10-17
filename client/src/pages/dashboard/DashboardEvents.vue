<template>
  <div class="row q-col-gutter-sm q-px-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Добавить событие</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input dense outlined label="Title" v-model="event_title" />
            <q-select
              dense
              outlined
              v-model="event_organization"
              :options="event_organization_options"
              label="Organization"
              input-debounce="0"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              dense
              outlined
              label="Description"
              v-model="event_description"
              type="textarea"
            />
            <q-date v-model="event_range" range />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md q-mb-md">
          <q-btn
            color="primary"
            size="md"
            class=""
            label="Save"
            @click="insertTo('events')"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12"></div>
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
    };
  },
  created() {
    this.getOrganizationsList();
    // this.fetchData();
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
        // this.fetchData();

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
    // fetchData() {
    //   this.loading = true;
    //   getTable("users")
    //     .then((response) => {
    //       this.data = response.data;
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //       this.$q.loading.hide();
    //     })
    //     .catch((error) => {
    //       this.$q.notify({
    //         color: "negative",
    //         position: "bottom-left",
    //         message: error.response.data.msg,
    //         progress: true,
    //         timeout: 1500,
    //       });
    //     });
    // },
  },
};
</script>
