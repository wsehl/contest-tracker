<template>
  <div id="q-app">
    <q-ajax-bar :color="'primary'" :position="'bottom'" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
