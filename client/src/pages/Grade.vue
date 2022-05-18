<template>
  <q-page v-if="!loading" class="container mx-auto q-pa-md">
    <div v-if="!exists">
      <div class="flex column q-pb-md">
        <div class="text-h3">Не найдено</div>
        <div class="text-subtitle1">Класс с таким id не найден</div>
      </div>
    </div>
    <div v-else class="flex column items-start q-pb-md">
      <div class="flex column q-mt-md">
        <div class="text-h4 q-mb-md">
          {{ grade.name }}
        </div>
        <div class="text-h6">Куратор</div>
        <div class="text-subtitle1 q-mb-md">
          {{ formatName(grade.curator) }}
        </div>
        <div class="text-h6">Ученики</div>
        <div class="text-body1">
          <ul>
            <li v-for="(student, i) in grade.students" :key="i">
              {{ i + 1 }}. {{ formatName(student) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Api } from "@/api";
import { formatName } from "@/utils";
import { createAsyncProcess } from "@/composable/useAsync";
import { FIREBASE_STORAGE, TABLES } from "@/config";

const route = useRoute();

const exists = ref(true);

const grade = ref(null);

const fetchData = async () => {
  const { data } = await Api.getRow(TABLES.GRADES, route.params.id);
  grade.value = data;
};

const { run, loading } = createAsyncProcess(fetchData, true);

run();
</script>
