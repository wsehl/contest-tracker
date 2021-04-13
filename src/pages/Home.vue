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
        paginationActiveColor="#42b983"
        paginationColor="#b2ebd1"
        easing="linear"
        class="carousel"
      >
        <slide v-for="item in events.data" :key="item.id" class="carousel-item">
          <h5>{{ item.event_title }}</h5>
          <div style="margin-bottom: 20px">
            <img
              style="vertical-align:middle"
              class="image"
              :src="item.organization_image"
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
import axios from "axios";
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

      flickityOptions: {
        initialIndex: 3,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
      },
    };
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "dd.MM.yyyy");
    },
    fetchData() {
      const organizations = `http://localhost:8888/api/dashboard/organizations`;
      const events = `http://localhost:8888/api/dashboard/events`;

      const fetchedData = (url) => axios.get(url);

      const promises = [organizations, events].map(fetchedData);

      Promise.all(promises)
        .then((response) => {
          this.organizations = response[0].data;
          this.events = response[1].data;
          console.log(this.organizations, this.events);
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
    const kal = this.formatDate(new Date());
    console.log(kal);
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
