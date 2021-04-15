<template>
  <div>
    Hello
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      event: {},
    };
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}event/${this.$route.params.id}`)
      .catch((err) => console.log(err))
      .then((response) => {
        console.log(response.data);
        document.title = this.response.data.event_name;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="scss" scoped></style>
