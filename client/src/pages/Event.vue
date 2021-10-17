<template>
  <q-page v-if="!loading" class="container mx-auto q-pa-md">
    <div v-if="!exists">
      <div class="flex column q-pb-md">
        <div class="text-h3">Not Found</div>
        <div class="text-subtitle1">There are no such event</div>
      </div>
    </div>
    <div v-else class="flex column items-start q-pb-md">
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
            `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
          }}
        </div>
        <div class="text-h6">Description</div>
        <div class="text-body1">
          {{ event.event_description }}
        </div>
        <div class="text-h6 q-mt-md">Organization</div>
        <div class="organization-section">
          <div class="body">
            <q-img
              spinner-color="blue"
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
  </q-page>
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
    align-items: start
    .image
      width: 150px
      height: 150px
      margin: 5px 0px 5px 0px
      border-radius: 4px
      border: 1px #e5e5e5 solid
      object-fit: cover
      object-position: center
    .organization
      font-size: 18px
      font-weight: 400
</style>
