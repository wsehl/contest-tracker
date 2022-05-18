<template>
  <q-page class="container mx-auto q-pa-md">
    <div class="flex column q-pb-md">
      <div class="text-h3">Помощь</div>
      <div class="text-subtitle1">Ответы на часто задаваемые вопросы</div>
    </div>
    <q-card flat bordered>
      <q-list bordered>
        <q-expansion-item
          v-for="{ question, answer } in FAQ"
          expand-separator
          icon="help"
          :label="question"
          :key="question"
        >
          <q-card>
            <q-card-section>
              {{ answer }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
const FAQ = [
  {
    question: "Что такое Сontest Tracker?",
    answer:
      "Contest Tracker это единая платформа для учителей и учеников посвящённая проектной деятельности в НИШ Павлодар",
  },
  {
    question: "Можно ли получать уведомления о новых событиях по почте?",
    answer: "Нет",
  },
];
</script>
