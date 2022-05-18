<template>
  <q-page v-if="!loading" class="container mx-auto q-pa-md">
    <div v-if="!exists">
      <div class="flex column q-pb-md">
        <div class="text-h3">Не найдено</div>
        <div class="text-subtitle1">Конкурс с таким id не найден</div>
      </div>
    </div>
    <div v-else class="flex column items-start q-pb-md">
      <q-btn
        outline
        rounded
        color="primary"
        icon="event"
        label="Все конкурсы"
        :to="{ name: 'Events' }"
      />
      <div class="flex column q-mt-md">
        <div class="text-h4 q-mb-md">
          {{ event.event_title }}
        </div>
        <div class="text-h6">Даты</div>
        <div class="text-subtitle1 q-mb-md">
          {{
            `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
          }}
        </div>
        <div class="text-h6">Описание</div>
        <div class="text-body1">
          {{ event.event_description }}
        </div>
        <div class="text-h6 q-mt-md">Организация</div>
        <div class="organization-section">
          <div class="body">
            <q-img
              spinner-color="blue"
              class="image"
              :src="`${FIREBASE_STORAGE}/${event.organization_image}?alt=media`"
            />
            <span class="organization">
              {{ event.organization_name }}
            </span>
          </div>
        </div>
        <template v-if="event.winners.length">
          <div class="text-h6">Победители [Проекты]</div>
          <div class="text-body1">
            <ul>
              <template v-for="(winner, i) in event.winners" :key="i">
                <q-card class="q-mt-md">
                  <q-card-section>
                    <div class="text-h6">{{ winner.project.name }}</div>
                    <div class="text-subtitle2">
                      от
                      {{
                        winner.project.students_ids.map((student) => student)
                      }}
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    {{ winner.project.description }}
                  </q-card-section>
                </q-card>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Api } from "@/api";
import { formatDate } from "@/utils";
import { createAsyncProcess } from "@/composable/useAsync";
import { FIREBASE_STORAGE, TABLES } from "@/config";

const route = useRoute();

const exists = ref(false);

const event = ref({});

const fetchData = async () => {
  const response = await Api.getRow(TABLES.EVENTS, route.params.id);
  if (response.status === 404) {
    exists.value = false;
    event.value = response.data;
  } else {
    exists.value = true;
    event.value = response.data[0];
  }
};

const { run, loading } = createAsyncProcess(fetchData, true);

run();
</script>

<style lang="sass" scoped>
.organization-section
  display: flex
  flex-direction: column
  align-items: flex-start
  .body
    display: flex
    flex-direction: column
    align-items: flex-start
    .image
      margin: 5px 0px 5px 0px
      border-radius: 4px
      border: 1px #e5e5e5 solid
    .organization
      font-size: 18px
      font-weight: 400
</style>
