<template>
  <div class="container mx-auto">
    <dashboard-navbar />
    <router-view v-slot="{ Component }">
      <suspense>
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
        <template #fallback>
          <q-inner-loading showing>
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
