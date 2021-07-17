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

<style lang="sass" src="@/styles/styles.sass"></style>
