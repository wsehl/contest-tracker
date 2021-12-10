<template>
  <q-page v-if="!loading">
    <q-parallax src="@/assets/hero.jpg" :height="420">
      <h3 class="text-white text-center">
        Проектная деятельность НИШ Павлодар
      </h3>
    </q-parallax>
    <div class="container mx-auto">
      <div class="section-title">Актуальные конкурсы</div>
    </div>
    <div class="carousel-wrapper">
      <carousel class="carousel" :items-to-show="3" :wrap-around="true">
        <slide v-for="item in events" :key="item.id" class="carousel-item">
          <div class="title">
            <router-link
              class="link"
              :to="{
                name: 'Event',
                params: {
                  id: item.id,
                },
              }"
            >
              {{ item.event_title }}
            </router-link>
          </div>
          <div class="body">
            <q-img
              class="image"
              spinner-color="blue"
              :src="`${url}/${item.organization_image}?alt=media`"
            />
            <span class="organization">
              {{ item.organization_name }}
            </span>
          </div>
          <div class="footer">
            <p class="date">
              {{ formatDate(item.start_date) }} -
              {{ formatDate(item.end_date) }}
            </p>
          </div>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
  </q-page>
</template>

<script>
import { getTable } from "@/api";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// const { format } = require("date-fns");

import { format } from "date-fns";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
      return `https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o`;
    },
  },
  created() {
    this.$q.loading.show();
    this.fetchData();
  },
  methods: {
    formatDate(d) {
      return format(new Date(d), "PP");
    },
    fetchData() {
      Promise.all([getTable("organizations"), getTable("events")])
        .then((results) => {
          this.organizations = results[0].data;
          this.events = results[1].data;
        })
        .finally(() => {
          this.loading = false;
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.parallax-title
  background: rgba(255,255,255,0.5)
  backdrop-filter: blur(5px)
  color: #0c1c27
  border-radius: 15px
  padding: 25px

.section-title
  display: flex
  flex-direction: column
  align-items: center
  font-size: 28px
  font-weight: 400
  padding: 10px 0 10px 0

.carousel-wrapper
  display: flex
  justify-content: center
  text-align: center
  .carousel
    border-bottom: 1px solid #ebeaeb
    max-width: 90%
    .carousel-item
      display: flex
      flex-direction: column
      align-items: center
      .title
        display: flex
        justify-content: center
        text-align: center
        .link
          font-size: 26px
          text-decoration: none
          color: #4a4a4a
          width: 400px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          &:hover
            text-decoration: underline
      .body
        display: flex
        align-items: center
        justify-content: center
        margin: 10px 0px 10px 0px
        .image
          width: 55px
          height: 55px
          border-radius: 50%
          object-fit: cover
          object-position: center
          margin-right: 5px
        .organization
          font-size: 20px
          margin-left: 5px
      .footer
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        .date
          font-size: 14px
          font-weight: 500
</style>
