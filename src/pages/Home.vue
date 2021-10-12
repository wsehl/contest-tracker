<template>
  <q-page>
    <template v-if="!loading">
      <q-parallax src="main_picture.jpg">
        <div class="text-h3 text-center parallax-title">
          <div>Проектная деятельность<br />НИШ Павлодар</div>
        </div>
      </q-parallax>
      <div class="upcoming-events">Upcoming Events</div>
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
          [1024, 3],
        ]"
      >
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
              >{{ item.event_title }}
            </router-link>
          </div>
          <div class="body">
            <img
              class="image"
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
      </carousel>
    </template>
  </q-page>
</template>

<script>
import { getTable } from "@/api";
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
      return `https://firebasestorage.googleapis.com/v0/b/contest-tracker-87dc8.appspot.com/o`;
    },
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
  created() {
    this.$q.loading.show();
    this.fetchData();
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

.upcoming-events
  display: flex
  flex-direction: column
  align-items: center
  font-size: 24px
  font-weight: 500
  padding: 15px 0 5px 0

.carousel
  border-bottom: 1px solid #ebeaeb
  .carousel-item
    display: flex
    flex-direction: column
    align-items: center
    margin-top: 20px
    margin-bottom: -20px
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
