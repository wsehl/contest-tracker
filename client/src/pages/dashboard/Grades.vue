<template>
  <div>
    <dashboard-template>
      <template #form>
        <q-card-section>
          <div class="text-h6">Добавить класс</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="form.name"
            :mask="MASK"
            dense
            outlined
            label="Название"
          />
          <q-select
            v-model="form.curator"
            dense
            outlined
            :options="curatorOptions"
            label="Куратор"
            input-debounce="0"
          >
            <template #no-option>
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
          :filter="filter"
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
              </q-td>
              <q-td key="curator" :props="props">
                {{ props.row.curator.label }}
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
            Редактирование
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
              v-model="editedItem.name"
              :mask="MASK"
              dense
              outlined
              label="Название"
            />
            <q-select
              v-model="editedItem.curator"
              dense
              outlined
              :options="curatorOptions"
              label="Куратор"
              input-debounce="0"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
            Просмотр
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
              v-model="viewedItem.name"
              :mask="MASK"
              readonly
              dense
              outlined
              label="Класс"
            />
            <q-select
              v-model="viewedItem.curator"
              dense
              outlined
              :options="curatorOptions"
              label="Куратор"
              readonly
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { renameObjectKey } from "@/utils";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";

const TABLE = TABLES.GRADES;
const COLUMNS = [
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
    field: "label",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
    field: "actions",
  },
];
const MASK = "##A";

const form = ref({
  name: "",
  curator: null,
});
const curatorOptions = ref([]);

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
    await Api.insertToTable(TABLE, {
      name: form.value.name,
      curator_id: form.value.curator.id,
    });
  },
  reset: () => {
    form.value = {
      name: "",
      curator: {
        label: "",
        value: "",
      },
    };
  },
  fetch: async () => {
    const grades = await Api.getTable(TABLE);
    grades.data.forEach((row) => {
      row.curator.label = `${row.curator.last_name} ${row.curator.first_name} ${row.curator.middle_name}`;
      row.curator.value = row.curator_id;
    });
    data.value = grades.data;
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, editedItem.value);
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
});

const fetchCurators = async () => {
  const curators = await Api.getTable(TABLES.CURATORS);
  curators.data.forEach((row) => {
    row.full_name = `${row.last_name} ${row.first_name} ${row.middle_name}`;
  });
  curators.data.forEach((obj) =>
    renameObjectKey({
      obj,
      old_key: "full_name",
      new_key: "label",
    })
  );
  curatorOptions.value = curators.data;
};

await fetchCurators();
await fetchData();
</script>
