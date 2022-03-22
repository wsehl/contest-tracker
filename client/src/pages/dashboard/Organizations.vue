<template>
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
          </q-tr>
        </template>
      </q-table>
    </template>
  </dashboard-template>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { useQuasar } from "quasar";
import { TABLES } from "@/config";

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
];

const organization_uploader = ref();

const form = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
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
    await Api.editRow(TABLE, editedItem.value.id, editedItem.value);
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
