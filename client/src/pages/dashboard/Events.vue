<template>
  <div>
    <dashboard-template>
      <template #form>
        <q-card-section>
          <div class="text-h6">Добавить конкурс</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-gutter-md">
          <q-input v-model="form.event_title" dense outlined label="Название" />
          <q-select
            v-model="form.event_organization"
            dense
            outlined
            :options="organizationOptions"
            label="Организация"
            input-debounce="0"
          />
          <q-input
            v-model="form.event_description"
            dense
            outlined
            label="Описание"
            type="textarea"
          />
          <q-date v-model="form.event_range" minimal flat bordered range />
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
          row-key="event_title"
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
              <q-td key="event" :props="props">
                {{ props.row.event_title }}
              </q-td>
              <q-td key="organization" :props="props">
                {{ props.row.organization.label }}
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
              v-model="editedItem.event_title"
              dense
              outlined
              label="Название"
            />
            <q-select
              v-model="editedItem.organization"
              dense
              outlined
              :options="organizationOptions"
              label="Организация"
              input-debounce="0"
            />
            <q-input
              v-model="editedItem.event_description"
              dense
              outlined
              label="Описание"
              type="textarea"
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
    <q-dialog v-model="showViewDialog" @hide="details = null">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">
            Данные
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
            <q-field label="Название" stack-label dense>
              <template #control>
                {{ viewedItem.event_title }}
              </template>
            </q-field>
            <q-field label="Описание" stack-label dense>
              <template #control>
                {{ viewedItem.event_description }}
              </template>
            </q-field>
            <q-field label="Организация" stack-label dense>
              <template #control>
                {{ viewedItem.organization.label }}
              </template>
            </q-field>
            <q-field label="Дата начала" stack-label dense>
              <template #control>
                {{ formatDate(viewedItem.start_date) }}
              </template>
            </q-field>
            <q-field label="Дата окончания" stack-label dense>
              <template #control>
                {{ formatDate(viewedItem.end_date) }}
              </template>
            </q-field>
          </div>
        </q-card-section>
        <q-card-section v-if="details?.winners.length">
          <div class="text-h6 q-mb-sm">Достижения</div>
          <q-list bordered separator>
            <q-item v-for="(winner, index) in details.winners" :key="index">
              <q-item-section>
                <q-item-label>
                  {{ winner.project.name }}
                </q-item-label>
                <q-item-label caption> Место: {{ winner.place }} </q-item-label>
                <!-- <q-item-label caption class="q-mb-sm">Ученики</q-item-label>
                <q-list bordered>
                  <q-item
                    clickable
                    v-for="student in winner.project.students"
                    :key="student.id"
                  >
                    <q-item-section>
                      <q-item-label>{{ formatName(student) }}</q-item-label>
                      <q-item-label caption>
                        {{ student.study_lang }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list> -->
              </q-item-section>
              <q-item-section side top>
                <q-badge
                  @click="
                    router.push('/dashboard/projects?id=' + winner.project_id)
                  "
                  label="Открыть страницу проекта"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn
            flat
            label="Открыть страницу конкурса"
            @click="openRow('Event', viewedItem.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { formatDate, formatName } from "@/utils";
import { useDashboard } from "@/composable/useDashboard";
import { TABLES } from "@/config";
import { useRouter } from "vue-router";

const router = useRouter();

const TABLE = TABLES.EVENTS;
const COLUMNS = [
  {
    name: "event",
    align: "left",
    label: "Название",
    field: "event_title",
    sortable: true,
  },
  {
    name: "organization",
    align: "left",
    label: "Организация",
    field: (row) => row.organization.label,
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Действия",
  },
];

const form = ref({
  event_title: "",
  event_organization: null,
  event_description: "",
  event_range: { from: "", to: "" },
});
const organizationOptions = ref([]);
const details = ref(null);

function openRow(route, id) {
  router.push({
    name: route,
    params: { id },
  });
}

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
    const event_credentials = {
      event_organization: form.value.event_organization.value,
      event_title: form.value.event_title,
      event_description: form.value.event_description,
      event_start_date: form.value.event_range.from,
      event_end_date: form.value.event_range.to,
    };
    await Api.insertToTable(TABLE, event_credentials);
  },
  reset: () => {
    form.value = {
      event_title: "",
      event_organization: null,
      event_description: "",
      event_range: { from: "", to: "" },
    };
  },
  fetch: async () => {
    const response = await Api.getTable(TABLE);
    data.value = response.data.map((item) => {
      return {
        ...item,
        organization: {
          label: item.organization_name,
          value: item.organization_id,
        },
      };
    });
  },
  edit: async () => {
    await Api.editRow(TABLE, editedItem.value.id, {
      ...editedItem.value,
      organization_id: editedItem.value.organization.value,
    });
  },
  remove: async (item) => {
    await Api.removeRow(TABLE, item);
  },
  view: async (item) => {
    const response = await Api.getRow(TABLE, item.id);
    details.value = response.data[0];
  },
});

const fetchOrganizations = async () => {
  const response = await Api.getTable(TABLES.ORGANIZATIONS);
  organizationOptions.value = response.data.map((item) => {
    return {
      label: item.organization_name,
      value: item.id,
    };
  });
};

Promise.all([fetchOrganizations(), fetchData()]);
</script>
