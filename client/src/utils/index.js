import dayjs from "@/dayjs";

export function renameObjectKey({ obj, old_key, new_key }) {
  if (old_key !== new_key) {
    Object.defineProperty(
      obj,
      new_key,
      Object.getOwnPropertyDescriptor(obj, old_key)
    );
    delete obj[old_key];
  }
}

export const formatDate = (date) => {
  return dayjs(date).format("MMM D, YYYY");
};
