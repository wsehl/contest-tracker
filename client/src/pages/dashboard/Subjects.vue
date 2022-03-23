<template>
  <div>
    <dashboard-template>
      <template #form>
        <q-card-section>
          <div class="text-h6">Добавить предмет</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input v-model="form.name" dense outlined label="Предмет" />
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
          row-key="name"
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
              <q-td key="name" :props="props">
                {{ props.row.name }}
                <q-popup-edit
                  v-model="props.row.name"
                  title="Редактировать предмет"
                  auto-save
                  v-slot="scope"
                  @show="editedItem = props.row"
                  @save="editNamePopup"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="actions" :props="props">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";

const TABLE = TABLES.SUBJECTS;
const COLUMNS = [
  {
    name: "name",
    align: "left",
    label: "Предмет",
    field: "name",
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
  },
];

const form = ref({
  name: "",
});

const { data, loading, filter, editedItem, onSubmit, fetchData, removeRow } =
  useDashboard({
    submit: async () => {
      await Api.insertToTable(TABLE, {
        name: form.value.name,
      });
    },
    reset: () => {
      form.value.name = "";
    },
    fetch: async () => {
      const repsonse = await Api.getTable(TABLE);
      data.value = repsonse.data;
    },
    remove: async (item) => {
      await Api.removeRow(TABLE, item);
    },
  });

const editNamePopup = async (value) => {
  await Api.editRow(TABLE, editedItem.value.id, { name: value });
  await fetchData();
};

fetchData();
</script>
