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
      <carousel class="carousel" :items-to-show="1" :wrap-around="true">
        <slide v-for="item in events" :key="item.id" class="carousel-item">
          <div class="title">
            <router-link
              class="link"
              :to="{ name: 'Event', params: { id: item.id } }"
            >
              {{ item.event_title }}
            </router-link>
          </div>
          <div class="footer">
            <p class="date">
              {{ formatDate(item.start_date) }} -
              {{ formatDate(item.end_date) }}
            </p>
          </div>
          <div class="body">
            <span class="organization">
              Организация: {{ item.organization_name }}
            </span>
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
import { TABLES } from "@/config";
import { formatDate } from "@/utils";
import { createAsyncProcess } from "@/composable/useAsync";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const events = ref([]);
const organizations = ref([]);

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
.section-title
  display: flex
  flex-direction: column
  align-items: center
  font-size: 32px
  font-weight: 400
  padding: 10px 0 10px 0

.carousel-wrapper
  display: flex
  justify-content: center
  text-align: center
  .carousel
    border-bottom: 1px solid #ebeaeb
    width: 100%
    max-width: 90%
    .carousel-item
      display: flex
      flex-direction: column
      align-items: center
      width: 400px
      .title
        display: flex
        justify-content: center
        text-align: center
        .link
          font-size: 28px
          text-decoration: none
          font-weight: 400
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          &:hover
            text-decoration: underline
      .body
        display: flex
        .organization
          font-size: 14px
      .footer
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        .date
          font-size: 16px
</style>
