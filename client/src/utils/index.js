export function hasOwnProperty(obj, v) {
  if (obj == null) return false;
  return Object.prototype.hasOwnProperty.call(obj, v);
}

export const OTF = (obj, form, namespace) => {
  var fd = form || new FormData();

  let formKey = null;

  for (const property in obj) {
    if (hasOwnProperty(obj, property)) {
      formKey = namespace ? `${namespace}[${property}]` : property;
      /**
       * if the property is an object, but not a File.
       * use recursivity.
       * if it's a file add it
       * else
       * add the normal key
       */
      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        OTF(obj[property], fd, formKey);
      } else if (obj[property] instanceof File) {
        fd.append(formKey, obj[property]);
      } else {
        // if it's a string
        let value = obj[property];

        // if boolean send 1, 0
        if (
          value === "true" ||
          value === "false" ||
          value === true ||
          value === false
        ) {
          value = value === "true" || value === true ? 1 : 0;
        }

        fd.append(formKey, value);
      }
    }
  }

  return fd;
};

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
