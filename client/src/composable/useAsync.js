import { ref } from "vue";
import { Loading } from "quasar";

// stolen from here
// https://github.com/mutoe/vue3-realworld-example-app/blob/master/src/utils/create-async-process.ts

export function createAsyncProcess(fn, showLoader) {
  const loading = ref(false);
  const error = ref(false);
  const run = async (...args) => {
    try {
      showLoader && Loading.show();
      loading.value = true;
      error.value = false;
      const result = await fn(...args);
      return result;
    } catch (e) {
      error.value = e;
      return e;
    } finally {
      showLoader && Loading.hide();
      loading.value = false;
    }
  };
  return { loading, error, run };
}
