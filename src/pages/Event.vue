<template>
  <div v-if="!loading">
    <q-page class="q-page flex column items-center q-layout-padding">
      <div v-if="!exists">
        <div class="flex column items-center q-pb-md">
          <div class="text-h3">Not Found</div>
          <div class="text-subtitle1">There are no such event</div>
        </div>
      </div>
      <div v-else>
        <div class="flex column items-center q-pb-md ">
          <div class="text-h3">{{ event.event_title }}</div>
          <div class="text-subtitle1">
            {{
              `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
            }}
          </div>
          <div class="w-50 flex column items-center q-mt-md">
            <div class="text-body1">
              {{ event.event_description }}
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import api from "@/services/api.js";
import { format } from "date-fns";

export default {
  data() {
    return {
      loading: true,
      exists: false,

      event: {},
    };
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "PP");
    },
    fetchData() {
      api
        .getRow("event", this.$route.params.id)
        .then((response) => {
          if (response.status === 404) {
            this.exists = false;
          } else {
            this.exists = true;
            this.event = response.data[0];
            console.log(this.event);
          }
        })
        .finally(() => {
          this.loading = false;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: error.response.data.msg,
            progress: true,
            timeout: 1500,
          });
        });
    },
  },
  created() {
    this.$q.loading.show();
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped></style>
