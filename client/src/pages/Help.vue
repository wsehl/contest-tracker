<template>
  <q-page class="container mx-auto q-pa-md">
    <div class="flex column q-pb-md">
      <div class="text-h3">Помощь</div>
      <div class="text-subtitle1">Ответы на часто задаваемые вопросы</div>
    </div>
    <q-card flat bordered>
      <q-list bordered>
        <q-expansion-item
          expand-separator
          icon="help"
          label="Для чего нужен Сontest Tracker?"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="lock"
          label="Как я могу изменить или сбросить свой пароль?"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="email"
          label="Можно ли получать уведомления о новых событиях по почте?"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { askQuestion } from "@/api";
import { reactive } from "vue";

export default {
  setup() {
    let question = reactive("");

    const ask = async () => {
      try {
        // send request to server
        const response = await askQuestion(question);

        // show answer to user
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
    };

    return {
      question,
      ask,
    };
  },
};
</script>
