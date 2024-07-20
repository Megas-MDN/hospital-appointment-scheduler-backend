export const validateData = ({ data, schema }) => {
  for (const key in schema) {
    if (!data[key]) return { error: true, message: `Missing ${key} field` };
    if (typeof data[key] !== schema[key])
      return { error: true, message: `Invalid ${key} field` };
  }

  return { error: false };
};
