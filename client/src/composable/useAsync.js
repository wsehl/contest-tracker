import { ref } from "vue";
import { LoadingBar } from "quasar";

// stolen from here
// https://github.com/mutoe/vue3-realworld-example-app/blob/master/src/utils/create-async-process.ts

export function createAsyncProcess(fn) {
  const loading = ref(false);
  const error = ref(false);
  const run = async (...args) => {
    LoadingBar.start();
    try {
      loading.value = true;
      error.value = false;
      const result = await fn(...args);
      return result;
    } catch (e) {
      error.value = e;
      return e;
    } finally {
      LoadingBar.stop();
      loading.value = false;
    }
  };
  return { loading, error, run };
}
