<template>
  <q-page>
    <template v-if="!loading">
      <div class="row">
        <q-parallax src="nis_pavlodar.jpg">
          <div
            class="text-h3 q-pa-lg rounded-borders text-center"
            style="background: rgba(255,255,255,0.5);backdrop-filter: blur(5px);color: #272727 !important;border-radius: 10px;"
          >
            Проектная деятельность НИШ Павлодар
          </div>
        </q-parallax>
      </div>
      <carousel
        paginationActiveColor="#3B82F6"
        paginationColor="#BFDBFE"
        easing="ease-out"
        class="carousel"
        :scrollPerPage="true"
        :autoplay="true"
        :speed="300"
        :autoplayHoverPause="true"
        :perPageCustom="[
          [768, 3],
          [1024, 4],
        ]"
      >
        <slide v-for="item in events.data" :key="item.id" class="carousel-item">
          <h5>
            <router-link
              :to="{
                name: 'Event',
                params: {
                  id: item.id,
                },
              }"
              >{{ item.event_title }}</router-link
            >
          </h5>
          <div style="margin-bottom: 20px">
            <img
              style="vertical-align:middle"
              class="image"
              :src="`${url}/${item.organization_image}?alt=media`"
            />
            <span style="vertical-align:middle; margin-left: 10px">
              {{ item.organization_name }}
            </span>
          </div>
          <p>
            {{ formatDate(item.start_date) }} - {{ formatDate(item.end_date) }}
          </p>
        </slide>
      </carousel>
    </template>
  </q-page>
</template>

<script>
import api from "@/services/api.js";
import { Carousel, Slide } from "vue-carousel";
const { format } = require("date-fns");

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      loading: true,
      organizations: [],
      events: [],
    };
  },
  computed: {
    url() {
      // return `${process.env.VUE_APP_BACKEND_URL}/static`;
      return `https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o`;
    },
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "dd.MM.yyyy");
    },
    fetchData() {
      Promise.all([api.getOrganizationsTable(), api.getEventsTable()])
        .then((results) => {
          this.organizations = results[0];
          this.events = results[1];
          this.loading = false;
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.$q.loading.show();
    this.fetchData();
  },
};
</script>

<style>
.image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.carousel {
  background-color: #f1f1f1;
}
.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
