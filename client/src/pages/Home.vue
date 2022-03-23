<template>
  <q-page>
    <q-parallax src="@/assets/hero.jpg" :height="420">
      <h3 class="text-white text-center">
        Проектная деятельность НИШ Павлодар
      </h3>
    </q-parallax>
    <div class="container mx-auto">
      <div class="section-title">Актуальные конкурсы</div>
    </div>
    <div class="carousel-wrapper" v-if="!loading">
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
              :src="`${FIREBASE_STORAGE}/${item.organization_image}?alt=media`"
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

<script setup>
import { ref } from "vue";
import { Api } from "@/api";
import { FIREBASE_STORAGE, TABLES } from "@/config";
import { formatDate } from "@/utils";
import { createAsyncProcess } from "@/composable/useAsync";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const events = ref(null);
const organizations = ref(null);

const { run, loading } = createAsyncProcess(async () => {
  const [orgsData, eventsData] = await Promise.all([
    Api.getTable(TABLES.ORGANIZATIONS),
    Api.getTable(TABLES.EVENTS),
  ]);
  organizations.value = orgsData.data;
  events.value = eventsData.data;
}, true);

run();
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
