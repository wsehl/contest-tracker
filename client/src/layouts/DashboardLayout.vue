<template>
  <div class="container mx-auto">
    <dashboard-navbar />
    <router-view v-slot="{ Component }">
      <suspense>
        <component :is="Component" />
        <template #fallback>
          <q-inner-loading showing>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </suspense>
    </router-view>
  </div>
</template>
