import { ref } from "vue";
import { createAsyncProcess } from "@/composable/useAsync";

const noop = () => {
  /* noop */
};

export const useDashboard = ({
  submit,
  reset,
  fetch,
  edit,
  remove,
  view = noop,
}) => {
  const filter = ref("");
  const data = ref([]);

  const showEditDialog = ref(false);
  const showViewDialog = ref(false);

  const editedItem = ref(null);
  const viewedItem = ref(null);

  const editItem = (item) => {
    editedItem.value = JSON.parse(JSON.stringify(item));
    showEditDialog.value = true;
  };

  const { run: fetchData, loading } = createAsyncProcess(fetch);

  const viewItem = (item) => {
    viewedItem.value = item;
    showViewDialog.value = true;
    view(item);
  };

  const onReset = () => {
    reset();
  };

  const onSubmit = async () => {
    await submit();
    await fetchData();
    onReset();
  };

  const editRow = async () => {
    await edit();
    await fetchData();
    onReset();
  };

  const removeRow = (item) => {
    confirm("Вы уверены?") &&
      remove(item.id).then(() => {
        fetchData();
      });
  };

  return {
    data,
    loading,
    filter,
    showViewDialog,
    showEditDialog,
    editedItem,
    viewedItem,
    fetchData,
    onSubmit,
    onReset,
    editRow,
    removeRow,
    editItem,
    viewItem,
  };
};
