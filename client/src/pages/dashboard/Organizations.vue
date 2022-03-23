<template>
  <div>
    <dashboard-template>
      <template #form>
        <q-card-section>
          <div class="text-h6">Добавить оргиназацю</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="form.organization_name"
            dense
            outlined
            label="Название"
          />
          <q-uploader
            ref="organization_uploader"
            :factory="uploadFile"
            auto-upload
            flat
            bordered
            accept=".jpg, image/*"
            :hide-upload-btn="true"
            style="max-width: 280px"
            multiple
            batch
            @rejected="onRejected"
          />
        </q-card-section>
        <q-card-actions class="q-px-md q-mb-md">
          <q-btn
            color="primary"
            size="md"
            class="full-width"
            label="Добавить"
            @click="onSubmit"
          />
        </q-card-actions>
      </template>
      <template #table>
        <q-table
          class="text-grey-8"
          :rows="data"
          :columns="COLUMNS"
          :filter="filter"
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
          <template #body="props">
            <q-tr :props="props">
              <q-td key="organization_name" :props="props">
                {{ props.row.organization_name }}
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn
                  icon="visibility"
                  size="sm"
                  no-caps
                  unelevated
                  @click="viewItem(props.row)"
                />
                <q-btn
                  icon="edit"
                  size="sm"
                  no-caps
                  unelevated
                  @click="editItem(props.row)"
                />
                <q-btn
                  icon="delete"
                  size="sm"
                  no-caps
                  unelevated
                  @click="removeRow(props.row)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </template>
    </dashboard-template>
    <q-dialog v-model="showEditDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Данные пользователя
            <q-btn
              v-close-popup
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-input
              v-model="editedItem.organization_name"
              outlined
              dense
              label="Организация"
            />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            v-close-popup
            flat
            label="Обновить"
            color="primary"
            @click="editRow"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showViewDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Данные пользователя
            <q-btn
              v-close-popup
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Организация" stack-label outlined dense>
              <template #control>
                {{ viewedItem.organization_name }}
              </template>
            </q-field>
            <q-field label="Лого" stack-label outlined dense>
              <q-img
                style="max-width: 300px; height: 150px"
                class="q-m-md"
                spinner-color="blue"
                fit="contain"
                :src="`${FIREBASE_STORAGE}/${viewedItem.organization_image}?alt=media`"
              />
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { useQuasar } from "quasar";
import { TABLES, FIREBASE_STORAGE } from "@/config";

const $q = useQuasar();

const TABLE = TABLES.ORGANIZATIONS;
const COLUMNS = [
  {
    name: "organization_name",
    align: "left",
    label: "Название",
    field: "organization_name",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
  },
];

const organization_uploader = ref();

const form = ref({
  organization_name: "",
  organization_file: null,
});

const {
  data,
  loading,
  filter,
  showEditDialog,
  showViewDialog,
  editedItem,
  viewedItem,
  onSubmit,
  fetchData,
  editRow,
  removeRow,
  editItem,
  viewItem,
} = useDashboard({
  submit: async () => {
    const organization_credentials = new FormData();
    organization_credentials.append("name", form.value.organization_name);
    organization_credentials.append("file", form.value.organization_file);

    await Api.insertToTable(TABLE, organization_credentials);
  },
  reset: () => {
    form.value.organization_name = "";
    organization_uploader.value.reset();
  },
  fetch: async () => {
    const response = await Api.getTable(TABLE);
    data.value = response.data;
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, {
      organization_name: editedItem.value.organization_name,
    });
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
});

const uploadFile = (files) => {
  form.value.organization_file = files[0];
};
const onRejected = (rejectedEntries) => {
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
};

fetchData();
</script>
