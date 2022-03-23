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

export const shortenDate = (date) => {
  return date.substring(0, 10);
};

export const formatName = (name) => {
  return `${name?.first_name} ${name?.last_name} ${name?.middle_name}`;
};
