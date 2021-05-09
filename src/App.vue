<template>
  <div id="q-app">
    <q-ajax-bar :color="'primary'" :position="'top'" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap")

#q-app
  font-family: "Inter", sans-serif

.w-50
  width: 50%
</style>
