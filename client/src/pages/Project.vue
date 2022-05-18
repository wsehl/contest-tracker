<template>
  <q-page v-if="!loading" class="container mx-auto q-pa-md">
    <div v-if="!exists">
      <div class="flex column q-pb-md">
        <div class="text-h3">Не найдено</div>
        <div class="text-subtitle1">Проект с таким id не найден</div>
      </div>
    </div>
    <div v-else class="flex column items-start q-pb-md">
      <div class="flex column q-mt-md">
        <div class="text-h4 q-mb-md">
          {{ project.name }}
        </div>
        <div class="text-subtitle1">
          {{ project.description }}
        </div>

        <div class="q-mt-md">
          <div class="text-h6">Дата начала работы над проектом</div>
          <div class="text-subtitle1">
            {{ formatDate(project.start_date) }}
          </div>
        </div>
        <div class="q-mt-md">
          <div class="text-h6">Дата завершения работы над проектом</div>
          <div class="text-subtitle1">
            {{ formatDate(project.end_date) }}
          </div>
        </div>

        <div class="q-mt-md">
          <div class="text-h6">Предмет</div>
          <div class="text-subtitle1">
            {{ project.subject.name }}
          </div>
        </div>

        <div class="q-mt-md">
          <div class="text-h6">Научный руководитель</div>
          <div class="text-subtitle1">
            {{ formatName(project.teacher) }}
          </div>
        </div>

        <div class="q-mt-md">
          <div class="text-h6">Ученики</div>
          <div class="text-body1">
            <ul>
              <li v-for="(student, i) in project.students" :key="i">
                {{ i + 1 }}. {{ formatName(student) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Api } from "@/api";
import { formatName, formatDate } from "@/utils";
import { createAsyncProcess } from "@/composable/useAsync";
import { TABLES } from "@/config";

const route = useRoute();

const exists = ref(true);

const project = ref(null);

const fetchData = async () => {
  const { data } = await Api.getRow(TABLES.PROJECTS, route.params.id);
  project.value = data;
};

const { run, loading } = createAsyncProcess(fetchData, true);

run();
</script>
