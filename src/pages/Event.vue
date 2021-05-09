<template>
  <div v-if="!loading">
    Hello
  </div>
</template>

<script>
import api from "@/services/api.js";

export default {
  data() {
    return {
      loading: true,
      event: {},
    };
  },
  methods: {
    fetchData() {
      api
        .getRow("event", this.$route.params.id)
        .then((response) => {
          this.event = response.data;
          console.log(response);
        })
        .finally(() => {
          this.loading = false;
          this.$q.loading.hide();
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "bottom-left",
            message: error.response.data.msg,
            progress: true,
            timeout: 1500,
          });
        });
    },
  },
  created() {
    this.$q.loading.show();
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped></style>
