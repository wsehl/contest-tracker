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
        <div class="flex column items-center q-pb-md">
          <q-btn
            outline
            rounded
            color="primary"
            icon="event"
            label="All events"
            :to="{ name: 'Events' }"
          />
          <div class="w-50 flex column q-mt-md">
            <div class="text-h4 q-mb-md">
              {{ event.event_title }}
            </div>
            <div class="text-h6">Date</div>
            <div class="text-subtitle1 q-mb-md">
              {{
                `${formatDate(event.start_date)} - ${formatDate(
                  event.end_date
                )}`
              }}
            </div>
            <div class="text-h6">Description</div>
            <div class="text-body1">
              {{ event.event_description }}
            </div>
            <div class="text-h6 q-mt-md">Organization</div>
            <div class="organization-section">
              <div class="body">
                <img
                  class="image"
                  :src="`${url}/${event.organization_image}?alt=media`"
                />
                <span class="organization">
                  {{ event.organization_name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { getRow } from "@/api";
import { format } from "date-fns";

export default {
  data() {
    return {
      loading: true,
      exists: false,

      event: {},
    };
  },
  computed: {
    url() {
      return `https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o`;
    },
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "PP");
    },
    fetchData() {
      getRow("event", this.$route.params.id)
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

<style lang="sass" scoped>
.organization-section
  display: flex
  flex-direction: column
  align-items: flex-start
  .body
    display: flex
    flex-direction: column
    align-items: center
    .image
      width: 150px
      height: 150px
      border-radius: 50%
      bject-fit: cover
</style>
